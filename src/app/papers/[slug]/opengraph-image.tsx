import { ImageResponse } from 'next/og';
import { allPapers } from 'contentlayer/generated';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPapers.find((p) => p.slug === params.slug);

  if (!post) {
    return new Response('Not Found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom right, #050505, #121212)',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: '#8b5cf6',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '24px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Research Paper
          </div>
          <div style={{ fontSize: '24px', color: '#71717a' }}>
            {post.year} • {post.venue}
          </div>
        </div>
        <h1
          style={{
            fontSize: '70px',
            fontWeight: 'bold',
            lineHeight: 1.1,
            marginBottom: '30px',
            maxWidth: '1000px',
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            maxWidth: '1000px',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.abstract}
        </p>
        
        <div
          style={{
            marginTop: 'auto',
            fontSize: '24px',
            color: '#71717a',
          }}
        >
          {post.authors.join(', ')}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

