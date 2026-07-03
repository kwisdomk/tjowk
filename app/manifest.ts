import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KWAIX Hub — Wisdom Kinoti',
    short_name: 'KWAIX Hub',
    description: 'Cybersecurity, AI & Systems Portfolio by Wisdom Kinoti',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
