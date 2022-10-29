/*
  Warnings:

  - You are about to drop the column `image_id` on the `games` table. All the data in the column will be lost.
  - You are about to drop the `avatars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[image]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primary_color` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "avatars" DROP CONSTRAINT "avatars_client_id_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_image_id_fkey";

-- DropIndex
DROP INDEX "games_image_id_key";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "games" DROP COLUMN "image_id",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "primary_color" TEXT NOT NULL;

-- DropTable
DROP TABLE "avatars";

-- DropTable
DROP TABLE "images";

-- CreateIndex
CREATE UNIQUE INDEX "games_image_key" ON "games"("image");
