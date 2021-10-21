-- CreateTable
CREATE TABLE "Merchants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admin_id" INTEGER NOT NULL,
    "merchant_name" TEXT NOT NULL,
    "kodepos" INTEGER NOT NULL,
    CONSTRAINT "Merchants_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Merchants_kodepos_fkey" FOREIGN KEY ("kodepos") REFERENCES "Countries" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_merchant_name_key" ON "Merchants"("merchant_name");

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_admin_id_key" ON "Merchants"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_kodepos_key" ON "Merchants"("kodepos");
