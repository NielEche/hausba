import { getPayload } from 'payload'
import config from '@payload-config'
import SolutionpageContent from '../components/SolutionpageContent'

export const revalidate = 60

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

export default async function SolutionPage() {
  const payload = await getPayload({ config })

  const solutions = await payload.find({
    collection: 'solutions',
    limit: 100,
  })

  // Transform image URLs
  const transformedSolutions = solutions.docs.map((solution) => ({
    ...solution,
    image: transformImageUrl(solution.image),
  }))

  return <SolutionpageContent solutions={transformedSolutions} />
}
