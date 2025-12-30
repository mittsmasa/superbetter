import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Super Better',
    short_name: 'Super Better',
    description: 'スーパーベターになろう',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
