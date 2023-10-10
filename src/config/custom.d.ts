// custom.d.ts
interface ImportMetaEnv {
  VITE_API_ENDPOINT: string;
  // Add other environment variables here
}

// Extend the global ImportMeta interface
interface ImportMeta {
  env: ImportMetaEnv;
}
