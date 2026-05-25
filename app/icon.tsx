import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          borderRadius: '8px',
          border: '2px solid #10b981',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            background: '#10b981',
            borderRadius: '2px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
