-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(24) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" VARCHAR(16) NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_address_key" ON "publishers"("address");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_cellphone_key" ON "publishers"("cellphone");
