import { Download } from '@/components/Download'
import { Gazorpazorp } from '@/components/themes/Gazorpazorp'
import { Schaltstelle } from '@/components/themes/Schaltstelle'
import { getServerTranslation } from '@/utils/serverTranslation'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  return [
    { resumeid: 'alex', themeid: 'schaltstelle' },
    { resumeid: 'alex', themeid: 'gazorpazorp' },
    { resumeid: 'stefano', themeid: 'schaltstelle' },
    { resumeid: 'stefano', themeid: 'gazorpazorp' },
    { resumeid: 'jasmin', themeid: 'schaltstelle' },
    { resumeid: 'jasmin', themeid: 'gazorpazorp' },
  ]
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
  params: Promise<{ resumeid: string; themeid: string }>
  searchParams: { lang?: string }
}

const ThemePage = async ({ params, searchParams }: PageProps) => {
  const { resumeid, themeid } = await params
  const sp = await searchParams
  const lang = sp.lang || 'de'
  const resume = await getResume(resumeid, lang)

  if (!resume) {
    return <div className="font-bold text-red-600">{getServerTranslation('pages.theme.error', lang)}</div>
  }

  if (themeid === 'schaltstelle') {
    return (
      <div>
        <Download />
        <Schaltstelle resume={resume} resumeId={resumeid} lang={lang} />
      </div>
    )
  }

  if (themeid === 'gazorpazorp') {
    return (
      <div>
        <Download />
        <Gazorpazorp resume={resume} resumeId={resumeid} lang={lang} />
      </div>
    )
  }

  return <div>{getServerTranslation('pages.theme.themeNotFound', lang)}</div>
}

export default ThemePage
