import { getPayload } from 'payload'
import config from '@payload-config'
import MaintenancePageContent from '../components/MaintenancePageContent'

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

export async function generateMetadata() {
  const payload = await getPayload({ config })

  const seo = await payload.findGlobal({
    slug: 'maintenance-seo',
  })

  const ogImage = transformImageUrl(seo?.meta?.image)

  return {
    title: seo?.meta?.title || 'Maintenance | HAUSBA',
    description: seo?.meta?.description || '',
    openGraph: {
      title: seo?.meta?.title,
      description: seo?.meta?.description,
      images: ogImage?.url ? [ogImage.url] : [],
    },
  }
}

export default async function MaintenancePage() {
  const payload = await getPayload({ config })

  const [servicePlans, faqs, testimonials] = await Promise.all([
    payload.find({
      collection: 'service-plans',
      limit: 100,
      sort: 'order',
    }),
    payload.find({
      collection: 'faqs',
      where: { page: { equals: 'maintenance' } },
      limit: 100,
      sort: 'order',
    }),
    payload.find({
      collection: 'testimonials',
      limit: 3,
      sort: '-createdAt',
    }),
  ])

  return (
    <MaintenancePageContent
      plans={servicePlans.docs}
      faqs={faqs.docs}
      testimonials={testimonials.docs}
    />
  )
}
