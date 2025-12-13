-- CreateTable
CREATE TABLE "shops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "rating" REAL NOT NULL DEFAULT 4.0,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Add shopId column to sweets table
ALTER TABLE "sweets" ADD COLUMN "shopId" INTEGER NOT NULL DEFAULT 1;

-- Create foreign key constraint by recreating the table
CREATE TABLE "sweets_new" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "shopId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sweets_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "sweets_new" ("id", "name", "description", "price", "quantity", "category", "imageUrl", "shopId", "createdAt", "updatedAt")
SELECT "id", "name", "description", "price", "quantity", "category", "imageUrl", 1, "createdAt", "updatedAt" FROM "sweets";

DROP TABLE "sweets";
ALTER TABLE "sweets_new" RENAME TO "sweets";