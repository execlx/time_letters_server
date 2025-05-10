export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BANNED = "banned"
}
export declare class User {
    id: number;
    username: string;
    email?: string;
    phone?: string;
    wechatOpenid?: string;
    password?: string;
    profilePicture?: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
