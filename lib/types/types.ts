export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectConfig {
    id: string;
    projectName: string;
    llmType: "openai" | "claude" | "google" | "";
    llmApiKey: string;
    llmApiModel: string;
    smtpUser: string;
    smtpPass: string;
    emailFrom: string;
    emailTo: string;
    notaifyApiKey?: string;
    createdAt?: string;
    updatedAt?: string;
}