-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL,
    "inputValue" VARCHAR(100) NOT NULL DEFAULT '',
    "website" VARCHAR(20) NOT NULL DEFAULT '',
    "category" VARCHAR(20) NOT NULL DEFAULT '',

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "searchId" TEXT NOT NULL,
    "productImage" VARCHAR(1000) NOT NULL DEFAULT '',
    "productDescription" VARCHAR(2000) NOT NULL DEFAULT '',
    "productCategory" VARCHAR(20) NOT NULL DEFAULT '',
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productWebsite" VARCHAR(1000) NOT NULL DEFAULT '',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
