export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET,
  database: {
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.DATABASE_PORT),
    name: process.env.DB_NAME,
    password: process.env.PASSWORD,
    type: process.env.TYPE,
  },
});
