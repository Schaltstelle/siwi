import { ResumeSchemaType } from '@/types/resume'
import { calculateAge, cn, formatJobFromTo } from '@/utils'
import { getServerTranslation } from '@/utils/serverTranslation'
import Image from 'next/image'
import React from 'react'

type Props = {
  resume: ResumeSchemaType
  resumeId: string
  lang?: string
}

const basePath = '/siwi'

export const Gazorpazorp: React.FC<Props> = ({ resume, resumeId, lang = 'de' }) => {
  const { basics, work, education, languages, projects, certificates, skills } = resume

  return (
    <A4Page id="cv-content">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#97ce4c]/5 to-[#ff9800]/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 animate-pulse rounded-full bg-[#97ce4c]/10"></div>
        </div>
        <div className="absolute top-10 right-10 h-20 w-20 rounded-full bg-[#ff9800]/20"></div>
        <div className="absolute bottom-20 left-20 h-16 w-16 rounded-full bg-[#97ce4c]/20"></div>
      </div>
      <div className="relative z-10">
        <header className="flex flex-nowrap gap-6 print:flex-nowrap">
          <div className="w-full flex-grow">
            <div className="relative mb-6 flex gap-6 pb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-2/5 after:bg-[#97ce4c]">
              <div className="relative">
                <Image
                  src={`${basePath}/resumes/${resumeId}.png`}
                  alt="Profile"
                  width={140}
                  height={140}
                  className="rounded-full border-4 border-[#97ce4c]"
                />
                <div className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff9800] text-xs text-white">
                  R&M
                </div>
              </div>
              <div>
                <div className="font-['Schwifty'] text-3xl font-bold text-[#97ce4c]">{basics?.name}</div>
                <div className="text-base font-semibold text-[#44281d]">{basics?.label}</div>
                <div className="mt-2 flex flex-col text-xs text-[#44281d]">
                  {basics?.location && (
                    <div className="flex items-center">
                      <span className="mr-1">🏠</span>
                      {basics?.location?.address}, {basics?.location?.postalCode} {basics?.location?.city}, {basics?.location?.region}
                    </div>
                  )}

                  {basics?.birth?.date && (
                    <div className="flex items-center">
                      <span className="mr-1">🎂</span>
                      {basics?.birth?.date}
                      {basics?.gender ? `, ${calculateAge(basics?.birth?.date)}${basics?.gender}` : ''}
                    </div>
                  )}

                  {basics?.phone && (
                    <div className="flex items-center">
                      <span className="mr-1">📱</span>
                      {basics?.phone}
                    </div>
                  )}

                  {basics?.email && (
                    <div className="flex items-center">
                      <span className="mr-1">📧</span>
                      {basics?.email}
                    </div>
                  )}

                  {basics?.url && (
                    <a href={basics?.url} className="flex items-center text-[#ff9800]">
                      <span className="mr-1">🌐</span>
                      {basics?.url}
                    </a>
                  )}

                  {(basics?.profiles?.length || 0) > 0 && (
                    <div className="flex flex-wrap pt-2">
                      {basics?.profiles?.map((p, i) => (
                        <a key={i} href={p?.url} className="mr-2 flex items-center text-[#ff9800]">
                          <span className="mr-1">🔗</span>
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
            <div className="mb-6 rotate-2 transform rounded-lg border-2 border-[#97ce4c] bg-[#e4a788] p-3">
              <div className="mb-2 text-center">
                <div className="font-['Schwifty'] text-lg text-[#44281d]">Dimension C-137</div>
                <div className="text-xs text-[#44281d]">Coolest Resume</div>
              </div>
              <div className="text-xs text-[#44281d] not-italic">
                <div className="flex items-center">
                  <span className="mr-1">🌌</span> Interdimensional CV
                </div>
                <div className="flex items-center">
                  <span className="mr-1">🧪</span> 100% Certified Genius
                </div>
              </div>
            </div>
          </aside>
        </header>
        <main className="flex flex-nowrap gap-6 print:flex-nowrap">
          <section className="w-full flex-grow">
            {/* SUMMARY */}
            {basics?.summary && (
              <section className="bg-opacity-70 mb-8 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                <SectionTitle>{getServerTranslation('resume.aboutMe', lang)}</SectionTitle>
                <p className="mt-2 text-justify text-sm whitespace-pre-line text-[#44281d]">{basics?.summary}</p>
              </section>
            )}
            {work && work?.length > 0 && (
              <section className="bg-opacity-70 mb-8 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                <SectionTitle>{getServerTranslation('resume.experience', lang)}</SectionTitle>
                <div className="mt-2 space-y-4">
                  {work?.map((job, i) => (
                    <div
                      key={i}
                      className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded before:bg-[#ff9800]"
                    >
                      <span className="text-md font-semibold text-[#44281d]">{job?.position},&nbsp;</span>
                      <span className="text-[#44281d]">{job?.name}</span>
                      {job?.location?.region && <div className="text-[#44281d]">{job?.location?.region}</div>}
                      <p className="text-sm text-[#ff9800] italic">
                        {formatJobFromTo(job?.startDate || '01.01.1970')}
                        {job?.endDate ? ` - ${formatJobFromTo(job?.endDate)}` : ` - ${getServerTranslation('common.now', lang)}`}
                      </p>
                      <p className="mt-1 text-sm text-[#44281d]">{job?.summary}</p>
                      {(job?.highlights?.length || 0) > 0 && (
                        <ul className="mt-2 list-outside space-y-1 pl-5 text-sm leading-snug text-[#44281d]">
                          {job?.highlights?.map((hl, j) => (
                            <li key={j} className="flex items-start pl-1">
                              <span className="mr-1 inline-block text-[#97ce4c]">•</span>
                              <span>{hl}</span>
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
              <section className="bg-opacity-70 mb-8 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                <SectionTitle>{getServerTranslation('resume.education', lang)}</SectionTitle>
                <div className="mt-4 space-y-4">
                  {education?.map((e, i) => (
                    <div
                      key={i}
                      className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded before:bg-[#ff9800]"
                    >
                      <span className="text-md font-semibold text-[#44281d]">{e?.studyType}</span>
                      {e?.area && <span className="text-md font-normal text-[#44281d]"> in {e?.area}</span>}
                      {e?.institution && <div className="text-sm text-[#44281d]">{e?.institution}</div>}
                      <p className="text-sm text-[#ff9800] italic">
                        {formatJobFromTo(e?.startDate || '01.01.1970')}
                        {e?.endDate ? ` - ${formatJobFromTo(e?.endDate)}` : ` - ${getServerTranslation('common.now', lang)}`}
                      </p>
                      {e?.score && (
                        <p className="mt-1 text-sm text-[#44281d]">
                          {getServerTranslation('resume.finalGrade', lang)}: <span className="font-medium">{e?.score}</span>
                        </p>
                      )}
                      {e?.courses?.length && e?.courses?.length > 0 && (
                        <ul className="mt-2 list-outside pl-5 text-sm leading-snug text-[#44281d]">
                          {e?.courses?.map((course, j) => (
                            <li key={j} className="flex items-start pl-1">
                              <span className="mr-1 inline-block text-[#97ce4c]">•</span>
                              <span>{course}</span>
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
              <section className="bg-opacity-70 mb-8 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                <SectionTitle>{getServerTranslation('resume.projects', lang)}</SectionTitle>
                <div className="mt-4 space-y-6">
                  {projects?.map((project, i) => (
                    <div
                      key={i}
                      className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded before:bg-[#ff9800]"
                    >
                      <div className="text-md font-semibold text-[#44281d]">
                        {project?.name}
                        {project?.url && (
                          <a href={project?.url} target="_blank" rel="noreferrer" className="ml-2 text-sm text-[#ff9800]">
                            ({new URL(project?.url).hostname.replace('www.', '')})
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-[#ff9800] italic">
                        {formatJobFromTo(project?.startDate)}
                        {project?.endDate ? ` – ${formatJobFromTo(project?.endDate)}` : ` – ${getServerTranslation('common.now', lang)}`}
                        {project?.hours && ` (${project?.hours})`}
                      </p>
                      {project?.contact?.name && (
                        <p className="text-sm text-[#44281d] italic">
                          {getServerTranslation('common.contact', lang)}: {project?.contact?.name}
                          {project?.contact?.email && (
                            <>
                              ,{' '}
                              <a href={`mailto:${project?.contact?.email}`} className="text-[#ff9800]">
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
                      {project?.description && <p className="mt-1 text-sm text-[#44281d]">{project?.description}</p>}
                      {project?.highlights?.length && project?.highlights?.length > 0 && (
                        <ul className="mt-2 list-outside pl-5 text-sm leading-snug text-[#44281d]">
                          {project?.highlights?.map((hl, j) => (
                            <li key={j} className="flex items-start pl-1">
                              <span className="mr-1 inline-block text-[#97ce4c]">•</span>
                              <span>{hl}</span>
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
                    <div className="bg-opacity-70 mb-4 space-y-0 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                      <SectionTitle>{getServerTranslation('resume.skills', lang)}</SectionTitle>
                      <ul className="space-y-2 text-sm text-[#44281d]">
                        {skills?.map((skill, i) => (
                          <li key={i} className="border-b border-dashed border-[#97ce4c] pb-2">
                            {skill?.name && <div className="pt-2 text-xs font-semibold text-[#ff9800] uppercase">{skill?.name}</div>}
                            {skill?.level && <div className="text-xs font-semibold text-[#44281d]">{skill?.level}</div>}
                            {skill?.keywords?.length && skill?.keywords?.length > 0 && (
                              <div className="text-xs text-[#44281d]">{skill?.keywords?.join(', ')}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {certificates?.length && certificates?.length > 0 && (
                    <div className="bg-opacity-70 mt-2 mb-4 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                      <SectionTitle>{getServerTranslation('resume.certificates', lang)}</SectionTitle>
                      <ul className="space-y-2 text-sm text-[#44281d]">
                        {certificates?.map((cert, i) => (
                          <li key={i} className="border-b border-dashed border-[#97ce4c] pb-2">
                            <div className="text-xs font-semibold text-[#ff9800]">{cert?.name}</div>
                            {cert?.issuer && <div className="text-xs text-[#44281d]"> {cert?.issuer}</div>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {languages?.length && languages?.length > 0 && (
                    <div className="bg-opacity-70 mt-2 mb-4 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                      <SectionTitle>{getServerTranslation('resume.languages', lang)}</SectionTitle>
                      <ul className="text-sm text-[#44281d]">
                        {languages?.map((language, i) => (
                          <li key={i} className="mb-1 flex items-center">
                            <span className="mr-1">🌍</span>
                            <span className="text-xs font-semibold text-[#ff9800]">{language?.language}</span>
                            {language?.fluency && <span className="ml-1 text-xs text-[#44281d]">({language?.fluency})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {basics?.citizenship?.length && basics?.citizenship?.length > 0 && (
                    <div className="bg-opacity-70 mt-4 space-y-1 rounded-lg border-l-4 border-[#97ce4c] bg-white p-4">
                      <SectionTitle>{getServerTranslation('resume.citizenship', lang)}</SectionTitle>
                      <ul className="text-xs text-[#44281d]">
                        {basics?.citizenship?.map((nat, i) => (
                          <li key={i} className="flex items-center">
                            <span className="mr-1">🪪</span>
                            {nat?.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            </section>
          </div>
        </main>
        <footer className="mt-6 text-center text-xs text-[#44281d] italic">
          Wubba Lubba Dub Dub! - {basics?.name || 'Your Interdimensional Resume'}
        </footer>
      </div>
    </A4Page>
  )
}

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <h1 className={cn(`font-['Schwifty'] text-base font-bold text-[#ff9800] uppercase`, className)}>{children}</h1>
}

const A4Page: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, className, id }) => {
  return (
    <div
      id={id}
      className={cn(
        'relative mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-[#f5f5f5] px-12 py-10 font-sans text-[#44281d]',
        className
      )}
    >
      {children}
    </div>
  )
}
