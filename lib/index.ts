// API utility functions for making HTTP requests
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(
    endpoint: string,
    method: HttpMethod,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      };

      if (options?.body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.body = JSON.stringify(options.body);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const data = await response.json();

      return {
        success: response.ok,
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : data.error || 'An error occurred',
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: 'Network error. Please try again.',
        status: 0,
      };
    }
  }

  // HTTP method shortcuts
  async get<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', options);
  }

  async post<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', { ...options, body });
  }

  async put<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', { ...options, body });
  }

  async delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', options);
  }

  async patch<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', { ...options, body });
  }
}

// Create and export the API client instance
export const api = new ApiClient();

// Export types for use in components
export type { ApiResponse };