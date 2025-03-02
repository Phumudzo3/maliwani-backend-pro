export declare class Jwt {
    static jwtSign(payload: any, userId: string, expires_In?: string | number): string;
    static jwtVerify(token: string): Promise<any>;
    static jwtSignRefreshToken(payload: any, userId: string, expires_In?: string | number, redis_ex?: number): Promise<string>;
    static jwtVerifyRefreshToken(refreshToken: string): Promise<any>;
    private static gen_secret_key;
}
