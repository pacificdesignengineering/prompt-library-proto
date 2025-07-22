import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,        // Explicitly bind to 5174
    strictPort: true,  // Fail if port is taken
    open: true,        // Automatically open browser
    fs: {
      strict: false    // Allow access to outside files if needed
    }
  }
});
