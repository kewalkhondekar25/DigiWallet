/*
  Warnings:

  - You are about to drop the `user_bank_ballance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_bank_ballance" DROP CONSTRAINT "user_bank_ballance_user_id_fkey";

-- DropTable
DROP TABLE "user_bank_ballance";

-- CreateTable
CREATE TABLE "user_bank_ballances" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 2100000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_bank_ballances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_bank_ballances_user_id_key" ON "user_bank_ballances"("user_id");

-- AddForeignKey
ALTER TABLE "user_bank_ballances" ADD CONSTRAINT "user_bank_ballances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
