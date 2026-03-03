import { useCallback, useState } from 'react';
import {
  postGenerateInvoice,
  postGenerateCv,
  postGenerateCoverLetter,
  type GenerateInvoicePayload,
  type GenerateCvPayload,
  type GenerateCoverLetterPayload
} from '@/services/api';

export function useGenerate(): {
  generateInvoice: (payload: GenerateInvoicePayload) => Promise<string | null>;
  generateCv: (payload: GenerateCvPayload) => Promise<string | null>;
  generateCoverLetter: (payload: GenerateCoverLetterPayload) => Promise<string | null>;
  isGenerating: boolean;
  error: string | null;
} {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInvoice = useCallback(async (payload: GenerateInvoicePayload): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await postGenerateInvoice(payload);
      return res.data ?? null;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to generate invoice';
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateCv = useCallback(async (payload: GenerateCvPayload): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await postGenerateCv(payload);
      return res.data ?? null;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to generate CV';
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateCoverLetter = useCallback(
    async (payload: GenerateCoverLetterPayload): Promise<string | null> => {
      setIsGenerating(true);
      setError(null);
      try {
        const res = await postGenerateCoverLetter(payload);
        return res.data ?? null;
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to generate cover letter';
        setError(message);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    generateInvoice,
    generateCv,
    generateCoverLetter,
    isGenerating,
    error
  };
}
