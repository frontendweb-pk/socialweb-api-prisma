/*
  Warnings:

  - You are about to alter the column `address` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address2` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `landmark` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `institute_name` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `company` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `resume` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `github_username` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `reaction` on the `reactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `permissions` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `role_name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `skills` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `tags` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `permissions` on the `user_permissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[github_username]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `skills` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address2" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "landmark" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "institute_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "company" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "resume" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "github_username" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "reactions" ALTER COLUMN "reaction" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "permissions" SET DATA TYPE VARCHAR(100)[],
ALTER COLUMN "role_name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "skills" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "user_permissions" ALTER COLUMN "permissions" SET DATA TYPE VARCHAR(100)[];

-- CreateIndex
CREATE UNIQUE INDEX "profiles_github_username_key" ON "profiles"("github_username");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");
