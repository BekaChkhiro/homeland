const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`Making request to: ${url}`, config);
      const response = await fetch(url, config);
      
      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log(`Response from ${endpoint}:`, { status: response.status, data });

        if (!response.ok) {
          return {
            success: false,
            error: data.message || data.error || 'An error occurred',
          };
        }

        return {
          success: true,
          data,
        };
      } else {
        // Non-JSON response
        const text = await response.text();
        console.error(`Non-JSON response from ${endpoint}:`, text);
        return {
          success: false,
          error: 'Invalid response from server',
        };
      }
    } catch (error) {
      console.error(`Network error for ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request<{ accessToken: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    // Transform frontend data structure to match backend expectations
    const backendData = {
      fullName: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      password: userData.password,
      phone: userData.phone
    };
  
    return this.request<{ accessToken?: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(backendData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  }

  // User endpoints
  async getProfile() {
    return this.request<any>('/users/profile');
  }

  async updateProfile(profileData: any) {
    return this.request<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    return this.request('/users/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // Properties endpoints
  async getProperties(filters?: any) {
    const queryParams = filters ? new URLSearchParams(filters).toString() : '';
    return this.request<any>(`/properties${queryParams ? `?${queryParams}` : ''}`);
  }

  async getProperty(id: string) {
    return this.request<any>(`/properties/${id}`);
  }

  async createProperty(propertyData: any) {
    return this.request<any>('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(id: string, propertyData: any) {
    return this.request<any>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(id: string) {
    return this.request(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserProperties() {
    return this.request<any>('/properties/my-properties');
  }

  async favoriteProperty(id: string) {
    return this.request(`/properties/${id}/favorite`, {
      method: 'POST',
    });
  }

  async unfavoriteProperty(id: string) {
    return this.request(`/properties/${id}/favorite`, {
      method: 'DELETE',
    });
  }

  async getFavoriteProperties() {
    return this.request<any>('/properties/favorites');
  }

  // Search endpoints
  async searchProperties(query: string, filters?: any) {
    const params = new URLSearchParams({ q: query, ...filters });
    return this.request<any>(`/search?${params.toString()}`);
  }

  // Admin endpoints
  async getUsers() {
    return this.request<any>('/admin/users');
  }

  async updateUser(id: string, userData: any) {
    return this.request<any>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminStats() {
    return this.request<any>('/admin/stats');
  }

  // File upload utility
  async uploadFile(file: File, endpoint: string) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Upload failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  async uploadPropertyImages(propertyId: string, files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}/properties/${propertyId}/images`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Upload failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;