-- CreateTable
CREATE TABLE "games_gallery" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "image_fit" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "games_id" TEXT NOT NULL,

    CONSTRAINT "games_gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games_gallery" ADD CONSTRAINT "games_gallery_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
