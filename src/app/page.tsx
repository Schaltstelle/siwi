import { generateStaticParams } from '@/app/resumes/[resumeid]/themes/[themeid]/lang/[lang]/page'
import { getServerTranslation } from '@/utils/serverTranslation'
import Image from 'next/image'
import Link from 'next/link'
export default async function Page() {
  const links = await generateStaticParams()
  const lang = 'de'

  return (
    <main className="mx-auto max-w-screen-md px-6 py-10 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">{getServerTranslation('pages.home.availableResumes', lang)}</h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ resumeid, themeid, lang }) => (
          <li key={`${resumeid}-${themeid}-${lang}`} className="rounded-lg border p-4 shadow transition hover:shadow-md">
            <Link href={`/resumes/${resumeid}/themes/${themeid}/lang/${lang}`}>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={`/siwi/resumes/${resumeid}.png`}
                  alt={resumeid}
                  width={120}
                  height={120}
                  className="mb-4 rounded-full object-cover"
                />
                <p className="text-md font-semibold capitalize">{resumeid}</p>
                <p className="text-sm text-gray-600">{themeid}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
