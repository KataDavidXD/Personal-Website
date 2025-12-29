import { ImageResponse } from 'next/og';
import { allBlogPosts } from 'contentlayer/generated';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  const post = allBlogPosts.find((p) => p.slug === slug);

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
          backgroundImage: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)',
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
              background: '#3b82f6',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '24px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {post.category}
          </div>
        </div>
        <h1
          style={{
            fontSize: '80px',
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
            fontSize: '32px',
            color: '#a1a1aa',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          {post.description}
        </p>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>Yang Li</div>
            <div style={{ fontSize: '20px', color: '#71717a' }}>yangli.dev</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

