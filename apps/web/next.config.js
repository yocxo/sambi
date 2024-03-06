import * as path from 'path';
import { fileURLToPath } from 'url';

import rehypeShiki from '@leafac/rehype-shiki';
import nextMDX from '@next/mdx';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import escapeStringRegexp from 'escape-string-regexp';
import _jiti from 'jiti';
import { recmaImportImages } from 'recma-import-images';
import remarkGfm from 'remark-gfm';
import { remarkRehypeWrap } from 'remark-rehype-wrap';
import remarkUnwrapImages from 'remark-unwrap-images';
import shiki from 'shiki';
import { unifiedConditional } from 'unified-conditional';

const jiti = _jiti(fileURLToPath(import.meta.url));

jiti('./src/env');
jiti('@sambi/auth/env');

/**
 * @returns {Promise<import('next').NextConfig>}
 */
async function createConfig() {
  let highlighter = await shiki.getHighlighter({ theme: 'css-variables' });

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [[rehypeShiki, { highlighter }]],
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        [
          unifiedConditional,
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/(site)/blog'))}`,
            ),
            [[remarkMDXLayout, 'src/app/(site)/blog/wrapper', 'article']],
          ],
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/(site)/mdx'))}`,
            ),
            [[remarkMDXLayout, 'src/app/(site)/mdx/wrapper', 'article']],
          ],
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/(site)/work'))}`,
            ),
            [[remarkMDXLayout, 'src/app/(site)/work/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  });

  return withMDX({
    reactStrictMode: true,
    transpilePackages: [
      '@sambi/api',
      '@sambi/auth',
      '@sambi/db',
      '@sambi/ui',
      '@sambi/validators',
    ],
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  });
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx());
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' };

  return (tree) => {
    let imp = `import _Layout from '${source}'`;
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`;

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    );
  };
}

export default createConfig();