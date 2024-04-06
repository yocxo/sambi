import type { AiPostFragment } from '#/basehub/ai-blog-queries';
import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { RichText } from 'basehub/react-rich-text';

import { cn } from '@yocxo/ui';
import { buttonVariants } from '@yocxo/ui/button';
import { ArrowRightIcon } from '@yocxo/ui/icons';

import {
  fetchAiBlogPageIntro,
  fetchAiBlogPageMetadata,
  fetchAiBlogPosts,
} from '#/basehub/ai-blog-queries';
import { siteConfig } from '#/config/site';
import PageJson from '#/json-ld/page-jsonld';
import { formatDate, SITE_URL } from '#/lib/constants';
import { Border } from '#/ui/border';
import { ContactSection } from '#/ui/contact-section';
import { FadeIn } from '#/ui/fade-in';
import { Container } from '#/ui/page-container';
import { PageIntro } from '#/ui/page-intro';
import { LoadMore, LoadMoreButton, LoadMoreItems } from '#/ui/shared/load-more';

export default async function AiBlogPage() {
  const { items: initialAiBlogPosts, totalCount } = await fetchAiBlogPosts({
    skip: 0,
    first: 10,
  });
  const pageIntro = await fetchAiBlogPageIntro();

  return (
    <>
      <PageIntro
        eyebrow={pageIntro.eyebrow}
        title={pageIntro.title}
        centered={pageIntro.centered}
      >
        <RichText>{pageIntro.description?.json.content}</RichText>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <LoadMore<AiPostFragment>
          className="space-y-24"
          totalItems={totalCount}
          initialItems={initialAiBlogPosts}
          loadMoreFn={fetchAiBlogPosts}
        >
          <LoadMoreItems>
            {initialAiBlogPosts.map((aiPost) => (
              <FadeIn key={aiPost._sys.id}>
                <article>
                  <Border className="pt-16">
                    <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                      <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                        <h2 className="max-w-2xl text-pretty font-mono text-2xl font-semibold leading-normal tracking-tighter text-foreground hover:text-primary">
                          <Link href={`/ai-blog/${aiPost._sys.slug}`}>
                            {aiPost._sys.title}
                          </Link>
                        </h2>
                        <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute left-0 top-0 font-mono text-xs uppercase text-muted-foreground lg:static">
                            <time dateTime={aiPost._sys.createdAt}>
                              {formatDate(aiPost._sys.createdAt)}
                            </time>
                          </dd>
                          <dt className="sr-only">LLM Model</dt>
                          <dd className="mt-6 flex gap-x-4">
                            <div className="flex-none overflow-hidden rounded-xl border bg-background">
                              <Image
                                alt={
                                  aiPost.company.image.alt ??
                                  "A simple colored square representing the AI model's company"
                                }
                                src={aiPost.company.image.url}
                                width={48}
                                height={48}
                                className="h-12 w-12 object-cover grayscale transition duration-500 hover:grayscale-0 motion-safe:hover:scale-105"
                              />
                            </div>
                            <div className="text-sm text-secondary-foreground">
                              <div className="font-mono font-medium tracking-tighter">
                                {aiPost.company._sys.title}
                              </div>
                              <div className="font-mono text-muted-foreground">
                                <span className="text-alternate">
                                  With {aiPost.company.model}
                                </span>
                              </div>
                            </div>
                          </dd>
                        </dl>
                        <p className="mt-6 line-clamp-2 max-w-2xl text-muted-foreground">
                          {aiPost.metaDescription}
                        </p>
                        <Link
                          href={`/ai-blog/${aiPost._sys.slug}`}
                          aria-label={`Read more: ${aiPost._sys.title}`}
                          className={cn(
                            buttonVariants({
                              variant: 'secondary',
                              size: 'sm',
                            }),
                            'mt-8',
                          )}
                        >
                          {aiPost.readMoreButtonText}
                          <ArrowRightIcon className="ml-2 w-3 flex-none fill-current" />
                        </Link>
                      </div>
                    </div>
                  </Border>
                </article>
              </FadeIn>
            ))}
          </LoadMoreItems>
          <LoadMoreButton>Load more</LoadMoreButton>
        </LoadMore>
      </Container>

      <ContactSection />
      <PageJson
        pageSlug={`${pageIntro.jsonSlug}`}
        pageName={`${pageIntro.jsonTitle} :: ${siteConfig.name}`}
        keyword={pageIntro.keyword?._sys.title}
      />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await fetchAiBlogPageMetadata();

  const metadata = {
    title: cmsMetadata.title,
    description: cmsMetadata.description,
    openGraph: {
      type: 'website',
      title: cmsMetadata.title,
      description: cmsMetadata.description,
      images: [
        {
          url: siteConfig.image.url,
          width: siteConfig.image.width,
          height: siteConfig.image.height,
          alt: siteConfig.image.alt,
        },
      ],
      url: `${SITE_URL}/ai-blog`,
    },
    twitter: {
      title: cmsMetadata.title,
      description: cmsMetadata.description,
      images: [
        {
          url: siteConfig.image.url,
          width: siteConfig.image.width,
          height: siteConfig.image.height,
          alt: siteConfig.image.alt,
        },
      ],
    },
  };

  return metadata;
}
