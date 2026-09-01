-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '未命名大屏',
    "description" TEXT,
    "canvas" JSONB NOT NULL,
    "nodes" JSONB NOT NULL,
    "dataSources" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
