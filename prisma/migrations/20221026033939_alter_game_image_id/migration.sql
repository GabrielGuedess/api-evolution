/*
  Warnings:

  - You are about to drop the column `imageId` on the `games` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_imageId_fkey";

-- DropIndex
DROP INDEX "games_imageId_key";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "imageId",
ADD COLUMN     "image_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "games_image_id_key" ON "games"("image_id");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
