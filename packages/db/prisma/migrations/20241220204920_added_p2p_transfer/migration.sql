-- CreateTable
CREATE TABLE "p2p_transfer" (
    "id" SERIAL NOT NULL,
    "recipentsId" INTEGER NOT NULL,
    "reciversId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "p2p_transfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2p_transfer" ADD CONSTRAINT "p2p_transfer_recipentsId_fkey" FOREIGN KEY ("recipentsId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2p_transfer" ADD CONSTRAINT "p2p_transfer_reciversId_fkey" FOREIGN KEY ("reciversId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
