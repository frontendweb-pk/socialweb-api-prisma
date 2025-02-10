export declare class Password {
    static hash(password: string): Promise<string>;
    static compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=password.d.ts.map