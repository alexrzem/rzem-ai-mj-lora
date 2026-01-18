import type { AnalysisResult } from '../stores/project';
import dummySpecification from './data/dummy-specification.json';
import dummySettings from './data/dummy-settings.json';
import dummyProject from './data/dummy-project.json';

/**
 * Mock Tauri service for developer mode
 * Simulates backend responses with dummy data and realistic delays
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock implementation of Tauri's invoke function
 * Returns dummy data for all backend commands
 */
export async function invoke<T>(command: string, args?: Record<string, any>): Promise<T> {
  console.log(`[MOCK] invoke("${command}")`, args);

  // Simulate network/processing delay
  await delay(800);

  switch (command) {
    case 'analyze_style': {
      // Simulate longer processing time for analysis
      await delay(1200);

      const result: AnalysisResult = {
        data: JSON.stringify(dummySpecification),
        mode_used: 'cloud',
        fallback_used: false,
      };
      return result as T;
    }

    case 'get_settings': {
      return dummySettings as T;
    }

    case 'update_settings': {
      await delay(300);
      console.log('[MOCK] Settings updated:', args?.settings);
      return undefined as T;
    }

    case 'save_project': {
      await delay(500);
      console.log('[MOCK] Project saved to:', args?.path);
      return undefined as T;
    }

    case 'load_project': {
      await delay(600);
      console.log('[MOCK] Project loaded from:', args?.path);
      return JSON.stringify(dummyProject) as T;
    }

    case 'export_json': {
      await delay(400);
      console.log('[MOCK] JSON exported to:', args?.path);
      return undefined as T;
    }

    case 'export_markdown': {
      await delay(400);
      console.log('[MOCK] Markdown exported to:', args?.path);
      return undefined as T;
    }

    default:
      console.warn(`[MOCK] Unknown command: ${command}`);
      throw new Error(`Mock handler not implemented for command: ${command}`);
  }
}

/**
 * Check if developer mode is enabled
 */
export function isDevMode(): boolean {
  return import.meta.env.VITE_DEV_MODE === 'true';
}
