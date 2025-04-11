import { z } from 'zod'

const _resumeSchema = {
  basics: z
    .object({
      name: z.string().optional(),
      label: z.string().optional(),
      image: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      url: z.string().optional(),
      summary: z.string().optional(),
      gender: z.string().optional(), // not json resume
      citizenship: z.array(z.string()).optional(), // not json resume
      birth: z
        .object(
          {
            date: z.string().optional(),
          } //not json resume
        )
        .optional(),
      location: z
        .object({
          address: z.string().optional(),
          postalCode: z.string().optional(),
          city: z.string().optional(),
          countryCode: z.string().optional(),
          region: z.string().optional(),
        })
        .optional(),
      profiles: z
        .array(
          z.object({
            network: z.string().optional(),
            username: z.string().optional(),
            url: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
  work: z
    .array(
      z.object({
        name: z.string().optional(),
        position: z.string().optional(),
        url: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
        location: z //not json resume
          .object({
            address: z.string().optional(),
            postalCode: z.string().optional(),
            city: z.string().optional(),
            countryCode: z.string().optional(),
            region: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
  volunteer: z
    .array(
      z.object({
        organization: z.string().optional(),
        position: z.string().optional(),
        url: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string().optional(),
        url: z.string().optional(),
        area: z.string().optional(),
        studyType: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        score: z.string().optional(),
        courses: z.array(z.string()).optional(),
      })
    )
    .optional(),
  awards: z
    .array(
      z.object({
        title: z.string().optional(),
        date: z.string().optional(),
        awarder: z.string().optional(),
        summary: z.string().optional(),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        name: z.string().optional(),
        date: z.string().optional(),
        issuer: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
  publications: z
    .array(
      z.object({
        name: z.string().optional(),
        publisher: z.string().optional(),
        releaseDate: z.string().optional(),
        url: z.string().optional(),
        summary: z.string().optional(),
      })
    )
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string().optional(),
        level: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
    )
    .optional(),
  languages: z
    .array(
      z.object({
        language: z.string().optional(),
        fluency: z.string().optional(),
      })
    )
    .optional(),
  interests: z
    .array(
      z.object({
        name: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
    )
    .optional(),
  references: z
    .array(
      z.object({
        name: z.string().optional(),
        reference: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string().optional(),
        hours: z.string().optional(), //not json resume
        contact: z
          .object({
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
          })
          .optional(), //not json resume
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
        highlights: z.array(z.string()).optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
}

export const ResumeSchema = z.object(_resumeSchema)
export type ResumeSchemaType = z.infer<typeof ResumeSchema>
