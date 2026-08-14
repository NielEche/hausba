import { getPayload } from 'payload'
import config from '@payload-config'
import SolutionpageContent from '../components/SolutionpageContent'

export const revalidate = 60

function transformImageUrl(image) {
  if (!image) return null
  if (image._key) {
    return { ...image, url: `https://utfs.io/f/${image._key}` }
  }
  return image
}

export async function generateMetadata() {
  const payload = await getPayload({ config })

  const seo = await payload.findGlobal({
    slug: 'solutions-seo',
  })

  const ogImage = transformImageUrl(seo?.meta?.image)

  return {
    title: seo?.meta?.title || 'Solutions | HAUSBA',
    description: seo?.meta?.description || '',
    openGraph: {
      title: seo?.meta?.title,
      description: seo?.meta?.description,
      images: ogImage?.url ? [ogImage.url] : [],
    },
  }
}

export default async function SolutionPage() {
  const payload = await getPayload({ config })

  const solutions = await payload.find({
    collection: 'solutions',
    sort: 'updatedAt',
    limit: 100,
  })

  const transformedSolutions = solutions.docs.map((solution) => ({
    ...solution,
    image: transformImageUrl(solution.image),
  }))

  return <SolutionpageContent solutions={transformedSolutions} />
}
