import { getPayload } from 'payload'
import config from '@payload-config'
import SolutionpageContent from '../components/SolutionpageContent'

export default async function SolutionPage() {
  const payload = await getPayload({ config })

  const solutions = await payload.find({
    collection: 'solutions',
    limit: 100,
  })


  return <SolutionpageContent solutions={solutions.docs} />
}
