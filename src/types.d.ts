// Type declarations for raw markdown imports
declare module '*.md?raw' {
  const content: string;
  export default content;
}

// Global augmentation for Vite env
declare global {
  interface ImportMetaEnv {
    readonly BASE_URL: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {}; // ensure this file is treated as a module
