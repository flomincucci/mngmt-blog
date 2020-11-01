import Link from 'next/link'
import Header from '../components/header'

import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import getBlogIndex from '../lib/notion/getBlogIndex'

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
        <div className="text-xl py-5">
          {posts.length === 0 && <p>No hay nada publicado todavía.</p>}
          <ul>
            {posts.map(post => {
              return (
                <li key={post.Slug} className="mb-3 flex justify-between">
                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <a>
                      {!post.Published && <span>Borrador</span>}
                      <a>{post.Page}</a>
                    </a>
                  </Link>
                  {post.Date && (
                    <div className="posted">{getDateStr(post.Date)}</div>
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
