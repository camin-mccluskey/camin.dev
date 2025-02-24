import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'

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

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  fields: {
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
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/post/${post.slug}` },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.md`,
  fields: {
    name: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    srcUrl: { type: 'string', required: true }, // links directly to source
  },
  contentType: 'data',
}))

export default makeSource(
  { contentDirPath: 'content', documentTypes: [Post, Project] },
)
