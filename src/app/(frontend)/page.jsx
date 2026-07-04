import { getPayload } from 'payload'
import config from '@payload-config'

import HomepageContent from './components/HomepageContent'

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

export default async function HomePage() {
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    where: {
      featured: {
        equals: true,
      },
    },
    sort: 'homepageOrder',
    limit: 20,
  })

  const solutions = await payload.find({
    collection: 'solutions',
    depth: 1,
    sort: 'updatedAt',
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
    limit: 12,
  })

  const transformedProjects = projects.docs.map((project) => ({
    ...project,
    image: transformImageUrl(project.coverImage),
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

  return (
    <HomepageContent
      projects={transformedProjects}
      solutions={transformedSolutions}
      testimonials={transformedTestimonials}
      brands={transformedBrands}
    />
  )
}
