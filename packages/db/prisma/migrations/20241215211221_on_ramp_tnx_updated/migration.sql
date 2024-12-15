/*
  Warnings:

  - A unique constraint covering the columns `[on_ramp_txn_id]` on the table `on_ramp_txn` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "on_ramp_txn_on_ramp_txn_id_key" ON "on_ramp_txn"("on_ramp_txn_id");
