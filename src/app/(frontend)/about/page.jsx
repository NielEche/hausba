import { getPayload } from 'payload'
import config from '@payload-config'
import AboutpageContent from '../components/AboutpageContent'

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

export default async function AboutPage() {
  const payload = await getPayload({ config })

  // Fetch awards collection
  const awards = await payload.find({
    collection: 'awards',
    limit: 100,
  })

  const brands = await payload.find({
    collection: 'brands',
    depth: 1,
    sort: 'name',
    limit: 60,
  })

  // Transform image URLs
  const transformedAwards = awards.docs.map((award) => ({
    ...award,
    image: transformImageUrl(award.image),
  }))

  const transformedBrands = brands.docs.map((brand) => ({
    ...brand,
    image: transformImageUrl(brand.image),
  }))

  return <AboutpageContent awards={transformedAwards} brands={transformedBrands} />
}
