import { getPayload } from 'payload'
import config from '@payload-config'
import AboutpageContent from '../components/AboutpageContent'

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
    limit: 60, // <-- limit to 8 brands
  })

  return <AboutpageContent awards={awards.docs} brands={brands.docs ?? []} />
}
