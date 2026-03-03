import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCvStore } from '@/stores/cvStore';
import type { CvDraft } from '@/types/cv';

const cvSchema = z.object({
  fullName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  summary: z.string()
});

type CvFormData = z.infer<typeof cvSchema>;

function createDefaultDraft(): CvDraft {
  return {
    id: `cv_${Date.now()}`,
    fullName: '',
    email: '',
    summary: '',
    sections: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}

export function CvEditor(): ReactElement {
  const { currentDraft, saveDraft, loadDrafts } = useCvStore();
  const [draft] = useState<CvDraft>(() => currentDraft ?? createDefaultDraft());

  const {
    setValue,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<CvFormData>({
    defaultValues: {
      fullName: draft.fullName,
      email: draft.email,
      summary: draft.summary
    }
  });

  const fullName = watch('fullName');
  const email = watch('email');
  const summary = watch('summary');

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  const onSave = useCallback(
    (data: CvFormData) => {
      const result = cvSchema.safeParse(data);
      if (!result.success) {
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof CvFormData;
          if (key) setError(key, { message: issue.message });
        }
        return;
      }
      clearErrors();
      saveDraft({
        ...draft,
        fullName: result.data.fullName,
        email: result.data.email,
        summary: result.data.summary,
        updatedAt: Date.now()
      });
    },
    [draft, saveDraft, setError, clearErrors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CV draft</Text>
      <Input
        label="Full name"
        value={fullName}
        onChange={(v) => setValue('fullName', v)}
        error={formErrors.fullName?.message}
      />
      <Input
        label="Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={(v) => setValue('email', v)}
        error={formErrors.email?.message}
      />
      <Input
        label="Summary"
        value={summary}
        onChange={(v) => setValue('summary', v)}
        error={formErrors.summary?.message}
      />
      <Button label="Save draft" onPress={handleSubmit(onSave)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  title: { fontSize: 18, marginBottom: 12 }
});
