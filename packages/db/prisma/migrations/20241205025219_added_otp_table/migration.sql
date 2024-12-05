-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Otps" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "blockUntil" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otps_user_id_key" ON "Otps"("user_id");

-- AddForeignKey
ALTER TABLE "Otps" ADD CONSTRAINT "Otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
