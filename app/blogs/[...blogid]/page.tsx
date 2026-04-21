import React from 'react';
import Image from 'next/image';
import { Clock, UserCircle, Calendar } from 'lucide-react';
import BlogLayout from '@/components/blogsComponents/BlogLayout';
import { articles } from '../blogData';
import NotFound from './not-found';

// --- Mock Data for the Sidebar ---
// import { useRouter } from 'next/router'

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

const BlogArticlePage = async ({params}:{params:Promise<{blogid:string}>}) => {
  const { blogid } = await params;
  // Find the article that matches the ID from the URL
  const article = articles.find((a) => a.slug === blogid[0]) !;

  // If no article is found, show a 404 page
  if (!article) {
    NotFound();
  }
 
    
  return (
   
    <BlogLayout>
          <main className="lg:col-span-2">
        {/* Article Header */}
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center text-sm text-gray-500 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="mt-8">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={1200}
            height={800}
            className="w-full rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>

        {/* Article Body - dangerouslySetInnerHTML is used to render the HTML from our data */}
        <article
          className="mt-10 prose prose-lg max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-ul:list-disc prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </main>
          </BlogLayout>
  );
};

export default BlogArticlePage;
