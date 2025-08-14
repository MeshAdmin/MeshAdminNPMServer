import { useEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface SelfHealingConfig {
  maxRetries?: number;
  retryDelay?: number;
  enableAutoRecovery?: boolean;
  enableNetworkRecovery?: boolean;
  enableStateRecovery?: boolean;
  onError?: (error: Error, context: any) => void;
  onRecovery?: (type: string, details: any) => void;
}

interface RecoveryAction {
  type: 'network' | 'state' | 'component' | 'data';
  action: () => Promise<void>;
  priority: number;
}

export const useSelfHealing = (config: SelfHealingConfig = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    enableAutoRecovery = true,
    enableNetworkRecovery = true,
    enableStateRecovery = true,
    onError,
    onRecovery,
  } = config;

  const queryClient = useQueryClient();
  const retryCountRef = useRef<Map<string, number>>(new Map());
  const recoveryQueueRef = useRef<RecoveryAction[]>([]);
  const [isRecovering, setIsRecovering] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [lastError, setLastError] = useState<Error | null>(null);

  /**
   * Network recovery handler
   */
  const handleNetworkRecovery = useCallback(async () => {
    if (!enableNetworkRecovery) return;

    const isOnline = navigator.onLine;
    setNetworkStatus(isOnline);

    if (isOnline && !networkStatus) {
      console.log('🌐 Network recovered, refreshing data...');
      
      // Invalidate all queries to refresh data
      await queryClient.invalidateQueries();
      
      // Retry failed mutations
      const mutations = queryClient.getMutationCache().getAll();
      for (const mutation of mutations) {
        if (mutation.state.status === 'error') {
          await mutation.execute();
        }
      }

      onRecovery?.('network', { wasOffline: true });
    }
  }, [networkStatus, enableNetworkRecovery, queryClient, onRecovery]);

  /**
   * State recovery handler
   */
  const handleStateRecovery = useCallback(async (error: Error) => {
    if (!enableStateRecovery) return;

    const errorKey = error.message;
    const retryCount = retryCountRef.current.get(errorKey) || 0;

    if (retryCount >= maxRetries) {
      console.error('Max retries exceeded for:', errorKey);
      return false;
    }

    retryCountRef.current.set(errorKey, retryCount + 1);

    // Attempt recovery based on error type
    if (error.message.includes('Cannot read properties')) {
      console.log('🔧 Attempting null reference recovery...');
      
      // Clear potentially corrupted cache
      queryClient.clear();
      
      // Reset React Query state
      await queryClient.resetQueries();
      
      onRecovery?.('state', { error: error.message, attempt: retryCount + 1 });
      return true;
    }

    if (error.message.includes('Maximum update depth exceeded')) {
      console.log('🔧 Attempting infinite loop recovery...');
      
      // Force component remount by clearing state
      window.location.reload();
      
      onRecovery?.('state', { error: error.message, action: 'reload' });
      return true;
    }

    return false;
  }, [enableStateRecovery, maxRetries, queryClient, onRecovery]);

  /**
   * Component error boundary recovery
   */
  const recoverFromComponentError = useCallback(async (error: Error, errorInfo: any) => {
    setLastError(error);
    
    if (!enableAutoRecovery) {
      onError?.(error, errorInfo);
      return;
    }

    console.log('🚨 Component error detected, attempting recovery...');

    // Try state recovery first
    const recovered = await handleStateRecovery(error);
    
    if (!recovered) {
      // Queue a recovery action
      recoveryQueueRef.current.push({
        type: 'component',
        action: async () => {
          // Clear local storage that might be corrupted
          const keysToPreserve = ['auth_token', 'user_preferences'];
          const allKeys = Object.keys(localStorage);
          
          allKeys.forEach(key => {
            if (!keysToPreserve.includes(key)) {
              localStorage.removeItem(key);
            }
          });

          // Reset application state
          queryClient.clear();
          
          onRecovery?.('component', { cleared: true });
        },
        priority: 1,
      });

      processRecoveryQueue();
    }

    onError?.(error, errorInfo);
  }, [enableAutoRecovery, handleStateRecovery, queryClient, onError, onRecovery]);

  /**
   * Process recovery queue
   */
  const processRecoveryQueue = useCallback(async () => {
    if (isRecovering || recoveryQueueRef.current.length === 0) {
      return;
    }

    setIsRecovering(true);

    // Sort by priority
    recoveryQueueRef.current.sort((a, b) => b.priority - a.priority);

    while (recoveryQueueRef.current.length > 0) {
      const recovery = recoveryQueueRef.current.shift();
      if (recovery) {
        try {
          console.log(`Processing recovery: ${recovery.type}`);
          await recovery.action();
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } catch (error) {
          console.error('Recovery action failed:', error);
        }
      }
    }

    setIsRecovering(false);
  }, [isRecovering, retryDelay]);

  /**
   * Manual recovery trigger
   */
  const triggerRecovery = useCallback(async (type: RecoveryAction['type']) => {
    const actions: Record<RecoveryAction['type'], () => Promise<void>> = {
      network: handleNetworkRecovery,
      state: async () => {
        await queryClient.resetQueries();
        onRecovery?.('state', { manual: true });
      },
      component: async () => {
        window.location.reload();
      },
      data: async () => {
        await queryClient.invalidateQueries();
        onRecovery?.('data', { manual: true });
      },
    };

    const action = actions[type];
    if (action) {
      await action();
    }
  }, [handleNetworkRecovery, queryClient, onRecovery]);

  /**
   * Monitor network status
   */
  useEffect(() => {
    const handleOnline = () => handleNetworkRecovery();
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleNetworkRecovery]);

  /**
   * Monitor for memory leaks
   */
  useEffect(() => {
    if (!window.performance || !window.performance.memory) return;

    const checkMemory = setInterval(() => {
      const memory = (window.performance as any).memory;
      const usedJSHeapSize = memory.usedJSHeapSize;
      const jsHeapSizeLimit = memory.jsHeapSizeLimit;
      
      const usage = (usedJSHeapSize / jsHeapSizeLimit) * 100;
      
      if (usage > 90) {
        console.warn(`High memory usage detected: ${usage.toFixed(2)}%`);
        
        // Queue memory recovery
        recoveryQueueRef.current.push({
          type: 'state',
          action: async () => {
            // Clear caches
            queryClient.clear();
            
            // Force garbage collection if available
            if ((window as any).gc) {
              (window as any).gc();
            }
            
            onRecovery?.('memory', { usage });
          },
          priority: 2,
        });
        
        processRecoveryQueue();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkMemory);
  }, [queryClient, onRecovery, processRecoveryQueue]);

  return {
    recoverFromComponentError,
    triggerRecovery,
    isRecovering,
    networkStatus,
    lastError,
    retryCount: retryCountRef.current,
  };
};

export default useSelfHealing;
