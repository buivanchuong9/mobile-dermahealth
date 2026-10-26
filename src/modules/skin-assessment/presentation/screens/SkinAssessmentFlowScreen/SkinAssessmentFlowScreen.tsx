import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { ScreenHeader } from '@design-system/navigation';
import { ScreenContainer } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { AnalyzingStep } from '../../components/AnalyzingStep';
import { CaptureStep } from '../../components/CaptureStep';
import { IntroStep } from '../../components/IntroStep';
import { QuestionStep } from '../../components/QuestionStep';
import { ResultStep } from '../../components/ResultStep';
import { useAssessmentFlow } from '../../hooks/useAssessmentFlow';
import type { SkinAssessmentFlowScreenProps } from './SkinAssessmentFlowScreen.types';

export function SkinAssessmentFlowScreen({
  service,
  history,
  onExit,
  onBookAppointment,
  onViewHistory,
}: SkinAssessmentFlowScreenProps) {
  const flow = useAssessmentFlow({ service, history });
  const { goBack } = flow;

  const handleBack = () => {
    if (!goBack()) {
      onExit();
    }
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!goBack()) {
          onExit();
        }
        return true;
      },
    );
    return () => subscription.remove();
  }, [goBack, onExit]);

  return (
    <ScreenContainer
      header={
        <ScreenHeader
          title={translate(
            flow.step === 'result'
              ? 'assessment.result.title'
              : 'assessment.title',
          )}
          onBack={
            flow.step === 'analyzing' && flow.analysis === 'running'
              ? undefined
              : handleBack
          }
        />
      }
    >
      {flow.step === 'intro' ? (
        <IntroStep
          consent={flow.consent}
          consentMissing={flow.consentMissing}
          onToggleConsent={flow.toggleConsent}
          onStart={flow.startFromIntro}
        />
      ) : null}
      {flow.step === 'capture' ? (
        <CaptureStep
          samplePhoto={flow.samplePhoto}
          onChooseSample={() => flow.setSamplePhoto(true)}
          onRemoveSample={() => flow.setSamplePhoto(false)}
          onContinue={flow.continueFromCapture}
        />
      ) : null}
      {flow.step === 'questions' ? (
        <QuestionStep
          questionIndex={flow.questionIndex}
          draft={flow.draft}
          unanswered={flow.unanswered}
          onSelectArea={flow.setArea}
          onSelectDuration={flow.setDuration}
          onToggleSymptom={flow.toggleSymptom}
          onSelectSeverity={flow.setSeverity}
          onNext={flow.next}
        />
      ) : null}
      {flow.step === 'analyzing' ? (
        <AnalyzingStep status={flow.analysis} onRetry={flow.retryAnalysis} />
      ) : null}
      {flow.step === 'result' && flow.result ? (
        <ResultStep
          result={flow.result}
          onBookAppointment={onBookAppointment}
          onViewHistory={onViewHistory}
          onStartOver={flow.restart}
        />
      ) : null}
    </ScreenContainer>
  );
}
