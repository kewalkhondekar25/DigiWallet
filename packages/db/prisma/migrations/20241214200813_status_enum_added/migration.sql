-- CreateEnum
CREATE TYPE "txn_status" AS ENUM ('PROCESSING', 'SUCCESS', 'FAIL');

-- AlterTable
ALTER TABLE "on_ramp_txn" ADD COLUMN     "status" "txn_status";
