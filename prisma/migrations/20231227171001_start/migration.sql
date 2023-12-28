-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ssid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
