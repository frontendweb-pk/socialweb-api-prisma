-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISH', 'PRIVATE', 'FRIENDS');

-- CreateEnum
CREATE TYPE "Qualifiation" AS ENUM ('HighSchool', 'Metric', 'Graduation', 'Master', 'Phd', 'other');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN', 'STAFF', 'VENDOR', 'AUDITOR');

-- CreateEnum
CREATE TYPE "Proficiency" AS ENUM ('BEGINER', 'INTERMEDIATE', 'ADVANED', 'EXPERT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateTable
CREATE TABLE "address" (
    "address_id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "landmark" TEXT,
    "phone" VARCHAR(15) NOT NULL,
    "pincode" VARCHAR(10) NOT NULL,
    "city_id" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "cities" (
    "city_id" SERIAL NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state_id" SMALLINT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "countries" (
    "count_id" SERIAL NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("count_id")
);

-- CreateTable
CREATE TABLE "likes" (
    "like_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "media" JSONB,
    "code" JSONB,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "is_publish" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0.0,
    "share" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "post_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "profile_id" SERIAL NOT NULL,
    "bio" TEXT,
    "dob" DATE NOT NULL,
    "qualification" "Qualifiation" NOT NULL DEFAULT 'HighSchool',
    "institute_name" TEXT NOT NULL,
    "qualification_custom" VARCHAR(100),
    "company" TEXT,
    "exp" DECIMAL(3,1) NOT NULL DEFAULT 0.0,
    "resume" TEXT,
    "salary" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "github_username" TEXT,
    "user_id" SMALLINT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "profile_skills" (
    "profile_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "profile_skills_pkey" PRIMARY KEY ("profile_id","skill_id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "reaction_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "reaction" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("reaction_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" "RoleEnum" NOT NULL DEFAULT 'USER',
    "permissions" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "skills" (
    "skill_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" "Proficiency" NOT NULL DEFAULT 'BEGINER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "states" (
    "state_id" SERIAL NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "country_id" SMALLINT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(15) NOT NULL,
    "avatar" JSONB,
    "role_id" SMALLINT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "date_joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_city_key" ON "cities"("city");

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_key" ON "countries"("country");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_address_id_key" ON "profiles"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "states_state_key" ON "states"("state");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_key" ON "users"("mobile");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "states"("state_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("count_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;
