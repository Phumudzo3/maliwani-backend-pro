export declare class GlobalMiddleWare {
    static checkError(req: any, res: any, next: any): any;
    static auth(req: any, res: any, next: any): Promise<any>;
    static decodeRefreshToken(req: any, res: any, next: any): Promise<any>;
    static adminRole(req: any, res: any, next: any): any;
    static adminStoreRole(req: any, res: any, next: any): any;
}
