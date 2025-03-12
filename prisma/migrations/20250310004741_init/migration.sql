-- CreateTable
CREATE TABLE "Curation" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(8) NOT NULL,
    "passwd" VARCHAR(20) NOT NULL,
    "content" TEXT NOT NULL,
    "trendy" INTEGER NOT NULL DEFAULT 0,
    "personality" INTEGER NOT NULL DEFAULT 0,
    "practicality" INTEGER NOT NULL DEFAULT 0,
    "costEffectiveness" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curation_pkey" PRIMARY KEY ("id")
);
