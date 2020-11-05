import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/header'
import Heading from '../components/heading'
import components from '../components/dynamic'
import { textBlock } from '../lib/notion/renderers'
import React, { CSSProperties, useEffect } from 'react'
import { getDateStr } from '../lib/blog-helpers'

export default () => {
  return (
    <div className="antialiased w-full text-gray-700">
      <div className="max-w-screen-md mx-auto">
        <Header />

        <div className="py-5">
          <h1 className="text-left font-bold text-3xl text-gray-900 mb-8">
            Sobre mi
          </h1>

          <div className="text-left text-black">
            <p>
              Mi nombre es Florencia. Soy ingeniera en sistemas, viviendo en la
              Ciudad de Buenos Aires, Argentina. Fui y vine de varias roles en
              sistemas: dev front end, back end, full stack, analista funcional,
              tech lead y manager.
            </p>
            <br />
            <p>
              Me apasionan los equipos de trabajo y la gestión de los mismos.
              Pueden encontrarme dando clases en la cátedra de{' '}
              <strong>
                Metodologías de Conducción de Equipos de Trabajo en UTN FRBA
              </strong>
              . Dentro de todo el programa, me especializo particularmente en
              diversidad, inclusión y motivación. Esto significa que leo,
              investigo y genero material al respecto :)
            </p>
            <br />
            <p>
              Actualmente trabajo como <strong>Engineering Manager</strong> en
              Properati. Previamente trabajé como Tech Lead, y luego Head of
              Development en Acámica.
            </p>
            <h2>Contacto</h2>
            <p>
              <strong>Twitter:</strong> @florenciaypunto
              <br />
              <strong>Mail:</strong> florencia at mincucci dot com dot ar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
