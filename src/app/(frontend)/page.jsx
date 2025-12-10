import { getPayload } from 'payload'
import config from '@payload-config'

import HomepageContent from './components/HomepageContent'

// Helper to transform image URLs to use UploadThing
function transformImageUrl(image) {
  if (!image) return null

  // If _key exists, construct the UploadThing URL
  if (image._key) {
    return {
      ...image,
      url: `https://utfs.io/f/${image._key}`,
    }
  }

  // Fallback to original URL
  return image
}

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
    limit: 8,
  })

  // Transform all image URLs to use UploadThing
  const transformedApps = applications.docs.map((app) => ({
    ...app,
    image: transformImageUrl(app.image),
  }))

  const transformedSolutions = solutions.docs.map((sol) => ({
    ...sol,
    image: transformImageUrl(sol.image),
  }))

  const transformedTestimonials = testimonials.docs.map((t) => ({
    ...t,
    image: transformImageUrl(t.image),
  }))

  const transformedBrands = brands.docs.map((b) => ({
    ...b,
    image: transformImageUrl(b.image),
  }))

  // Debug: Check transformed URLs
  console.log('=== TRANSFORMED IMAGE CHECK ===')
  console.log('First app image URL:', transformedApps[0]?.image?.url)
  console.log('First brand image URL:', transformedBrands[0]?.image?.url)
  console.log('===============================')

  return (
    <HomepageContent
      applications={transformedApps}
      solutions={transformedSolutions}
      testimonials={transformedTestimonials}
      brands={transformedBrands}
    />
  )
}
