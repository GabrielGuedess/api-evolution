-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "avatars_client_id_key" ON "avatars"("client_id");

-- AddForeignKey
ALTER TABLE "avatars" ADD CONSTRAINT "avatars_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
