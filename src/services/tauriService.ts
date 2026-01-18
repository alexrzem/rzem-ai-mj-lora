/**
 * Tauri service abstraction
 * Exports either real or mock Tauri invoke based on VITE_DEV_MODE environment variable
 */

const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

if (isDevMode) {
  console.log('🚀 Developer Mode: Using mock Tauri service');
}

// Dynamically import the appropriate service
export const { invoke } = isDevMode
  ? await import('../mock/mockTauriService')
  : await import('@tauri-apps/api/core');
