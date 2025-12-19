import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectsPageContent from '../components/ProjectsPageContent'

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

export default async function ProjectsPage() {
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: '-projectDate', // Sort by newest first
  })

  // Transform image URLs
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
