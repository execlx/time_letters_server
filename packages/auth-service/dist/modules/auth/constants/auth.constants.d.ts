export declare const AUTH_STRATEGY: {
    readonly LOCAL: "local";
    readonly PHONE: "phone";
    readonly WECHAT: "wechat";
    readonly JWT: "jwt";
};
export declare const AUTH_ERROR: {
    readonly INVALID_CREDENTIALS: "Invalid credentials";
    readonly USER_NOT_FOUND: "User not found";
    readonly PHONE_ALREADY_EXISTS: "Phone number already exists";
    readonly WECHAT_ALREADY_EXISTS: "WeChat account already exists";
    readonly INVALID_PHONE_CODE: "Invalid phone verification code";
    readonly INVALID_WECHAT_CODE: "Invalid WeChat code";
};
export declare const AUTH_MESSAGE: {
    readonly LOGIN_SUCCESS: "Login successful";
    readonly LOGOUT_SUCCESS: "Logout successful";
    readonly PASSWORD_RESET_SUCCESS: "Password reset successful";
    readonly PASSWORD_CHANGE_SUCCESS: "Password changed successfully";
};
