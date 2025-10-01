import { Download } from '@/components/Download'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Gazorpazorp } from '@/components/themes/Gazorpazorp'
import { Schaltstelle } from '@/components/themes/Schaltstelle'
import { getServerTranslation } from '@/utils/serverTranslation'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  const combos = [
    ['alex', ['schaltstelle', 'gazorpazorp'], ['de', 'en']],
    ['stefano', ['schaltstelle'], ['de']],
    ['jasmin', ['schaltstelle'], ['de']],
  ] as const

  return combos.flatMap(([resumeid, themeids, langs]) => themeids.flatMap((themeid) => langs.map((lang) => ({ resumeid, themeid, lang }))))
}

const getResume = async (resumeId: string, lang?: string) => {
  try {
    // First try to load the language-specific resume file if language is provided
    if (lang) {
      try {
        const langFilePath = path.join(process.cwd(), 'public', 'resumes', `${resumeId}_${lang}.json`)
        if (fs.existsSync(langFilePath)) {
          const langFileContent = fs.readFileSync(langFilePath, 'utf-8')
          return JSON.parse(langFileContent)
        }
      } catch (langError) {
        console.error(`Failed to load language-specific resume: ${resumeId}_${lang}`, langError)
        // Continue to fallback
      }
    }

    // Fallback to default resume file
    const defaultFilePath = path.join(process.cwd(), 'public', 'resumes', `${resumeId}.json`)
    const defaultFileContent = fs.readFileSync(defaultFilePath, 'utf-8')
    return JSON.parse(defaultFileContent)
  } catch (error) {
    console.error(`💥 Failed to load resume: ${resumeId}`, error)
    return null
  }
}

type PageProps = {
  params: Promise<{ resumeid: string; themeid: string; lang: string }>
  searchParams: { lang?: string }
}

const ThemePage = async ({ params }: PageProps) => {
  const { resumeid, themeid, lang } = await params
  const resume = await getResume(resumeid, lang)

  if (!resume) {
    return <div className="font-bold text-red-600">{getServerTranslation('pages.theme.error', lang)}</div>
  }

  if (themeid === 'schaltstelle') {
    return (
      <div>
        <LanguageSwitcher />
        <Download />
        <Schaltstelle resume={resume} resumeId={resumeid} lang={lang} />
      </div>
    )
  }

  if (themeid === 'gazorpazorp') {
    return (
      <div>
        <LanguageSwitcher />
        <Download />
        <Gazorpazorp resume={resume} resumeId={resumeid} lang={lang} />
      </div>
    )
  }

  return <div>{getServerTranslation('pages.theme.themeNotFound', lang)}</div>
}

export default ThemePage
