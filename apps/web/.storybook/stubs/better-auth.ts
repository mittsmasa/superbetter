// Stub for better-auth module in browser environment
export const betterAuth = () => ({
  $Infer: {
    Session: {},
  },
});
export const createAuthClient = () => ({});
export const drizzleAdapter = () => ({});
export const createAuthMiddleware = () => ({});
export const nextCookies = () => ({});

// @/lib/auth からのインポート用
export const auth = betterAuth();

export default betterAuth;
