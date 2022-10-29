-- CreateTable
CREATE TABLE "games_favorites" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "games_favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games_favorites" ADD CONSTRAINT "games_favorites_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_favorites" ADD CONSTRAINT "games_favorites_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
