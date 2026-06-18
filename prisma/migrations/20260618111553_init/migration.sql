-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100),
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "overview" TEXT,
    "tmdb_id" INTEGER NOT NULL,
    "poster_path" TEXT,
    "backdrop_path" VARCHAR(255),
    "genres" JSONB NOT NULL,
    "release_date" VARCHAR(20) NOT NULL,
    "runtime" INTEGER,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "movie_Id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review_text" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_tmdb_id_key" ON "Movies"("tmdb_id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_movie_Id_fkey" FOREIGN KEY ("movie_Id") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
