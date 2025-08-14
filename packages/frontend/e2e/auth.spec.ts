import { test, expect, Page } from '@playwright/test';
import { SelfHealingHelper } from './helpers/self-healing';

const selfHealing = new SelfHealingHelper();

test.describe('Authentication Flow', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/');
  });

  test('should display login form', async () => {
    // Self-healing selector strategy
    const loginForm = await selfHealing.findElement(page, {
      primary: 'form[data-testid="login-form"]',
      fallbacks: [
        'form.login-form',
        'form#loginForm',
        '//form[contains(@class, "login")]',
      ],
      attributes: ['login', 'auth', 'signin'],
    });

    expect(loginForm).toBeTruthy();
    
    // Check for essential form elements
    const emailInput = await selfHealing.findElement(page, {
      primary: 'input[type="email"]',
      fallbacks: [
        'input[name="email"]',
        'input[placeholder*="email"]',
        '//input[@type="text" and contains(@placeholder, "email")]',
      ],
    });
    
    const passwordInput = await selfHealing.findElement(page, {
      primary: 'input[type="password"]',
      fallbacks: [
        'input[name="password"]',
        'input[placeholder*="password"]',
      ],
    });
    
    const submitButton = await selfHealing.findElement(page, {
      primary: 'button[type="submit"]',
      fallbacks: [
        'button:has-text("Sign In")',
        'button:has-text("Login")',
        '//button[contains(text(), "Sign")]',
      ],
    });

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  test('should handle login with valid credentials', async () => {
    // Fill in login form
    await selfHealing.fillInput(page, {
      selector: {
        primary: 'input[type="email"]',
        fallbacks: ['input[name="email"]'],
      },
      value: 'test@example.com',
    });

    await selfHealing.fillInput(page, {
      selector: {
        primary: 'input[type="password"]',
        fallbacks: ['input[name="password"]'],
      },
      value: 'TestPassword123!',
    });

    // Submit form
    await selfHealing.clickElement(page, {
      primary: 'button[type="submit"]',
      fallbacks: ['button:has-text("Sign In")'],
    });

    // Wait for navigation or dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 }).catch(() => {
      // If URL doesn't change, check for dashboard elements
      return selfHealing.waitForElement(page, {
        primary: '[data-testid="dashboard"]',
        fallbacks: ['.dashboard', '#dashboard'],
      });
    });

    // Verify successful login
    const userMenu = await selfHealing.findElement(page, {
      primary: '[data-testid="user-menu"]',
      fallbacks: [
        '.user-menu',
        '[aria-label="User menu"]',
        '//div[contains(@class, "user")]',
      ],
    });

    expect(userMenu).toBeTruthy();
  });

  test('should display validation errors for invalid input', async () => {
    // Submit empty form
    await selfHealing.clickElement(page, {
      primary: 'button[type="submit"]',
      fallbacks: ['button:has-text("Sign In")'],
    });

    // Check for validation errors
    const emailError = await selfHealing.waitForElement(page, {
      primary: '[data-testid="email-error"]',
      fallbacks: [
        '.error-message',
        'span:has-text("required")',
        '//span[contains(text(), "email")]',
      ],
    }, 5000);

    expect(emailError).toBeTruthy();
  });

  test('should handle logout flow', async () => {
    // First login
    await test.step('Login', async () => {
      await selfHealing.fillInput(page, {
        selector: {
          primary: 'input[type="email"]',
          fallbacks: ['input[name="email"]'],
        },
        value: 'test@example.com',
      });

      await selfHealing.fillInput(page, {
        selector: {
          primary: 'input[type="password"]',
          fallbacks: ['input[name="password"]'],
        },
        value: 'TestPassword123!',
      });

      await selfHealing.clickElement(page, {
        primary: 'button[type="submit"]',
        fallbacks: ['button:has-text("Sign In")'],
      });

      await page.waitForTimeout(2000);
    });

    // Then logout
    await test.step('Logout', async () => {
      const userMenu = await selfHealing.clickElement(page, {
        primary: '[data-testid="user-menu"]',
        fallbacks: ['.user-menu', '[aria-label="User menu"]'],
      });

      const logoutButton = await selfHealing.clickElement(page, {
        primary: '[data-testid="logout-button"]',
        fallbacks: [
          'button:has-text("Logout")',
          'button:has-text("Sign Out")',
          'a:has-text("Logout")',
        ],
      });

      // Verify redirect to login
      await page.waitForURL('**/login', { timeout: 5000 }).catch(() => {
        return page.waitForURL('/', { timeout: 5000 });
      });

      // Verify login form is visible again
      const loginForm = await selfHealing.findElement(page, {
        primary: 'form[data-testid="login-form"]',
        fallbacks: ['form.login-form'],
      });

      expect(loginForm).toBeTruthy();
    });
  });

  test('should be accessible', async () => {
    // Run accessibility checks
    const violations = await selfHealing.checkAccessibility(page);
    
    if (violations.length > 0) {
      console.log('Accessibility violations found:', violations);
      // Auto-fix common accessibility issues
      await selfHealing.fixAccessibilityIssues(page, violations);
    }
    
    expect(violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });
});
