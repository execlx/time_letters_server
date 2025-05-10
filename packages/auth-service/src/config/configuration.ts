// config/configuration.ts
export default () => ({
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    deepseek: {
      apiKey: process.env.DEEPSEEK_API_KEY,
      apiBaseUrl: process.env.DEEPSEEK_API_BASE_URL || 'https://api.deepseek.com',
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    },
  });
  