import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ProjectDetailContent from '../../components/ProjectDetailContent'

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

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })

    const projects = await payload.find({
      collection: 'projects',
      limit: 100,
    })

    return projects.docs.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const payload = await getPayload({ config })
    const { slug } = await params

    const projects = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    const project = projects.docs[0]

    if (!project) {
      return {
        title: 'Project Not Found',
      }
    }

    return {
      title: `${project.title} | Hausba Projects`,
      description: project.description || `View our ${project.title} project`,
    }
  } catch (error) {
    return {
      title: 'Project',
    }
  }
}

export default async function ProjectDetailPage({ params }) {
  try {
    const payload = await getPayload({ config })
    const { slug } = await params

    const projects = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    const project = projects.docs[0]

    if (!project) {
      notFound()
    }

    // Transform all images
    const transformedProject = {
      ...project,
      coverImage: transformImageUrl(project.coverImage),
      gallery:
        project.gallery?.map((item) => ({
          ...item,
          image: transformImageUrl(item.image),
        })) || [],
    }

    return <ProjectDetailContent project={transformedProject} />
  } catch (error) {
    console.error('Error in ProjectDetailPage:', error)
    notFound()
  }
}
