import { defineDocumentType, defineNestedType, FieldDefs, makeSource } from 'contentlayer2/source-files'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkWikiLink from '@flowershow/remark-wiki-link'
import rehypeKatex from 'rehype-katex'

const POST_CATEGORIES = [
  'short-read',
  'long-read',
  'idea',
  'technology',
  'software-eng',
  'LLMs',
  'stocism'
]

const SEO = defineNestedType(() => ({
  name: 'SEO',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    }
  },
}))

const PostFields: FieldDefs = {
  title: { type: 'string', required: true },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
  isDraft: { type: 'boolean', required: true },
  slug: { type: 'string', required: true, },
  tags: { type: 'list', of: { type: 'enum', options: POST_CATEGORIES }, default: [] },
  seo: {
    type: 'nested',
    of: SEO,
    required: true,
  }
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  fields: PostFields,
  computedFields: {
    url: { type: 'string', resolve: (post) => `/post/${post.slug}` },
  },
}))

export const PostMdx = defineDocumentType(() => ({
  name: 'PostMdx',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: PostFields,
  computedFields: {
    url: { type: 'string', resolve: (post) => `/post/${post.slug}` },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.yaml`,
  fields: {
    name: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    srcUrl: { type: 'string', required: true }, // links directly to source
  },
  contentType: 'data',
}))

export default makeSource(
  {
    contentDirPath: 'content',
    documentTypes: [Post, PostMdx, Project],
    markdown: { remarkPlugins: [remarkGfm, remarkMath, remarkWikiLink], rehypePlugins: [rehypeKatex] },
    mdx: { remarkPlugins: [remarkGfm, remarkMath, remarkWikiLink], rehypePlugins: [rehypeKatex] }
  },
)
