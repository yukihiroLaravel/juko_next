import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogin } from './useLogin';
import { Axios } from '@/lib/api';
import { useUser } from '@/hooks/useUser';
import { ROUTES } from '@/lib/routes';

// Axios と router をモック
vi.mock('@/lib/api', () => ({
  Axios: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/hooks/useUser', () => ({
  useUser: () => ({
    mutate: vi.fn(),
  }),
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('受講生ログインは /login に送信し、/attendance に遷移する', async () => {
    // Arrange
    Axios.get.mockResolvedValueOnce({}); // csrf-cookie
    Axios.post.mockResolvedValueOnce({}); // login
    Axios.get.mockResolvedValueOnce({
      data: { role: 'student' },
    }); // /api/user

    const { result } = renderHook(() => useLogin());

    // Act
    await act(async () => {
      await result.current.login({
        email: 'student@example.com',
        password: 'password123',
        role: 'student',
      });
    });

    // Assert
    expect(Axios.post).toHaveBeenCalledWith('/login', {
      email: 'student@example.com',
      password: 'password123',
    });

    const router = require('next/navigation').useRouter();
    expect(router.push).toHaveBeenCalledWith(ROUTES.student.attendance);
  });

  it('講師ログインは /login/instructor に送信し、/instructor/courses に遷移する', async () => {
    // Arrange
    Axios.get.mockResolvedValueOnce({}); // csrf-cookie
    Axios.post.mockResolvedValueOnce({}); // login
    Axios.get.mockResolvedValueOnce({
      data: { role: 'instructor' },
    }); // /api/user

    const { result } = renderHook(() => useLogin());

    // Act
    await act(async () => {
      await result.current.login({
        email: 'teacher@example.com',
        password: 'password123',
        role: 'instructor',
      });
    });

    // Assert
    expect(Axios.post).toHaveBeenCalledWith('/login/instructor', {
      email: 'teacher@example.com',
      password: 'password123',
    });

    const router = require('next/navigation').useRouter();
    expect(router.push).toHaveBeenCalledWith(ROUTES.instructor.courses);
  });
});
