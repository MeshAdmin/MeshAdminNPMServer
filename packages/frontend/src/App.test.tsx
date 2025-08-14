import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import App from './App';

// Mock API service
vi.mock('./services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock auth context
vi.mock('./contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('App Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  const renderApp = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('should render the main application', () => {
    renderApp();
    
    // Check for main app structure
    expect(document.querySelector('.app-container')).toBeInTheDocument();
  });

  it('should display navigation menu', () => {
    renderApp();
    
    // Check for navigation elements
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should handle theme toggle', async () => {
    const user = userEvent.setup();
    renderApp();
    
    // Find and click theme toggle button
    const themeToggle = screen.getByLabelText(/theme/i);
    await user.click(themeToggle);
    
    // Check if theme class is applied
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
    });
    
    // Toggle back
    await user.click(themeToggle);
    await waitFor(() => {
      expect(document.documentElement).not.toHaveClass('dark');
    });
  });

  it('should show login page when not authenticated', () => {
    renderApp();
    
    // Check for login form elements
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('should handle navigation menu interactions', async () => {
    const user = userEvent.setup();
    renderApp();
    
    // Find and click menu button (for mobile)
    const menuButton = screen.queryByLabelText(/menu/i);
    if (menuButton) {
      await user.click(menuButton);
      
      // Check if menu is expanded
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveAttribute('aria-expanded', 'true');
      });
    }
  });

  it('should display error boundary on error', () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Create a component that throws an error
    const ThrowError = () => {
      throw new Error('Test error');
    };
    
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App>
            <ThrowError />
          </App>
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    // Check for error boundary message
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    renderApp();
    
    // Tab through interactive elements
    await user.tab();
    expect(document.activeElement).toHaveAttribute('tabIndex');
    
    await user.tab();
    expect(document.activeElement).toHaveAttribute('tabIndex');
  });

  it('should be responsive to screen size changes', () => {
    renderApp();
    
    // Simulate mobile viewport
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    
    // Check for mobile-specific classes
    const appContainer = document.querySelector('.app-container');
    expect(appContainer).toHaveClass('mobile');
    
    // Simulate desktop viewport
    window.innerWidth = 1920;
    window.dispatchEvent(new Event('resize'));
    
    // Check for desktop-specific classes
    expect(appContainer).toHaveClass('desktop');
  });

  it('should handle loading states gracefully', async () => {
    renderApp();
    
    // Check for loading indicators
    const loadingElements = screen.queryAllByText(/loading/i);
    expect(loadingElements.length).toBeGreaterThanOrEqual(0);
    
    // Wait for content to load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should have proper accessibility attributes', () => {
    renderApp();
    
    // Check for ARIA labels
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    
    // Check for heading hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Check for alt text on images
    const images = screen.queryAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });
});
