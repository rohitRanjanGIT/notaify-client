-- CreateTable
CREATE TABLE "error_logs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "LLmType" "LlmType" NOT NULL,
    "resolution" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id")
);
