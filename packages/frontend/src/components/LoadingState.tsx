import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  /** Loading message to display */
  message?: string;
  /** Size variant of the loader */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show as overlay */
  overlay?: boolean;
  /** Custom className */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'medium',
  overlay = false,
  className = '',
  ariaLabel = 'Loading content',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const content = (
    <div
      className={`flex flex-col items-center justify-center ${
        overlay ? 'min-h-screen' : 'py-8'
      } ${className}`}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-blue-600 dark:text-blue-400`}
        aria-hidden="true"
      />
      {message && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingState;
