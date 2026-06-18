// prisma.config.ts

import * as dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
    directUrl: process.env.DIRECT_URL!,
  },
  migrations: {
    seed: "tsx ./prisma/seed.ts",
  },
});
