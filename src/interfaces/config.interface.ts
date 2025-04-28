// config/configuration.interface.ts

export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
  
  export interface JwtConfig {
    secret: string;
    expiresIn: string;
  }
  
  export interface AppConfig {
    database: DatabaseConfig;
    jwt: JwtConfig;
  }
  