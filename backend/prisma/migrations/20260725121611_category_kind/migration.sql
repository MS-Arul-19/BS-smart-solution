-- CreateEnum
CREATE TYPE "CategoryKind" AS ENUM ('SERVICE', 'SOCIAL');

-- AlterTable
ALTER TABLE "service_categories" ADD COLUMN     "kind" "CategoryKind" NOT NULL DEFAULT 'SERVICE';
