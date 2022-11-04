/*
  Warnings:

  - A unique constraint covering the columns `[client_id]` on the table `games_favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "games_favorites_client_id_key" ON "games_favorites"("client_id");
