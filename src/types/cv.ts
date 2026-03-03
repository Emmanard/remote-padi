export interface CvSection {
  title: string;
  content: string;
}

export interface CvDraft {
  id: string;
  fullName: string;
  email: string;
  summary: string;
  sections: CvSection[];
  createdAt: number;
  updatedAt: number;
}
