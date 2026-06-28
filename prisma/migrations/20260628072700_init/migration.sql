/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_tmdb_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Movies_tmdb_id_key" ON "Movies"("tmdb_id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_tmdb_id_fkey" FOREIGN KEY ("tmdb_id") REFERENCES "Movies"("tmdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;
