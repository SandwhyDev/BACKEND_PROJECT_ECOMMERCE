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

-- CreateTable
CREATE TABLE "Merchants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admin_id" INTEGER NOT NULL,
    "merchant_name" TEXT NOT NULL,
    "kodepos" INTEGER NOT NULL,
    CONSTRAINT "Merchants_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Merchants_kodepos_fkey" FOREIGN KEY ("kodepos") REFERENCES "Countries" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Merchants_periods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "merchant_id" INTEGER NOT NULL,
    "kodepos_id" INTEGER NOT NULL,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    CONSTRAINT "Merchants_periods_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Merchants_periods_kodepos_id_fkey" FOREIGN KEY ("kodepos_id") REFERENCES "Countries" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "merchants_id" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "categori_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Products_merchants_id_fkey" FOREIGN KEY ("merchants_id") REFERENCES "Merchants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Products_categori_id_fkey" FOREIGN KEY ("categori_id") REFERENCES "Categori" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categori" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cat_nama" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order_items" (
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("order_id", "product_id"),
    CONSTRAINT "Order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_full_name_key" ON "Users"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_code_key" ON "Countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_admin_id_key" ON "Merchants"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_merchant_name_key" ON "Merchants"("merchant_name");

-- CreateIndex
CREATE UNIQUE INDEX "Categori_cat_nama_key" ON "Categori"("cat_nama");
