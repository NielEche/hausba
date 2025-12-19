import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ApplicationDetailContent from '../../components/ApplicationDetailContent'

export const dynamic = 'force-dynamic'
export const revalidate = 60

// Transform image URLs to use UploadThing
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

export default async function ApplicationDetailPage({ params }) {
  const payload = await getPayload({ config })

  // Next 15 requires awaiting params
  const resolvedParams = await params
  const slug = resolvedParams.slug

  try {
    const applications = await payload.find({
      collection: 'applications',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true, // ensures we can read all records
    })

    if (!applications.docs || applications.docs.length === 0) {
      notFound()
    }

    const application = applications.docs[0]

    const transformedApplication = {
      ...application,
      image: transformImageUrl(application.image),
      caseStudy:
        application.caseStudy?.map((section) => ({
          ...section,
          backgroundImage: transformImageUrl(section.backgroundImage),
        })) || [],
    }

    return <ApplicationDetailContent application={transformedApplication} />
  } catch (error) {
    console.error('Error fetching application:', error)
    notFound()
  }
}

// Optional: Generate metadata dynamically
export async function generateMetadata({ params }) {
  const payload = await getPayload({ config })
  const resolvedParams = await params
  const slug = resolvedParams.slug

  try {
    const applications = await payload.find({
      collection: 'applications',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    })

    const application = applications.docs[0]

    if (!application) {
      return { title: 'Application Not Found' }
    }

    return {
      title: `${application.title} | Hausba Applications`,
      description: application.description || `Learn more about ${application.title}`,
    }
  } catch (error) {
    return { title: 'Application' }
  }
}
