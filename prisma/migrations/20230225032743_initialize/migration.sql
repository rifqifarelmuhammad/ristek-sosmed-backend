-- CreateTable
CREATE TABLE "user" (
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "friend" TEXT[],
    "closeFriend" TEXT[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "avatar" (
    "email" TEXT NOT NULL,
    "fileAvatar" TEXT NOT NULL,
    "urlAvatar" TEXT NOT NULL,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "tweet" (
    "id" SERIAL NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "tweets" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closeFriend" BOOLEAN NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
