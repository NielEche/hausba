// collections/Projects.ts
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'tags'],
  },

  // Auto-generate slug
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        if (!data.slug && data.title) {
          data.slug = slugify(data.title, {
            lower: true,
            strict: true,
          })
        }

        return data
      },
    ],
  },

  fields: [
    // Title
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },

    // Slug
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
    },

    // Type (Residential or Commercial)
    {
      name: 'type',
      type: 'select',
      label: 'Project Type',
      required: true,
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // Tags
    {
      name: 'tags',
      type: 'array',
      label: 'Project Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },

    // Main Cover Image
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },

    // Description
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Project Description',
    },

    // Project Details/Content
    {
      name: 'content',
      type: 'richText',
      label: 'Project Content',
    },

    // Gallery Images
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption (Optional)',
        },
      ],
    },

    // Project Date
    {
      name: 'projectDate',
      type: 'date',
      label: 'Project Completion Date',
      admin: {
        position: 'sidebar',
      },
    },

    // Client Name (Optional)
    {
      name: 'clientName',
      type: 'text',
      label: 'Client Name (Optional)',
    },

    // Location
    {
      name: 'location',
      type: 'text',
      label: 'Project Location',
    },
  ],
}

export default Projects
