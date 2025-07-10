export const analyticsConfig = {
  AMPLITUDE_API_KEY: import.meta.env.VITE_AMPLITUDE_API_KEY || 'your-amplitude-api-key-here',
  

  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  

  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
} as const; 