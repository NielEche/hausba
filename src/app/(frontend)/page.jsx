import { getPayload } from 'payload'
import config from '@payload-config'

import HomepageContent from './components/HomepageContent'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const applications = await payload.find({
    collection: 'applications',
    depth: 1,
    sort: 'createdAt',
    limit: 20,
  })

  const solutions = await payload.find({
    collection: 'solutions',
    depth: 1,
    sort: '-createdAt',
    limit: 20,
  })

  const testimonials = await payload.find({
    collection: 'testimonials',
    depth: 1,
    where: {
      featured: {
        equals: true,
      },
    },
    sort: '-createdAt',
  })

  const brands = await payload.find({
    collection: 'brands',
    depth: 1,
    sort: 'name',
    limit: 8, // <-- limit to 8 brands
  })

  return (
    <HomepageContent
      applications={applications.docs ?? []}
      solutions={solutions.docs ?? []}
      testimonials={testimonials.docs ?? []}
      brands={brands.docs ?? []}
    />
  )
}
