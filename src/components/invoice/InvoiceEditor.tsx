import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useInvoiceStore } from '@/stores/invoiceStore';
import type { InvoiceDraft } from '@/types/invoice';

const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Required'),
  clientEmail: z.string().email('Invalid email'),
  currency: z.string().min(1, 'Required')
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

function createDefaultDraft(): InvoiceDraft {
  return {
    id: `inv_${Date.now()}`,
    clientName: '',
    clientEmail: '',
    items: [],
    currency: 'USD',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}

export function InvoiceEditor(): ReactElement {
  const { currentDraft, saveDraft, loadDrafts } = useInvoiceStore();
  const [draft] = useState<InvoiceDraft>(() => currentDraft ?? createDefaultDraft());

  const {
    setValue,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<InvoiceFormData>({
    defaultValues: {
      clientName: draft.clientName,
      clientEmail: draft.clientEmail,
      currency: draft.currency
    }
  });

  const clientName = watch('clientName');
  const clientEmail = watch('clientEmail');
  const currency = watch('currency');

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  const onSave = useCallback(
    (data: InvoiceFormData) => {
      const result = invoiceSchema.safeParse(data);
      if (!result.success) {
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof InvoiceFormData;
          if (key) setError(key, { message: issue.message });
        }
        return;
      }
      clearErrors();
      saveDraft({
        ...draft,
        clientName: result.data.clientName,
        clientEmail: result.data.clientEmail,
        currency: result.data.currency,
        updatedAt: Date.now()
      });
    },
    [draft, saveDraft, setError, clearErrors]
  );

  const onSubmit = handleSubmit(onSave);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice draft</Text>
      <Input
        label="Client name"
        value={clientName}
        onChange={(v) => setValue('clientName', v)}
        error={formErrors.clientName?.message}
      />
      <Input
        label="Client email"
        value={clientEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={(v) => setValue('clientEmail', v)}
        error={formErrors.clientEmail?.message}
      />
      <Input
        label="Currency"
        value={currency}
        onChange={(v) => setValue('currency', v)}
        error={formErrors.currency?.message}
      />
      <Button label="Save draft" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  title: { fontSize: 18, marginBottom: 12 }
});
