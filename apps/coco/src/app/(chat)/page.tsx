import type { Session } from '#/lib/types';
import type { Metadata } from 'next';

import { auth } from 'auth';

import { siteConfig } from '#/config/site';
import { AI } from '#/lib/chat/actions';
import { nanoid } from '#/lib/utils';
import { Chat } from '#/ui/chat';

import { getMissingKeys } from '../actions';

export default async function IndexPage() {
  const id = nanoid();
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  );
}

const title = 'CocoGPT';
const description = siteConfig.description;
const pageUrl = siteConfig.url;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description,
    images: [
      {
        url: siteConfig.image.url,
        width: siteConfig.image.width,
        height: siteConfig.image.height,
        alt: siteConfig.image.alt,
      },
    ],
    url: pageUrl,
  },
  twitter: {
    title,
    description,
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
