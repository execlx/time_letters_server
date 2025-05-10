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
export interface DeepseekConfig {
    apiKey: string;
    apiBaseUrl: string;
    model: string;
}
export interface JWTPayload {
    sub: string;
    username: string;
    email?: string;
    phone?: string;
    iat?: number;
    exp?: number;
}
export interface AppConfig {
    database: DatabaseConfig;
    jwt: JwtConfig;
    deepseek: DeepseekConfig;
}
