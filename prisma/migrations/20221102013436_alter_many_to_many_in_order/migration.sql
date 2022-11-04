/*
  Warnings:

  - You are about to drop the column `order_id` on the `games` table. All the data in the column will be lost.
  - Made the column `id_customer` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_order_id_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "id_customer" SET NOT NULL;

-- AlterTable
ALTER TABLE "games" DROP COLUMN "order_id";

-- CreateTable
CREATE TABLE "_GameToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToOrder_AB_unique" ON "_GameToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToOrder_B_index" ON "_GameToOrder"("B");

-- AddForeignKey
ALTER TABLE "_GameToOrder" ADD CONSTRAINT "_GameToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToOrder" ADD CONSTRAINT "_GameToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
