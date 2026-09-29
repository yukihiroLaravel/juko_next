import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Axios } from '@/lib/api';
import { useUser } from '@/hooks/useUser';
import type { User, UserRole } from '../types';

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  error?: string;
};

const REDIRECT_PATHS: Record<UserRole, string> = {
  student: '/attendance',
  instructor: '/dashboard',
};

export function useLogin() {
  const router = useRouter();
  const { mutate } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResult> => {
      setIsSubmitting(true);

      try {
        await Axios.get('/sanctum/csrf-cookie');
        await Axios.post('/login', credentials);

        const response = await Axios.get<User>('/api/user');
        const user = response.data;

        await mutate(user, false);

        const redirectPath = REDIRECT_PATHS[user.role];
        router.push(redirectPath);

        return { success: true };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return {
            success: false,
            error: 'メールアドレスまたはパスワードが正しくありません',
          };
        }
        return {
          success: false,
          error: '予期しないエラーが発生しました',
        };
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate, router],
  );

  return { login, isSubmitting };
}
