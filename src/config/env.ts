export default {
  DATABASE_URL:
    process.env.DATABASE_PRODUCTION ||
    "postgresql://postgres:melao153@localhost:5432/Restaurante?schema=public",
  JWT_SECRET: "ABCD2",
};
