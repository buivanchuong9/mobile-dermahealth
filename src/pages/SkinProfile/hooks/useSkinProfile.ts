import { useCallback, useEffect, useRef, useState } from 'react';
import type { SkinProfileUseCases } from '../../../services/skinProfile/createSkinProfileUseCases';
import type { SkinProfile } from '../../../model/skinProfile/SkinProfile';
import { validateSkinProfileAnswers } from '../../../utils/skinProfile/skinProfileRules';
import type { SkinProfileIssue } from '../../../utils/skinProfile/skinProfileRules';
import type { SkinConcern } from '../../../model/skinProfile/SkinConcern';
import type { SkinType } from '../../../model/skinProfile/SkinType';

export type SkinProfileLoadStatus = 'loading' | 'failed' | 'ready';
export type SkinProfileNotice =
  | 'saved'
  | 'save_failed'
  | 'delete_failed'
  | null;

/**
 * Screen state only. Validation and persistence rules live in the domain and
 * use cases; this hook just sequences them for the UI.
 */
export function useSkinProfile(useCases: SkinProfileUseCases) {
  const [loadStatus, setLoadStatus] =
    useState<SkinProfileLoadStatus>('loading');
  const [savedProfile, setSavedProfile] = useState<SkinProfile | null>(null);
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [concerns, setConcerns] = useState<readonly SkinConcern[]>([]);
  const [issues, setIssues] = useState<readonly SkinProfileIssue[]>([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<SkinProfileNotice>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setLoadStatus('loading');
    const result = await useCases.load();
    if (!mounted.current) {
      return;
    }
    if (!result.ok) {
      setLoadStatus('failed');
      return;
    }
    setSavedProfile(result.value);
    setSkinType(result.value?.skinType ?? null);
    setConcerns(result.value?.concerns ?? []);
    setLoadStatus('ready');
  }, [useCases]);

  useEffect(() => {
    load();
  }, [load]);

  const selectSkinType = useCallback((value: SkinType) => {
    setSkinType(value);
    setIssues(current => current.filter(issue => issue.field !== 'skinType'));
    setNotice(null);
  }, []);

  const toggleConcern = useCallback((value: SkinConcern) => {
    setConcerns(current =>
      current.includes(value)
        ? current.filter(concern => concern !== value)
        : [...current, value],
    );
    setNotice(null);
  }, []);

  const submit = useCallback(async () => {
    const validation = validateSkinProfileAnswers({ skinType, concerns });
    if (!validation.ok) {
      setIssues(validation.error);
      return;
    }
    setIssues([]);
    setNotice(null);
    setSaving(true);
    const result = await useCases.save({ skinType, concerns });
    if (!mounted.current) {
      return;
    }
    setSaving(false);
    if (result.ok) {
      setSavedProfile(result.value);
      setNotice('saved');
    } else {
      setNotice('save_failed');
    }
  }, [concerns, skinType, useCases]);

  const remove = useCallback(async () => {
    const result = await useCases.remove();
    if (!mounted.current) {
      return;
    }
    if (!result.ok) {
      setNotice('delete_failed');
      return;
    }
    setSavedProfile(null);
    setSkinType(null);
    setConcerns([]);
    setIssues([]);
    setNotice(null);
    setLoadStatus('ready');
  }, [useCases]);

  return {
    loadStatus,
    savedProfile,
    skinType,
    concerns,
    issues,
    saving,
    notice,
    reload: load,
    selectSkinType,
    toggleConcern,
    submit,
    remove,
  };
}
