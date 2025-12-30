import { vi } from 'vitest';

export const TEST_USER_EMAIL = 'superbetter@example.com';

/**
 * getUser()をモック化して、テストユーザーを返す
 */
export const mockGetUser = (userId: string) => {
  vi.mock('@/app/(private)/_actions/get-user', () => ({
    getUser: vi.fn().mockResolvedValue({ id: userId }),
  }));
};

/**
 * モックをリセット
 */
export const resetAuthMock = () => {
  vi.restoreAllMocks();
};
