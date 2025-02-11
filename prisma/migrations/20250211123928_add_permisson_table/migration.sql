/*
  Warnings:

  - The primary key for the `user_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissions` on the `user_permissions` table. All the data in the column will be lost.
  - You are about to alter the column `permission_id` on the `user_permissions` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- DropIndex
DROP INDEX "user_permissions_permissions_key";

-- AlterTable
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_pkey",
DROP COLUMN "permissions",
ALTER COLUMN "permission_id" DROP DEFAULT,
ALTER COLUMN "permission_id" SET DATA TYPE SMALLINT,
ADD CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("user_id", "permission_id");
DROP SEQUENCE "user_permissions_permission_id_seq";

-- CreateTable
CREATE TABLE "permissions" (
    "permission_id" SERIAL NOT NULL,
    "permission" VARCHAR(100) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permission_key" ON "permissions"("permission");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;
