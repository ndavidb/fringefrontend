// services/authService.ts
import { LoginDto } from '@/types/api';
import { TokenResponseDto } from '@/types/api';
import { RefreshTokenDto } from '@/types/api';
import { ForgotPasswordDto } from '@/types/api';
import { ResetPasswordDto } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5098';

// Helper function for fetch requests
async function fetchWithErrorHandling<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

// Login user
export async function loginUser(data: LoginDto): Promise<TokenResponseDto> {
    return fetchWithErrorHandling<TokenResponseDto>(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    });
}

// Refresh token
export async function refreshToken(data: RefreshTokenDto): Promise<TokenResponseDto> {
    return fetchWithErrorHandling<TokenResponseDto>(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    });
}

// Forgot password
export async function forgotPassword(data: ForgotPasswordDto): Promise<void> {
    return fetchWithErrorHandling<void>(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// Reset password
export async function resetPassword(data: ResetPasswordDto): Promise<void> {
    return fetchWithErrorHandling<void>(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}