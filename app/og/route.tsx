import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse((
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '-.02em',
        fontWeight: 700,
        background: 'white',
      }}
    >
      <div
        style={{
          left: 42,
          top: 42,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            marginLeft: 8,
            fontSize: 20,
          }}
        >
          camin.dev
        </span>
      </div>
    </div>
  ),
    {
      width: 1200,
      height: 600,
    }
  )
}
