-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_id_fkey";

-- DropEnum
DROP TYPE "RoleEnum";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;
