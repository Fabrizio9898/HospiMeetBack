export declare const generateToken: (user: {
    id: string;
    email: string;
    role?: string;
}) => Promise<string>;
