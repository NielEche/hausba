import { getPayload } from 'payload'
import config from '@payload-config'
import ApplicationsPageContent from '../components/ApplicationsPageContent'

export const revalidate = 60

function transformImageUrl(image) {
  if (!image) return null

  if (image._key) {
    return {
      ...image,
      url: `https://utfs.io/f/${image._key}`,
    }
  }

  return image
}

export default async function ApplicationsPage() {
  const payload = await getPayload({ config })

  const applications = await payload.find({
    collection: 'applications',
    limit: 100,
    sort: '-createdAt',
  })

  const transformedApplications = applications.docs.map((application) => ({
    ...application,
    image: transformImageUrl(application.image),
    caseStudy:
      application.caseStudy?.map((section) => ({
        ...section,
        backgroundImage: transformImageUrl(section.backgroundImage),
      })) || [],
  }))

  return <ApplicationsPageContent applications={transformedApplications} />
}
