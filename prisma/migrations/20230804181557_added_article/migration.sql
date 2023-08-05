-- CreateTable
CREATE TABLE "ArticleImg" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "ArticleImg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleImg" ADD CONSTRAINT "ArticleImg_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
