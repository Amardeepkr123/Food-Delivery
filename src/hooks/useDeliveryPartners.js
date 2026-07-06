import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deliveryPartnersAPI, apiHelpers } from '../services/api';
import { toast } from 'react-toastify';

// Query keys for caching
export const QUERY_KEYS = {
  partners: 'delivery-partners',
  partner: 'delivery-partner',
  stats: 'delivery-partner-stats',
  earnings: 'delivery-partner-earnings',
  performance: 'delivery-partner-performance',
  location: 'delivery-partner-location',
  orders: 'delivery-partner-orders',
  ratings: 'delivery-partner-ratings',
  documents: 'delivery-partner-documents',
  notifications: 'delivery-partner-notifications',
  withdrawals: 'delivery-partner-withdrawals',
};

export const useDeliveryPartners = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.partners, params],
    async () => {
      const response = await deliveryPartnersAPI.getAll(params);
      return response.data || [];
    },
    {
      staleTime: 30000,
      cacheTime: 60000,
      refetchInterval: 30000,
      keepPreviousData: true,
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to load delivery partners'));
      },
    }
  );
};

export const useDeliveryPartner = (id) => {
  return useQuery(
    [QUERY_KEYS.partner, id],
    async () => {
      const response = await deliveryPartnersAPI.getById(id);
      return response.data;
    },
    {
      enabled: !!id,
      staleTime: 60000,
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to load partner details'));
      },
    }
  );
};

export const usePartnerStats = () => {
  return useQuery(
    QUERY_KEYS.stats,
    async () => {
      const response = await deliveryPartnersAPI.getStats();
      return response.data;
    },
    {
      staleTime: 30000,
      refetchInterval: 60000,
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to load statistics'));
      },
    }
  );
};

export const usePartnerEarnings = (id, period = 'month') => {
  return useQuery(
    [QUERY_KEYS.earnings, id, period],
    async () => {
      const response = await deliveryPartnersAPI.getEarnings(id, period);
      return response.data;
    },
    {
      enabled: !!id,
      staleTime: 60000,
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to load earnings'));
      },
    }
  );
};

export const usePartnerPerformance = (id) => {
  return useQuery(
    [QUERY_KEYS.performance, id],
    async () => {
      const response = await deliveryPartnersAPI.getPerformance(id);
      return response.data;
    },
    {
      enabled: !!id,
      staleTime: 60000,
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to load performance data'));
      },
    }
  );
};

export const usePartnerLocation = (id, enabled = true) => {
  return useQuery(
    [QUERY_KEYS.location, id],
    async () => {
      const response = await deliveryPartnersAPI.getLocation(id);
      return response.data;
    },
    {
      enabled: !!id && enabled,
      staleTime: 5000,
      refetchInterval: 5000,
      onError: (error) => {
        console.error('Location fetch error:', error);
      },
    }
  );
};

// Mutations
export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (data) => {
      const response = await deliveryPartnersAPI.create(data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries(QUERY_KEYS.stats);
        toast.success('Delivery partner created successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to create delivery partner'));
      },
    }
  );
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const response = await deliveryPartnersAPI.update(id, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries([QUERY_KEYS.partner, variables.id]);
        queryClient.invalidateQueries(QUERY_KEYS.stats);
        toast.success('Partner updated successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to update partner'));
      },
    }
  );
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id) => {
      const response = await deliveryPartnersAPI.delete(id);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries(QUERY_KEYS.stats);
        toast.success('Partner deleted successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to delete partner'));
      },
    }
  );
};

export const useUpdatePartnerStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, status }) => {
      const response = await deliveryPartnersAPI.updateStatus(id, status);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries([QUERY_KEYS.partner, variables.id]);
        queryClient.invalidateQueries(QUERY_KEYS.stats);
        toast.success(`Partner ${variables.status === 'blocked' ? 'blocked' : 'unblocked'} successfully`);
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to update status'));
      },
    }
  );
};

export const useAssignOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ partnerId, orderId }) => {
      const response = await deliveryPartnersAPI.assignOrder(partnerId, orderId);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.partner, variables.partnerId]);
        queryClient.invalidateQueries([QUERY_KEYS.orders, variables.partnerId]);
        toast.success('Order assigned successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to assign order'));
      },
    }
  );
};

export const useSuspendPartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, reason }) => {
      const response = await deliveryPartnersAPI.suspend(id, reason);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries([QUERY_KEYS.partner, variables.id]);
        toast.success('Partner suspended successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to suspend partner'));
      },
    }
  );
};

export const useActivatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id) => {
      const response = await deliveryPartnersAPI.activate(id);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries([QUERY_KEYS.partner, variables]);
        toast.success('Partner activated successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to activate partner'));
      },
    }
  );
};

export const useRequestWithdrawal = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, amount }) => {
      const response = await deliveryPartnersAPI.requestWithdrawal(id, amount);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.earnings, variables.id]);
        queryClient.invalidateQueries([QUERY_KEYS.withdrawals, variables.id]);
        toast.success('Withdrawal request submitted successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to request withdrawal'));
      },
    }
  );
};

export const useExportPartners = () => {
  return useMutation(
    async (params = {}) => {
      const response = await deliveryPartnersAPI.exportData(params);
      return response;
    },
    {
      onSuccess: (data) => {
        // Create download link
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `delivery-partners-${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Data exported successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to export data'));
      },
    }
  );
};

export const useImportPartners = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (file) => {
      const response = await deliveryPartnersAPI.importData(file);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.partners);
        queryClient.invalidateQueries(QUERY_KEYS.stats);
        toast.success('Partners imported successfully');
      },
      onError: (error) => {
        toast.error(apiHelpers.getErrorMessage(error, 'Failed to import partners'));
      },
    }
  );
};

// Combine all hooks into one object for easy import
export const useDeliveryPartnersAPI = () => {
  const queryClient = useQueryClient();

  return {
    // Queries
    usePartners: useDeliveryPartners,
    usePartner: useDeliveryPartner,
    useStats: usePartnerStats,
    useEarnings: usePartnerEarnings,
    usePerformance: usePartnerPerformance,
    useLocation: usePartnerLocation,
    
    // Mutations
    useCreate: useCreatePartner,
    useUpdate: useUpdatePartner,
    useDelete: useDeletePartner,
    useUpdateStatus: useUpdatePartnerStatus,
    useAssignOrder: useAssignOrder,
    useSuspend: useSuspendPartner,
    useActivate: useActivatePartner,
    useWithdrawal: useRequestWithdrawal,
    useExport: useExportPartners,
    useImport: useImportPartners,
    
    // Utility
    invalidateQueries: (key) => queryClient.invalidateQueries(key),
    refetchQueries: (key) => queryClient.refetchQueries(key),
  };
};