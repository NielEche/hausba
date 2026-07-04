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
