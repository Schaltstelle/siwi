import { ResumeSchemaType } from '@/types/resume'
import { calculateAge, cn, formatJobFromTo } from '@/utils'
import { getServerTranslation } from '@/utils/serverTranslation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  resume: ResumeSchemaType
  resumeId: string
  lang?: string
}

const basePath = '/siwi'

export const Schaltstelle: React.FC<Props> = ({ resume, resumeId, lang = 'de' }) => {
  const { basics, work, education, languages, projects, certificates, skills } = resume

  return (
    <A4Page id="cv-content">
      <header className="flex flex-nowrap gap-6 print:flex-nowrap">
        <div className="w-full flex-grow">
          <div className="relative mb-6 flex gap-6 pb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-2/5 after:bg-[#d52626]">
            <div className={'flex items-center'}>
              <Image src={`${basePath}/resumes/${resumeId}.png`} alt="Profile" width={260} height={260} />
            </div>
            <div>
              <div className="text-3xl font-bold">{basics?.name}</div>
              <div className="text-base text-gray-700">{basics?.label}</div>
              <div className="mt-2 flex flex-col text-xs text-gray-600">
                {basics?.location && (
                  <div>
                    {basics?.location?.address}, {basics?.location?.postalCode} {basics?.location?.city}, {basics?.location?.region}
                  </div>
                )}

                {basics?.birth?.date && (
                  <div>
                    {basics?.birth?.date}
                    {basics?.gender ? `, ${calculateAge(basics?.birth?.date)}${basics?.gender}` : ''}
                  </div>
                )}

                {basics?.phone && <div>{basics?.phone}</div>}
                {basics?.email && <div>{basics?.email}</div>}

                {basics?.url && (
                  <a href={basics?.url} className="text-[#d52626]">
                    {basics?.url}
                  </a>
                )}

                {(basics?.profiles?.length || 0) > 0 && (
                  <div className="flex flex-wrap pt-2">
                    {basics?.profiles?.map((p, i) => (
                      <a key={i} href={p?.url} className="text-[#d52626]">
                        {p?.url}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <aside className="w-[180px] flex-shrink-0">
          <div className="mb-6">
            <Image src={`${basePath}/brands/schaltstelle/banner.png`} alt="Schaltstelle Logo" width={200} height={80} className="mb-3" />
            <address className="text-xs text-gray-700 not-italic">
              <div>Bereitenreinstr. 40</div>
              <div>3014 Bern</div>
              <Link href={'https://schaltstelle.ch'} target={'_blank'}>
                schaltstelle.ch
              </Link>
            </address>
          </div>
        </aside>
      </header>
      <main className="flex flex-nowrap gap-6 print:flex-nowrap">
        <section className="w-full flex-grow">
          {/* SUMMARY */}
          {basics?.summary && (
            <section className="mb-8">
              <SectionTitle>{getServerTranslation('resume.aboutMe', lang)}</SectionTitle>
              <p className="mt-2 text-justify text-sm whitespace-pre-line text-gray-800">{basics?.summary}</p>
            </section>
          )}
          {work && work?.length > 0 && (
            <section className="mb-8">
              <SectionTitle>{getServerTranslation('resume.experience', lang)}</SectionTitle>
              <div className="mt-2 space-y-4">
                {work?.map((job, i) => (
                  <div key={i}>
                    <span className="text-md font-semibold">{job?.position},&nbsp;</span>
                    <span>{job?.name}</span>
                    {job?.location?.region && <div>{job?.location?.region}</div>}
                    <p className="text-sm text-gray-600 italic">
                      {formatJobFromTo(job?.startDate || '01.01.1970')}
                      {job?.endDate ? ` - ${formatJobFromTo(job?.endDate)}` : ` - ${getServerTranslation('common.now', lang)}`}
                    </p>
                    <p className="mt-1 text-sm">{job?.summary}</p>
                    {(job?.highlights?.length || 0) > 0 && (
                      <ul className="mt-2 list-outside list-disc space-y-1 pl-5 text-sm leading-snug text-gray-800">
                        {job?.highlights?.map((hl, j) => (
                          <li key={j} className="pl-1 text-xs">
                            {hl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {education && education?.length > 0 && (
            <section className="mb-8">
              <SectionTitle>{getServerTranslation('resume.education', lang)}</SectionTitle>
              <div className="mt-4 space-y-4">
                {education?.map((e, i) => (
                  <div key={i}>
                    <span className="text-md font-semibold">{e?.studyType}</span>
                    {e?.area && <span className="text-md font-normal"> in {e?.area}</span>}
                    {e?.institution && <div className="text-sm text-gray-800">{e?.institution}</div>}
                    <p className="text-sm text-gray-600 italic">
                      {formatJobFromTo(e?.startDate || '01.01.1970')}
                      {e?.endDate ? ` - ${formatJobFromTo(e?.endDate)}` : ` - ${getServerTranslation('common.now', lang)}`}
                    </p>
                    {e?.score && (
                      <p className="mt-1 text-sm">
                        {getServerTranslation('resume.finalGrade', lang)}: <span className="font-medium">{e?.score}</span>
                      </p>
                    )}
                    {e?.courses?.length && e?.courses?.length > 0 && (
                      <ul className="mt-2 list-outside list-disc pl-5 text-sm leading-snug text-gray-800">
                        {e?.courses?.map((course, j) => (
                          <li key={j} className="pl-1">
                            {course}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {projects?.length && projects?.length > 0 && (
            <section className="mb-8">
              <SectionTitle>{getServerTranslation('resume.projects', lang)}</SectionTitle>
              <div className="mt-4 space-y-6">
                {projects?.map((project, i) => (
                  <div key={i}>
                    <div className="text-md font-semibold">
                      {project?.name}
                      {project?.url && (
                        <a href={project?.url} target="_blank" rel="noreferrer" className="ml-2 text-sm text-[#d52626]">
                          ({new URL(project?.url).hostname.replace('www.', '')})
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      {formatJobFromTo(project?.startDate)}
                      {project?.endDate ? ` – ${formatJobFromTo(project?.endDate)}` : ` – ${getServerTranslation('common.now', lang)}`}
                      {project?.hours && ` (${project?.hours})`}
                    </p>
                    {project?.contact?.name && (
                      <p className="text-sm text-gray-600 italic">
                        {getServerTranslation('common.contact', lang)}: {project?.contact?.name}
                        {project?.contact?.email && (
                          <>
                            ,{' '}
                            <a href={`mailto:${project?.contact?.email}`} className="text-[#d52626]">
                              {project?.contact?.email}
                            </a>
                          </>
                        )}
                        {project?.contact?.phone && (
                          <>
                            {project?.contact?.email ? ', ' : ', '}
                            <span>{project?.contact?.phone}</span>
                          </>
                        )}
                      </p>
                    )}
                    {project?.description && <p className="mt-1 text-sm text-gray-800">{project?.description}</p>}
                    {project?.highlights?.length && project?.highlights?.length > 0 && (
                      <ul className="mt-2 list-outside list-disc pl-5 text-sm leading-snug text-gray-800">
                        {project?.highlights?.map((hl, j) => (
                          <li key={j} className="pl-1 text-xs">
                            {hl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
        <div className="flex flex-nowrap gap-6 print:flex-nowrap">
          <section className="w-full flex-grow">
            <aside className="w-[180px] flex-shrink-0">
              <div>
                {skills?.length && skills?.length > 0 && (
                  <div className="space-y-0">
                    <SectionTitle>{getServerTranslation('resume.skills', lang)}</SectionTitle>
                    <ul className="space-y-2 text-sm text-gray-800">
                      {skills?.map((skill, i) => (
                        <li key={i}>
                          {skill?.name && <div className="pt-2 text-xs font-semibold text-[#d52626] uppercase">{skill?.name}</div>}
                          {skill?.level && <div className="text-xs font-semibold text-gray-600">{skill?.level}</div>}
                          {skill?.keywords?.length && skill?.keywords?.length > 0 && (
                            <div className="text-xs text-gray-700">{skill?.keywords?.join(', ')}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {certificates?.length && certificates?.length > 0 && (
                  <div className="mt-2">
                    <SectionTitle>{getServerTranslation('resume.certificates', lang)}</SectionTitle>
                    <ul className="space-y-2 text-sm text-gray-800">
                      {certificates?.map((cert, i) => (
                        <li key={i}>
                          <div className="text-xs font-semibold text-gray-600">{cert?.name}</div>
                          {cert?.issuer && <div className="text-xs text-gray-600"> {cert?.issuer}</div>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {languages?.length && languages?.length > 0 && (
                  <div className="mt-2">
                    <SectionTitle>{getServerTranslation('resume.languages', lang)}</SectionTitle>
                    <ul className="text-sm text-gray-800">
                      {languages?.map((language, i) => (
                        <li key={i}>
                          <span className="text-xs font-semibold text-gray-600">{language?.language}</span>
                          {language?.fluency && <span className="text-xs text-gray-600"> ({language?.fluency})</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {basics?.citizenship?.length && basics?.citizenship?.length > 0 && (
                  <div className="mt-4 space-y-1">
                    <SectionTitle>{getServerTranslation('resume.citizenship', lang)}</SectionTitle>
                    <ul className="text-xs text-gray-600">
                      {basics?.citizenship?.map((nat, i) => (
                        <li key={i}>{nat?.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>
    </A4Page>
  )
}

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <h1 className={cn(`text-base font-bold text-[#d52626] uppercase`, className)}>{children}</h1>
}

const A4Page: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, className, id }) => {
  return (
    <div id={id} className={cn('mx-auto min-h-[297mm] w-[210mm] bg-white px-12 py-10 font-sans text-gray-900', className)}>
      {children}
    </div>
  )
}
