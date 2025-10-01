import { generateStaticParams } from '@/app/resumes/[resumeid]/themes/[themeid]/lang/[lang]/page'
import { getServerTranslation } from '@/utils/serverTranslation'
import Image from 'next/image'
import Link from 'next/link'

type Combo = { resumeid: string; themeid: string; lang: string }

const langLabel = (l: string) => (l === 'de' ? 'Deutsch' : l === 'en' ? 'English' : l.toUpperCase())

export default async function Page() {
  const links = (await generateStaticParams()) as Combo[]

  // Group by resume → theme → langs
  const grouped = links.reduce(
    (acc, { resumeid, themeid, lang }) => {
      acc[resumeid] ??= {}
      acc[resumeid][themeid] ??= new Set<string>()
      acc[resumeid][themeid].add(lang)
      return acc
    },
    {} as Record<string, Record<string, Set<string>>>
  )

  const resumeEntries = Object.entries(grouped) // [resumeid, { themeid: Set(lang) }][]

  return (
    <main className="mx-auto max-w-screen-md px-6 py-10 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">{getServerTranslation('pages.home.availableResumes', 'de')}</h1>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resumeEntries.map(([resumeid, themes]) => (
          <li key={resumeid} className="rounded-lg border p-4 shadow transition hover:shadow-md">
            <div className="flex flex-col items-center text-center">
              <Image
                src={`/siwi/resumes/${resumeid}.png`}
                alt={resumeid}
                width={120}
                height={120}
                className="mb-4 rounded-full object-cover"
              />

              <p className="text-md mb-2 font-semibold capitalize">{resumeid}</p>

              <div className="w-full space-y-1">
                {Object.entries(themes).map(([themeid, langs]) => {
                  const langArr = Array.from(langs)
                  return (
                    <div key={themeid} className="text-sm text-gray-700">
                      <span className="font-medium capitalize">Theme: {themeid}</span>{' '}
                      <span className="text-gray-600">
                        (
                        {langArr.map((l, i) => (
                          <span key={l}>
                            <Link href={`/resumes/${resumeid}/themes/${themeid}/lang/${l}`} className="underline hover:no-underline">
                              {langLabel(l)}
                            </Link>
                            {i < langArr.length - 1 ? ' | ' : null}
                          </span>
                        ))}
                        )
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
