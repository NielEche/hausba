import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectsPageContent from '../components/ProjectsPageContent'

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
    slug: 'projects-seo',
  })

  const ogImage = transformImageUrl(seo?.meta?.image)

  return {
    title: seo?.meta?.title || 'Our Work | HAUSBA',
    description: seo?.meta?.description || '',
    openGraph: {
      title: seo?.meta?.title,
      description: seo?.meta?.description,
      images: ogImage?.url ? [ogImage.url] : [],
    },
  }
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: '-projectDate',
  })

  const transformedProjects = projects.docs.map((project) => ({
    ...project,
    coverImage: transformImageUrl(project.coverImage),
    gallery:
      project.gallery?.map((item) => ({
        ...item,
        image: transformImageUrl(item.image),
      })) || [],
  }))

  return <ProjectsPageContent projects={transformedProjects} />
}
