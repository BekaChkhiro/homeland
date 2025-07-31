import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export const useProperties = (filters?: any) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => apiClient.getProperties(filters),
    select: (data) => data.success ? data.data : [],
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => apiClient.getProperty(id),
    select: (data) => data.success ? data.data : null,
    enabled: !!id,
  });
};

export const useUserProperties = () => {
  return useQuery({
    queryKey: ['user-properties'],
    queryFn: () => apiClient.getUserProperties(),
    select: (data) => data.success ? data.data : [],
  });
};

export const useFavoriteProperties = () => {
  return useQuery({
    queryKey: ['favorite-properties'],
    queryFn: () => apiClient.getFavoriteProperties(),
    select: (data) => data.success ? data.data : [],
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (propertyData: any) => apiClient.createProperty(propertyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiClient.updateProperty(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
    },
  });
};

export const useFavoriteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.favoriteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['favorite-properties'] });
    },
  });
};

export const useUnfavoriteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.unfavoriteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['favorite-properties'] });
    },
  });
};