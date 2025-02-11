-- AlterEnum
ALTER TYPE "RoleEnum" ADD VALUE 'MODERATOR';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" SET DEFAULT 2;

-- CreateTable
CREATE TABLE "user_permissions" (
    "permission_id" SERIAL NOT NULL,
    "permissions" TEXT[],
    "user_id" SMALLINT NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("permission_id")
);

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
