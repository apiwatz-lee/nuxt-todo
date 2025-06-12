import type { User } from 'better-auth';

export function useUser() {
  const user = useState<User | null>('user', () => null);

  async function getCurrentUser() {
    try {
      const session = await authClient.getSession({
        fetchOptions: {
          // Web broser(Cookie) ==> Nuxt
          // **Nuxt ==> Better Auth (เอา Cookie ที่รับมา ส่งให้ Better Auth)
          // Better Auth ==> Database
          headers: useRequestHeaders(['cookie']),
        },
      });

      if (session.error || !session.data) {
        user.value = null;
        return;
      }

      user.value = session.data.user;
    } catch (error) {
      console.error(error);
      user.value = null;
    }
  }

  async function login(email: string, password: string) {
    const { data, error } = await authClient.signIn.email({ email, password });

    if (error) {
      throw new Error(error.message || 'Unknown error');
    }

    await getCurrentUser();
    return data;
  }

  async function logout() {
    await authClient.signOut();
    user.value = null;
    await navigateTo('/');
  }

  return {
    user,
    getCurrentUser,
    login,
    logout,
  };
}
