import app from './app.ts';

Bun.serve({
  fetch: app.fetch,
});

console.log('server running');
