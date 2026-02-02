export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectConfig {
  projectName: string;

  llmType?: "openai" | "claude" | "google" | "";
  llmApiKey?: string;
  llmApiModel?: string;

  smtpUser?: string;
  smtpPass?: string;
  emailFrom?: string;
  emailTo?: string;

  notaifyApiKey?: string;
}

export type ProjectWithConfig = Project & ProjectConfig;