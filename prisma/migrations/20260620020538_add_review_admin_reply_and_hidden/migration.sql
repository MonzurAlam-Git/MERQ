-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "adminReply" TEXT,
ADD COLUMN     "adminReplyAt" TIMESTAMP(3),
ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
