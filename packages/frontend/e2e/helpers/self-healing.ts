import { Page, Locator } from '@playwright/test';
import axe from 'axe-core';

interface SelectorStrategy {
  primary: string;
  fallbacks: string[];
  attributes?: string[];
}

interface InputOptions {
  selector: SelectorStrategy;
  value: string;
}

export class SelfHealingHelper {
  private selectorCache = new Map<string, string>();
  private healingLog: Array<{ original: string; healed: string; timestamp: Date }> = [];

  /**
   * Find element with self-healing capabilities
   */
  async findElement(page: Page, strategy: SelectorStrategy): Promise<Locator | null> {
    // Try primary selector first
    try {
      const element = page.locator(strategy.primary);
      if (await element.count() > 0) {
        this.selectorCache.set(JSON.stringify(strategy), strategy.primary);
        return element.first();
      }
    } catch (error) {
      console.log(`Primary selector failed: ${strategy.primary}`);
    }

    // Try fallback selectors
    for (const fallback of strategy.fallbacks) {
      try {
        const element = page.locator(fallback);
        if (await element.count() > 0) {
          this.healingLog.push({
            original: strategy.primary,
            healed: fallback,
            timestamp: new Date(),
          });
          this.selectorCache.set(JSON.stringify(strategy), fallback);
          console.log(`Healed selector: ${strategy.primary} -> ${fallback}`);
          return element.first();
        }
      } catch (error) {
        console.log(`Fallback selector failed: ${fallback}`);
      }
    }

    // Try attribute-based healing
    if (strategy.attributes) {
      for (const attr of strategy.attributes) {
        const healedSelector = await this.healByAttribute(page, attr);
        if (healedSelector) {
          const element = page.locator(healedSelector);
          if (await element.count() > 0) {
            this.healingLog.push({
              original: strategy.primary,
              healed: healedSelector,
              timestamp: new Date(),
            });
            this.selectorCache.set(JSON.stringify(strategy), healedSelector);
            console.log(`Healed by attribute: ${strategy.primary} -> ${healedSelector}`);
            return element.first();
          }
        }
      }
    }

    // Try visual healing (find similar elements)
    const visualHealed = await this.healByVisualSimilarity(page, strategy.primary);
    if (visualHealed) {
      return visualHealed;
    }

    return null;
  }

  /**
   * Wait for element with self-healing
   */
  async waitForElement(
    page: Page,
    strategy: SelectorStrategy,
    timeout: number = 10000
  ): Promise<Locator | null> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const element = await this.findElement(page, strategy);
      if (element) {
        return element;
      }
      await page.waitForTimeout(500);
    }
    
    return null;
  }

  /**
   * Click element with self-healing
   */
  async clickElement(page: Page, strategy: SelectorStrategy): Promise<void> {
    const element = await this.findElement(page, strategy);
    if (!element) {
      throw new Error(`Could not find element with strategy: ${JSON.stringify(strategy)}`);
    }
    
    try {
      await element.click();
    } catch (error) {
      // Try scrolling into view and clicking again
      await element.scrollIntoViewIfNeeded();
      await element.click();
    }
  }

  /**
   * Fill input with self-healing
   */
  async fillInput(page: Page, options: InputOptions): Promise<void> {
    const element = await this.findElement(page, options.selector);
    if (!element) {
      throw new Error(`Could not find input with strategy: ${JSON.stringify(options.selector)}`);
    }
    
    await element.clear();
    await element.fill(options.value);
  }

  /**
   * Heal selector by attribute matching
   */
  private async healByAttribute(page: Page, attribute: string): Promise<string | null> {
    const possibleSelectors = [
      `[data-testid*="${attribute}"]`,
      `[id*="${attribute}"]`,
      `[class*="${attribute}"]`,
      `[name*="${attribute}"]`,
      `[aria-label*="${attribute}"]`,
    ];

    for (const selector of possibleSelectors) {
      try {
        const element = page.locator(selector);
        if (await element.count() > 0) {
          return selector;
        }
      } catch {
        // Continue to next selector
      }
    }

    return null;
  }

  /**
   * Heal by visual similarity
   */
  private async healByVisualSimilarity(page: Page, originalSelector: string): Promise<Locator | null> {
    // Extract key information from original selector
    const tagMatch = originalSelector.match(/^(\w+)/);
    const textMatch = originalSelector.match(/has-text\("([^"]+)"\)/);
    
    if (!tagMatch && !textMatch) {
      return null;
    }

    // Build similar selector
    let healedSelector = '';
    if (tagMatch) {
      healedSelector = tagMatch[1];
    }
    if (textMatch) {
      healedSelector += `:has-text("${textMatch[1]}")`;
    }

    if (healedSelector) {
      try {
        const element = page.locator(healedSelector);
        if (await element.count() > 0) {
          this.healingLog.push({
            original: originalSelector,
            healed: healedSelector,
            timestamp: new Date(),
          });
          console.log(`Visual healing: ${originalSelector} -> ${healedSelector}`);
          return element.first();
        }
      } catch {
        // Visual healing failed
      }
    }

    return null;
  }

  /**
   * Check accessibility violations
   */
  async checkAccessibility(page: Page): Promise<any[]> {
    const accessibilityResults = await page.evaluate(() => {
      return (window as any).axe.run();
    });

    return accessibilityResults.violations || [];
  }

  /**
   * Auto-fix common accessibility issues
   */
  async fixAccessibilityIssues(page: Page, violations: any[]): Promise<void> {
    for (const violation of violations) {
      switch (violation.id) {
        case 'image-alt':
          // Add alt text to images
          await page.evaluate(() => {
            document.querySelectorAll('img:not([alt])').forEach((img: any) => {
              img.alt = 'Image';
            });
          });
          break;
          
        case 'label':
          // Add labels to form inputs
          await page.evaluate(() => {
            document.querySelectorAll('input:not([aria-label])').forEach((input: any) => {
              const placeholder = input.placeholder || input.name || 'Input';
              input.setAttribute('aria-label', placeholder);
            });
          });
          break;
          
        case 'button-name':
          // Add accessible names to buttons
          await page.evaluate(() => {
            document.querySelectorAll('button:not([aria-label])').forEach((button: any) => {
              if (!button.textContent?.trim()) {
                button.setAttribute('aria-label', 'Button');
              }
            });
          });
          break;
          
        case 'color-contrast':
          // Log contrast issues for manual review
          console.log('Color contrast issues detected - manual review required');
          break;
      }
    }
  }

  /**
   * Generate healing report
   */
  generateHealingReport(): string {
    const report = {
      totalHealed: this.healingLog.length,
      healingLog: this.healingLog,
      cachedSelectors: Array.from(this.selectorCache.entries()),
      timestamp: new Date(),
    };

    return JSON.stringify(report, null, 2);
  }

  /**
   * Save healing patterns for future use
   */
  async saveHealingPatterns(filePath: string): Promise<void> {
    const fs = await import('fs').then(m => m.promises);
    const report = this.generateHealingReport();
    await fs.writeFile(filePath, report, 'utf-8');
    console.log(`Healing patterns saved to ${filePath}`);
  }
}
