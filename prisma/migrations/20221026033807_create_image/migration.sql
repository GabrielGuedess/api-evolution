/*
  Warnings:

  - You are about to drop the column `image` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `primary_color` on the `games` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `developers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[src]` on the table `games_gallery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `platforms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "image",
DROP COLUMN "primary_color",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "primary_color" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_src_key" ON "Image"("src");

-- CreateIndex
CREATE UNIQUE INDEX "developers_name_key" ON "developers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "games_imageId_key" ON "games"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "games_gallery_src_key" ON "games_gallery"("src");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_name_key" ON "platforms"("name");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
