import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 50);

    // Auto-remove after duration
    if (notification.duration !== 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, notification.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'info':
        return <Info size={20} className="text-blue-400" />;
      default:
        return <Info size={20} className="text-gray-400" />;
    }
  };

  const getStyles = () => {
    const baseStyles = 'border-l-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50';

    switch (notification.type) {
      case 'success':
        return `${baseStyles} border-l-green-400 border-r-green-400/20 border-t-green-400/20 border-b-green-400/20`;
      case 'error':
        return `${baseStyles} border-l-red-400 border-r-red-400/20 border-t-red-400/20 border-b-red-400/20`;
      case 'warning':
        return `${baseStyles} border-l-yellow-400 border-r-yellow-400/20 border-t-yellow-400/20 border-b-yellow-400/20`;
      case 'info':
        return `${baseStyles} border-l-blue-400 border-r-blue-400/20 border-t-blue-400/20 border-b-blue-400/20`;
      default:
        return baseStyles;
    }
  };

  return (
    <div
      className={`
        transition-all duration-300 ease-in-out transform
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'scale-95' : 'scale-100'}
      `}
    >
      <div className={`rounded-lg p-4 shadow-lg max-w-md w-full ${getStyles()}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-100">{notification.title}</h4>
                {notification.message && (
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                )}
              </div>

              <button
                onClick={handleRemove}
                className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-gray-200 transition-colors rounded"
              >
                <X size={16} />
              </button>
            </div>

            {notification.action && (
              <div className="mt-3">
                <button
                  onClick={() => {
                    notification.action?.onClick();
                    handleRemove();
                  }}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {notification.action.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-h-screen overflow-hidden">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default NotificationSystem;

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (title: string, message?: string, action?: Notification['action']) => {
    return addNotification({ type: 'success', title, message, action });
  };

  const showError = (title: string, message?: string, action?: Notification['action']) => {
    return addNotification({ type: 'error', title, message, action });
  };

  const showWarning = (title: string, message?: string, action?: Notification['action']) => {
    return addNotification({ type: 'warning', title, message, action });
  };

  const showInfo = (title: string, message?: string, action?: Notification['action']) => {
    return addNotification({ type: 'info', title, message, action });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
