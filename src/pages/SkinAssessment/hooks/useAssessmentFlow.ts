import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  AssessmentDraft,
  AssessmentResult,
  Severity,
  SkinArea,
  SkinSymptom,
  SymptomDuration,
} from '../../../model/skinAssessment/Assessment';
import type { AssessmentHistoryRepository } from '../../../model/skinAssessment/AssessmentHistoryRepository';
import {
  QUESTION_ORDER,
  isQuestionAnswered,
  validateAnswers,
} from '../../../utils/skinAssessment/assessmentRules';
import type { QuestionId } from '../../../utils/skinAssessment/assessmentRules';
import type { SkinAssessmentService } from '../../../model/skinAssessment/SkinAssessmentService';

export type FlowStep =
  | 'intro'
  | 'capture'
  | 'questions'
  | 'analyzing'
  | 'result';
export type AnalysisStatus = 'running' | 'failed';

const EMPTY_DRAFT: AssessmentDraft = {
  area: null,
  duration: null,
  symptoms: [],
  severity: null,
};

export type AssessmentFlowOptions = {
  readonly service: SkinAssessmentService;
  readonly history: AssessmentHistoryRepository;
};

/** Sequences the assessment flow; scoring rules live in the domain. */
export function useAssessmentFlow({ service, history }: AssessmentFlowOptions) {
  const [step, setStep] = useState<FlowStep>('intro');
  const [consent, setConsent] = useState(false);
  const [consentMissing, setConsentMissing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [draft, setDraft] = useState<AssessmentDraft>(EMPTY_DRAFT);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [unanswered, setUnanswered] = useState<QuestionId | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisStatus>('running');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const runId = useRef(0);

  useEffect(
    () => () => {
      runId.current += 1;
    },
    [],
  );

  const toggleConsent = useCallback((value: boolean) => {
    setConsent(value);
    setConsentMissing(false);
  }, []);

  const startFromIntro = useCallback(() => {
    if (!consent) {
      setConsentMissing(true);
      return;
    }
    setStep('capture');
  }, [consent]);

  const runAnalysis = useCallback(async () => {
    const validation = validateAnswers(draft);
    if (!validation.ok) {
      return;
    }
    const current = ++runId.current;
    setStep('analyzing');
    setAnalysis('running');
    try {
      const outcome = await service.assess(
        validation.value,
        photo ?? undefined,
      );
      if (current !== runId.current) return;
      if (!outcome.ok) {
        setAnalysis('failed');
        return;
      }
      const saved = await history.add(outcome.value);
      if (current !== runId.current) return;
      if (!saved.ok) {
        setAnalysis('failed');
        return;
      }
      setPhoto(null);
      setResult(outcome.value);
      setStep('result');
    } catch {
      if (current !== runId.current) return;
      setAnalysis('failed');
    }
  }, [draft, history, photo, service]);

  const next = useCallback(() => {
    const question = QUESTION_ORDER[questionIndex];
    if (question === undefined) {
      return;
    }
    if (!isQuestionAnswered(draft, question)) {
      setUnanswered(question);
      return;
    }
    setUnanswered(null);
    if (questionIndex < QUESTION_ORDER.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      runAnalysis();
    }
  }, [draft, questionIndex, runAnalysis]);

  /** Returns true when the flow handled the back action itself. */
  const goBack = useCallback((): boolean => {
    switch (step) {
      case 'capture':
        setStep('intro');
        return true;
      case 'questions':
        setUnanswered(null);
        if (questionIndex === 0) {
          setStep('capture');
        } else {
          setQuestionIndex(questionIndex - 1);
        }
        return true;
      case 'analyzing':
        if (analysis === 'failed') {
          setStep('questions');
          return true;
        }
        return true; // stay: an operation is in progress
      case 'result':
      case 'intro':
        return false;
    }
  }, [analysis, questionIndex, step]);

  const restart = useCallback(() => {
    runId.current += 1;
    setDraft(EMPTY_DRAFT);
    setPhoto(null);
    setQuestionIndex(0);
    setResult(null);
    setUnanswered(null);
    setStep('capture');
  }, []);

  return {
    step,
    consent,
    consentMissing,
    toggleConsent,
    startFromIntro,
    photo,
    setPhoto,
    continueFromCapture: () => setStep('questions'),
    draft,
    setArea: (value: SkinArea) => {
      setDraft(current => ({ ...current, area: value }));
      setUnanswered(null);
    },
    setDuration: (value: SymptomDuration) => {
      setDraft(current => ({ ...current, duration: value }));
      setUnanswered(null);
    },
    toggleSymptom: (value: SkinSymptom) => {
      setDraft(current => ({
        ...current,
        symptoms: current.symptoms.includes(value)
          ? current.symptoms.filter(item => item !== value)
          : [...current.symptoms, value],
      }));
      setUnanswered(null);
    },
    setSeverity: (value: Severity) => {
      setDraft(current => ({ ...current, severity: value }));
      setUnanswered(null);
    },
    questionIndex,
    unanswered,
    next,
    analysis,
    retryAnalysis: runAnalysis,
    result,
    goBack,
    restart,
  };
}
