import type { Metadata } from 'next';

import { RichText } from 'basehub/react-rich-text';

import { fetchBlogPosts } from '#/basehub/blog-queries';
import {
  fetchEditorialPage,
  fetchEditorialPageIntro,
  fetchEditorialPageMetadata,
} from '#/basehub/editorial-queries';
import { siteConfig } from '#/config/site';
import { SITE_URL } from '#/lib/constants';
import { Border } from '#/ui/border';
import { ContactSection } from '#/ui/contact-section';
import { Container } from '#/ui/page-container';
import { PageIntro } from '#/ui/page-intro';
import { PageLinks } from '#/ui/page-links';
import RichTextWrapper from '#/ui/shared/rich-text-wrapper';

export default async function PrivacyPolicy() {
  const pageIntro = await fetchEditorialPageIntro();
  const privacy = await fetchEditorialPage();
  const { items: blogPosts } = await fetchBlogPosts({
    first: 2,
  });

  const pages = blogPosts.map((post) => ({
    href: `/blog/${post._sys.slug}`,
    title: post._sys.title,
    description: post.metaDescription,
    readMoreButtonText: post.readMoreButtonText,
  }));

  return (
    <div>
      <PageIntro
        eyebrow={pageIntro.eyebrow}
        title={pageIntro.title}
        centered={pageIntro.centered}
      >
        <RichText>{pageIntro.description?.json.content}</RichText>
      </PageIntro>

      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <Border className="py-16" />
        <RichTextWrapper
          content={privacy.content?.json.content as string}
          centered
        />
      </Container>
      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="In an era of synthetic noise, we're proudly analog. Crafting content with our bare hands. Call us old fashioned."
        pages={pages}
      />
      <ContactSection />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await fetchEditorialPageMetadata();

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
      url: `${SITE_URL}/editorial`,
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
