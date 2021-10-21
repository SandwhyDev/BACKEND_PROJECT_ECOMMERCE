-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country_code" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Users_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "Countries" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Countries" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kelurahan" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kota" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_full_name_key" ON "Users"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_code_key" ON "Countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_kelurahan_key" ON "Countries"("kelurahan");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_kecamatan_key" ON "Countries"("kecamatan");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_kota_key" ON "Countries"("kota");
