import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { getAuthStore } from '@/stores/authStore';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? '';

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    const session = getAuthStore().session;
    const token = session?.access_token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
}

export const api = createApiClient();

export interface GenerateInvoicePayload {
  clientName: string;
  clientEmail: string;
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  currency: string;
}

export interface GenerateCvPayload {
  fullName: string;
  email: string;
  summary: string;
  sections: Array<{ title: string; content: string }>;
}

export interface GenerateCoverLetterPayload {
  applicantName: string;
  companyName: string;
  role: string;
  cvContent: string;
}

export async function postGenerateInvoice(
  payload: GenerateInvoicePayload
): Promise<{ data: string }> {
  const { data } = await api.post<{ data: string }>('/generate/invoice', payload);
  return data;
}

export async function postGenerateCv(payload: GenerateCvPayload): Promise<{ data: string }> {
  const { data } = await api.post<{ data: string }>('/generate/cv', payload);
  return data;
}

export async function postGenerateCoverLetter(
  payload: GenerateCoverLetterPayload
): Promise<{ data: string }> {
  const { data } = await api.post<{ data: string }>('/generate/cover-letter', payload);
  return data;
}
