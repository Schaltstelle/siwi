import { Download } from '@/components/Download'
import { Schaltstelle } from '@/components/themes/Schaltstelle'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  return [
    { resumeid: 'alex', themeid: 'schaltstelle' },
    { resumeid: 'stefano', themeid: 'schaltstelle' },
    { resumeid: 'jasmin', themeid: 'schaltstelle' },
  ]
}

const getResume = async (resumeId: string) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resumes', `${resumeId}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`💥 Failed to load resume: ${resumeId}`, error)
    return null
  }
}

const ThemePage = async (props: { params: Promise<{ resumeid: string; themeid: string }> }) => {
  const { resumeid, themeid } = await props.params
  const resume = await getResume(resumeid)

  if (!resume) {
    return <div className="font-bold text-red-600">Error: Could not load resume data.</div>
  }

  if (themeid === 'schaltstelle') {
    return (
      <div>
        <Download />
        <Schaltstelle resume={resume} resumeId={resumeid} />
      </div>
    )
  }

  return <div>Theme not found</div>
}

export default ThemePage
