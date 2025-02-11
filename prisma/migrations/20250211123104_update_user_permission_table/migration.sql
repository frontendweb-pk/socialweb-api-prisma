/*
  Warnings:

  - You are about to alter the column `permissions` on the `user_permissions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(100)`.
  - A unique constraint covering the columns `[permissions]` on the table `user_permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_permissions" ALTER COLUMN "permissions" SET NOT NULL,
ALTER COLUMN "permissions" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_permissions_key" ON "user_permissions"("permissions");
