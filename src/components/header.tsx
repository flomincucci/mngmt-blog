import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Sobre mi', page: '/sobre-mi' },
  { label: 'Contacto', page: '/contacto' },
]

export default () => {
  const { pathname } = useRouter()

  return (
    <header className="border-b border-gray-300">
      <Head>
        <title>Otro blog sobre gestión</title>
        <meta name="description" content="Un blog sobre gestion" />
      </Head>

      <div className="pt-16 pb-2">
        <div className="font-semibold text-xl text-gray-900">
          <Link href="/">
            <a>Otro blog sobre gestión</a>
          </Link>
        </div>

        <ul className="navbar flex flex-wrap text-l">
          <style jsx>
            {`
              .navbar :global(a) {
                @apply text-gray-700;
              }

              .navbar :global(a:hover) {
                @apply no-underline text-gray-900;
              }
            `}
          </style>
          {navItems.map(({ label, page, link }) => (
            <li className="mr-6" key={label}>
              {page ? (
                <Link href={page}>
                  <a className={pathname === page ? 'active' : undefined}>
                    {label}
                  </a>
                </Link>
              ) : (
                <ExtLink href={link}>{label}</ExtLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
