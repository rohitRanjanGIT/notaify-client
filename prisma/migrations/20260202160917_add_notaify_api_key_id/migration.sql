-- CreateEnum
CREATE TYPE "LlmType" AS ENUM ('openai', 'claude', 'google');

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "llmType" "LlmType",
    "llmApiKey" TEXT,
    "llmApiModel" TEXT,
    "smtpUser" TEXT,
    "smtpPass" TEXT,
    "emailFrom" TEXT,
    "emailTo" TEXT,
    "notaifyApiKey" TEXT,
    "notaifyApiKeyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
