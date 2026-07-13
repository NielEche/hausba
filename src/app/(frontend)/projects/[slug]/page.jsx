// app/projects/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ProjectDetailContent from '../../components/ProjectDetailContent'

export const dynamic = 'force-dynamic'
export const revalidate = 60

// Helper to transform image URLs — Payload local storage already
// returns a working url (e.g. /api/media/file/xxx.jpg), so just pass it through
function transformImageUrl(image) {
  if (!image) return null
  return image
}

export default async function ProjectDetailPage({ params }) {
  const payload = await getPayload({ config })

  // Await params for Next.js 15
  const resolvedParams = await params
  const slug = resolvedParams.slug

  console.log('Looking for project with slug:', slug)

  try {
    const projects = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    console.log('Query result:', projects)

    if (!projects.docs || projects.docs.length === 0) {
      console.log('No project found with slug:', slug)
      notFound()
    }

    const project = projects.docs[0]

    // Transform all images across the restructured schema
    const transformedProject = {
      ...project,
      coverImage: transformImageUrl(project.coverImage),
      brief: project.brief
        ? {
            ...project.brief,
            image: transformImageUrl(project.brief.image),
          }
        : null,
      solution: project.solution
        ? {
            ...project.solution,
            images:
              project.solution.images?.map((item) => ({
                ...item,
                image: transformImageUrl(item.image),
              })) || [],
          }
        : null,
      extraDetails: project.extraDetails
        ? {
            ...project.extraDetails,
            image: transformImageUrl(project.extraDetails.image),
          }
        : null,
      gallery:
        project.gallery?.map((item) => ({
          ...item,
          image: transformImageUrl(item.image),
        })) || [],
    }

    console.log('Rendering project:', transformedProject.title)

    return <ProjectDetailContent project={transformedProject} />
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const payload = await getPayload({ config })
  const resolvedParams = await params
  const slug = resolvedParams.slug

  try {
    const projects = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    console.log('Query result count:', projects.docs?.length)
    console.log('Query result docs:', JSON.stringify(projects.docs, null, 2))

    const project = projects.docs[0]

    if (!project) {
      return {
        title: 'Project Not Found',
      }
    }

    const ogImage = transformImageUrl(project.meta?.image)

    return {
      title: project.meta?.title || `${project.title} | Hausba Projects`,
      description: project.meta?.description || `View our ${project.title} project`,
      openGraph: {
        title: project.meta?.title || project.title,
        description: project.meta?.description,
        images: ogImage?.url ? [ogImage.url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Project',
    }
  }
}
