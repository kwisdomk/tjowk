import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'KWAIX Hub — Wisdom Kinoti';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const logoData = await fetch(
    new URL('../public/brand/kwaix-logo.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b', // dark background matching site
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
          borderTop: '8px solid #10b981', // emerald-500
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Using the arrayBuffer as src works natively in ImageResponse (Satori) */}
            <img
              src={logoData as any}
              width="64"
              height="64"
              style={{ objectFit: 'contain' }}
            />
            <h1
              style={{
                fontSize: '64px',
                color: '#fafafa',
                margin: 0,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              KWAIX Hub
            </h1>
          </div>
          
          <p
            style={{
              fontSize: '32px',
              color: '#a1a1aa',
              margin: 0,
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            Wisdom Kinoti · Junior Cybersecurity Analyst & CS Student.
            Systems, AI, and Security.
          </p>
          
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                padding: '12px 24px',
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#10b981',
                fontSize: '24px',
              }}
            >
              wisdom@kOS:~$ _
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
