import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { RichText } from 'basehub/react-rich-text';

import { cn } from '@yocxo/ui';
import { buttonVariants } from '@yocxo/ui/button';
import { ArrowRightIcon } from '@yocxo/ui/icons';

import { fetchBlogPage } from '#/basehub/blog-queries';
import { siteConfig } from '#/config/site';
import PageJson from '#/json-ld/page-jsonld';
import { formatDate, SITE_URL } from '#/lib/constants';
import { Border } from '#/ui/border';
import { ContactSection } from '#/ui/contact-section';
import { FadeIn } from '#/ui/fade-in';
import { Container } from '#/ui/page-container';
import { PageIntro } from '#/ui/page-intro';

export default async function BlogPage() {
  const blogPageData = await fetchBlogPage({ skip: 0, first: 10 });

  return (
    <>
      <PageIntro
        eyebrow={blogPageData.pageIntro.eyebrow}
        title={blogPageData.pageIntro.title}
        centered={blogPageData.pageIntro.centered}
      >
        <RichText>{blogPageData.pageIntro.description?.json.content}</RichText>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {blogPageData.posts.items.map((post) => (
          <FadeIn key={post._sys.id}>
            <article>
              <Border className="py-16">
                <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                  <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                    <div className="mb-2 font-mono text-xs font-medium uppercase text-primary">
                      {post.category.length > 0 && (
                        <div className="mb-2 font-mono text-xs font-medium uppercase text-primary">
                          #{post.category[0]?._sys.title}
                        </div>
                      )}
                    </div>
                    <h2 className="max-w-2xl text-pretty font-mono text-2xl font-semibold leading-normal tracking-tighter text-foreground hover:text-primary">
                      <Link href={`/blog/${post._sys.slug}`}>
                        {post._sys.title}
                      </Link>
                    </h2>
                    <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                      <dt className="sr-only">Published</dt>
                      <dd className="absolute left-0 top-0 font-mono text-xs uppercase text-muted-foreground lg:static">
                        <time dateTime={post._sys.createdAt}>
                          {formatDate(post._sys.createdAt)}
                        </time>
                      </dd>
                      <dt className="sr-only">Author</dt>
                      <dd className="mt-6 flex gap-x-4">
                        <div className="flex-none overflow-hidden rounded-xl border bg-background">
                          <Image
                            alt={
                              post.author.image.alt ??
                              'An image of the post author'
                            }
                            src={post.author.image.url}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-cover grayscale transition duration-500 hover:grayscale-0 motion-safe:hover:scale-105"
                          />
                        </div>
                        <div className="text-sm text-secondary-foreground">
                          <div className="font-mono font-medium tracking-tighter">
                            {post.author._sys.title}
                          </div>
                          <div className="font-mono text-muted-foreground">
                            <span className="text-alternate">
                              {post.author.role}
                            </span>
                          </div>
                        </div>
                      </dd>
                    </dl>
                    <div className="mt-6 line-clamp-2 max-w-2xl text-muted-foreground">
                      <RichText>{post.tldr?.json.content}</RichText>
                    </div>

                    <Link
                      href={`/blog/${post._sys.slug}`}
                      aria-label={`Read more: ${post._sys.title}`}
                      className={cn(
                        buttonVariants({
                          variant: 'secondary',
                          size: 'sm',
                        }),
                        'mt-8',
                      )}
                    >
                      {post.readMoreButtonText}
                      <ArrowRightIcon className="ml-2 w-3 flex-none fill-current" />
                    </Link>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </Container>

      <ContactSection />
      <PageJson
        pageSlug={`${blogPageData._sys.slug}`}
        pageName={`${blogPageData._sys.title} :: ${siteConfig.name}`}
        keyword={blogPageData.keyword._sys.title}
      />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const blogPageData = await fetchBlogPage();

  const metadata = {
    title: blogPageData.meta.title,
    description: blogPageData.meta.description,
    openGraph: {
      type: 'website',
      title: blogPageData.meta.title,
      description: blogPageData.meta.description,
      url: `${SITE_URL}/blog`,
    },
    twitter: {
      title: blogPageData.meta.title,
      description: blogPageData.meta.description,
    },
  };

  return metadata;
}
