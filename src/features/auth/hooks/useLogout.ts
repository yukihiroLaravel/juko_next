import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from '@/lib/api';
import { useUser } from '@/hooks/useUser';

export function useLogout() {
  const router = useRouter();
  const { mutate } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      await Axios.post('/logout');
      await mutate(undefined, false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      await mutate(undefined, false);
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  }, [mutate, router]);

  return { logout, isLoggingOut };
}
