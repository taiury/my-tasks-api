import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://root:${process.env.MARIADB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/my_tasks`,
    },
  },
});

export { dbClient };
