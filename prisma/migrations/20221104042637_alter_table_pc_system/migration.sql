/*
  Warnings:

  - You are about to drop the column `minimal_id` on the `pc_system` table. All the data in the column will be lost.
  - You are about to drop the column `recommended_id` on the `pc_system` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pc_system_id]` on the table `minimal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pc_system_id]` on the table `recommended` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "pc_system" DROP CONSTRAINT "pc_system_minimal_id_fkey";

-- DropForeignKey
ALTER TABLE "pc_system" DROP CONSTRAINT "pc_system_recommended_id_fkey";

-- DropIndex
DROP INDEX "pc_system_minimal_id_key";

-- DropIndex
DROP INDEX "pc_system_recommended_id_key";

-- AlterTable
ALTER TABLE "minimal" ADD COLUMN     "pc_system_id" TEXT;

-- AlterTable
ALTER TABLE "pc_system" DROP COLUMN "minimal_id",
DROP COLUMN "recommended_id";

-- AlterTable
ALTER TABLE "recommended" ADD COLUMN     "pc_system_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "minimal_pc_system_id_key" ON "minimal"("pc_system_id");

-- CreateIndex
CREATE UNIQUE INDEX "recommended_pc_system_id_key" ON "recommended"("pc_system_id");

-- AddForeignKey
ALTER TABLE "minimal" ADD CONSTRAINT "minimal_pc_system_id_fkey" FOREIGN KEY ("pc_system_id") REFERENCES "pc_system"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommended" ADD CONSTRAINT "recommended_pc_system_id_fkey" FOREIGN KEY ("pc_system_id") REFERENCES "pc_system"("id") ON DELETE SET NULL ON UPDATE CASCADE;
