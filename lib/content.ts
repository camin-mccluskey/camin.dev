import { allPosts as allPlain, allPostMdxes } from 'contentlayer/generated'

export const allPosts = [...allPlain, ...allPostMdxes]
