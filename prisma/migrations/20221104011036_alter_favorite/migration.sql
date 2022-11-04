/*
  Warnings:

  - You are about to drop the column `game_FavoriteId` on the `games` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_game_FavoriteId_fkey";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "game_FavoriteId";

-- CreateTable
CREATE TABLE "_GameToGame_Favorite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGame_Favorite_AB_unique" ON "_GameToGame_Favorite"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGame_Favorite_B_index" ON "_GameToGame_Favorite"("B");

-- AddForeignKey
ALTER TABLE "_GameToGame_Favorite" ADD CONSTRAINT "_GameToGame_Favorite_A_fkey" FOREIGN KEY ("A") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGame_Favorite" ADD CONSTRAINT "_GameToGame_Favorite_B_fkey" FOREIGN KEY ("B") REFERENCES "games_favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
