/*
  Warnings:

  - You are about to drop the column `movie_Id` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `tmdb_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_movie_Id_fkey";

-- DropIndex
DROP INDEX "Movies_tmdb_id_key";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "movie_Id",
ADD COLUMN     "tmdb_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_tmdb_id_fkey" FOREIGN KEY ("tmdb_id") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
