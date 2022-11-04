/*
  Warnings:

  - You are about to drop the `_GameToGame_Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameToGame_Favorite" DROP CONSTRAINT "_GameToGame_Favorite_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGame_Favorite" DROP CONSTRAINT "_GameToGame_Favorite_B_fkey";

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "game_FavoriteId" TEXT;

-- DropTable
DROP TABLE "_GameToGame_Favorite";

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_game_FavoriteId_fkey" FOREIGN KEY ("game_FavoriteId") REFERENCES "games_favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
