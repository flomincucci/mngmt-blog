import Link from 'next/link'
import Header from '../components/header'

import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import getBlogIndex from '../lib/notion/getBlogIndex'
import { textBlock } from '../lib/notion/renderers'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      return post
    })
    .filter(Boolean)

  return {
    props: {
      preview: preview || false,
      posts,
    },
    unstable_revalidate: 10,
  }
}

export default ({ posts = [], preview }) => {
  return (
    <div className="antialiased w-full text-gray-700">
      <div className="max-w-screen-md mx-auto">
        <Header />
        {preview && (
          <div>
            <div>
              <b>Note:</b>
              {` `}Viewing in preview mode{' '}
              <Link href={`/api/clear-preview`}>
                <button>Exit Preview</button>
              </Link>
            </div>
          </div>
        )}
        <div className="py-5">
          {posts.length === 0 && <p>No hay nada publicado todavía.</p>}
          <ul>
            {posts.map(post => {
              return (
                <li key={post.Slug} className="mb-3">
                  <div>
                    <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                      <a className="text-black text-2xl">
                        {!post.Published && <span>Borrador</span>}
                        <a>{post.Page}</a>
                      </a>
                    </Link>
                    <p className="text-m">
                      {(post.preview || []).map((block, idx) =>
                        textBlock(block, true, `${post.Slug}${idx}`)
                      )}
                    </p>
                  </div>
                  {post.Date && (
                    <div className="posted text-sm">
                      {getDateStr(post.Date)}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
