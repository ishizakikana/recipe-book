-- AlterTable
ALTER TABLE "recipe_ingredient" ADD COLUMN     "id" TEXT;

-- AlterTable
ALTER TABLE "recipe_seasoning" ALTER COLUMN "id" DROP NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT;
