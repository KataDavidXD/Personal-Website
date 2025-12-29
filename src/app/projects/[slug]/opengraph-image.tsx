import { ImageResponse } from 'next/og';
import { allProjects } from 'contentlayer/generated';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allProjects.find((p) => p.slug === slug);

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
          backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
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
              background: '#10b981',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '24px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Project
          </div>
          <div style={{ fontSize: '24px', color: '#94a3b8' }}>
            {post.status}
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
            color: '#94a3b8',
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
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {post.stack.slice(0, 5).map((tech) => (
            <div
              key={tech}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '4px 12px',
                fontSize: '20px',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

