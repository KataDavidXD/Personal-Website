import { Hero } from '@/components/home/Hero';
import { PillarCards } from '@/components/home/PillarCards';
import { FeaturedPosts } from '@/components/home/FeaturedPosts';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { allBlogPosts, allProjects } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export default function HomePage() {
  const posts = allBlogPosts
    .filter((post) => post.published && post.featured)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  const projects = allProjects
    .filter((project) => project.featured)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
    .slice(0, 2);

  return (
    <>
      <Hero />
      <PillarCards />
      <FeaturedPosts posts={posts} />
      <FeaturedProjects projects={projects} />
      <NewsletterSection />
    </>
  );
}






