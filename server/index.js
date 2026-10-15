import { createApp } from './app.js';

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`[Shahdara Fiber Net] Server running on http://localhost:${PORT}`);
  console.log(`[Shahdara Fiber Net] Health check available at http://localhost:${PORT}/api/health`);
});
