declare const _default: () => {
    database: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string;
    };
    deepseek: {
        apiKey: string | undefined;
        apiBaseUrl: string;
        model: string;
    };
};
export default _default;
