/*
  Warnings:

  - Changed the type of `role_name` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "role_name"
,
ADD COLUMN     "role_name" TEXT NOT NULL;
