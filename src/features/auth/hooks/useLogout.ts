import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from '@/lib/api';
import { useUser } from '@/hooks/useUser';
import type { UserRole } from '../types';

export function useLogout() {
  const router = useRouter();
  const { mutate } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(
    async (role: UserRole = 'student') => {
      setIsLoggingOut(true);

      try {
        const logoutUrl =
          role === 'instructor' ? '/logout/instructor' : '/logout';

        await Axios.post(logoutUrl);
        await mutate(undefined, false);
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
        await mutate(undefined, false);
        router.push('/');
      } finally {
        setIsLoggingOut(false);
      }
    },
    [mutate, router],
  );

  return { logout, isLoggingOut };
}
