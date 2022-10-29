/*
  Warnings:

  - Changed the type of `width` on the `games_gallery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `height` on the `games_gallery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "games_gallery" DROP COLUMN "width",
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL,
DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL;
