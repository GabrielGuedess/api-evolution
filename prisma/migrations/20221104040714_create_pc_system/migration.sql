/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "pc_system" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "minimal_id" TEXT NOT NULL,
    "recommended_id" TEXT NOT NULL,

    CONSTRAINT "pc_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "minimal" (
    "id" TEXT NOT NULL,
    "so" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "hd" TEXT NOT NULL,

    CONSTRAINT "minimal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended" (
    "id" TEXT NOT NULL,
    "so" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "hd" TEXT NOT NULL,

    CONSTRAINT "recommended_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pc_system_game_id_key" ON "pc_system"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "pc_system_minimal_id_key" ON "pc_system"("minimal_id");

-- CreateIndex
CREATE UNIQUE INDEX "pc_system_recommended_id_key" ON "pc_system"("recommended_id");

-- CreateIndex
CREATE UNIQUE INDEX "games_slug_key" ON "games"("slug");

-- AddForeignKey
ALTER TABLE "pc_system" ADD CONSTRAINT "pc_system_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pc_system" ADD CONSTRAINT "pc_system_minimal_id_fkey" FOREIGN KEY ("minimal_id") REFERENCES "minimal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pc_system" ADD CONSTRAINT "pc_system_recommended_id_fkey" FOREIGN KEY ("recommended_id") REFERENCES "recommended"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
