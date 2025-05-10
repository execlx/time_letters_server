export const AUTH_STRATEGY = {
  LOCAL: 'local',
  PHONE: 'phone',
  WECHAT: 'wechat',
  JWT: 'jwt',
} as const;

export const AUTH_ERROR = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
  PHONE_ALREADY_EXISTS: 'Phone number already exists',
  WECHAT_ALREADY_EXISTS: 'WeChat account already exists',
  INVALID_PHONE_CODE: 'Invalid phone verification code',
  INVALID_WECHAT_CODE: 'Invalid WeChat code',
} as const;

export const AUTH_MESSAGE = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  PASSWORD_CHANGE_SUCCESS: 'Password changed successfully',
} as const; 