-- AlterTable
ALTER TABLE "recipe_ingredient" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "recipe_ingredient_id_seq";

-- AlterTable
ALTER TABLE "recipe_seasoning" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "recipe_seasoning_id_seq";
