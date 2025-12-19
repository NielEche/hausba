// app/solutions/[slug]/page.tsx
// Alternative approach without generateStaticParams (dynamic rendering)

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import SolutionDetailContent from '../../components/SolutionDetailContent'

export const dynamic = 'force-dynamic'
export const revalidate = 60

// Helper to transform image URLs
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

export default async function SolutionDetailPage({ params }) {
  const payload = await getPayload({ config })

  // Await params for Next.js 15
  const resolvedParams = await params
  const slug = resolvedParams.slug

  console.log('Looking for solution with slug:', slug)

  try {
    const solutions = await payload.find({
      collection: 'solutions',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    console.log('Query result:', solutions)

    if (!solutions.docs || solutions.docs.length === 0) {
      console.log('No solution found with slug:', slug)
      notFound()
    }

    const solution = solutions.docs[0]

    // Transform all images
    const transformedSolution = {
      ...solution,
      image: transformImageUrl(solution.image),
      sections:
        solution.sections?.map((section) => ({
          ...section,
          icon: transformImageUrl(section.icon),
        })) || [],
    }

    console.log('Rendering solution:', transformedSolution.title)

    return <SolutionDetailContent solution={transformedSolution} />
  } catch (error) {
    console.error('Error fetching solution:', error)
    notFound()
  }
}

// Optional: Generate metadata
export async function generateMetadata({ params }) {
  const payload = await getPayload({ config })
  const resolvedParams = await params
  const slug = resolvedParams.slug

  try {
    const solutions = await payload.find({
      collection: 'solutions',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    const solution = solutions.docs[0]

    if (!solution) {
      return {
        title: 'Solution Not Found',
      }
    }

    return {
      title: `${solution.title} | Hausba Solutions`,
      description: solution.description || `Learn more about ${solution.title}`,
    }
  } catch (error) {
    return {
      title: 'Solution',
    }
  }
}
