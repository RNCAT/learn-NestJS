-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" VARCHAR(30),
    "lastname" VARCHAR(30),
    "phone" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "pets" (
    "pet_id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "age" SMALLINT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "types" (
    "type_id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "statuses" (
    "status_id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "adoptions" (
    "adoption_id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adoptions_pkey" PRIMARY KEY ("adoption_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "statuses_name_key" ON "statuses"("name");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
