-- CreateTable
CREATE TABLE "off_ramp_txn" (
    "id" SERIAL NOT NULL,
    "off_ramp_txn_id" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" "txn_status",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "off_ramp_txn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bank_ballance" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_bank_ballance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_wallet_bank_ballances" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "my_wallet_bank_ballances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "off_ramp_txn_off_ramp_txn_id_key" ON "off_ramp_txn"("off_ramp_txn_id");

-- AddForeignKey
ALTER TABLE "off_ramp_txn" ADD CONSTRAINT "off_ramp_txn_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bank_ballance" ADD CONSTRAINT "user_bank_ballance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
