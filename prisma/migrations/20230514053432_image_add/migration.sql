-- CreateTable
CREATE TABLE "BookImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BookImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookImage" ADD CONSTRAINT "BookImage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
