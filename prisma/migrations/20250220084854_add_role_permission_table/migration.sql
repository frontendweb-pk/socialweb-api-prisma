/*
  Warnings:

  - You are about to drop the column `permissions` on the `roles` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "created_at" TIMESTAMP
(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP
(3) DEFAULT CURRENT_TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "permissions";

-- CreateTable
CREATE TABLE "role_permissions"
(
  "role_id" SMALLINT NOT NULL,
  "permission_id" SMALLINT NOT NULL,

  CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id")
ON DELETE RESTRICT ON
UPDATE CASCADE;
