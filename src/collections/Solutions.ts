import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: {
    singular: 'Solution',
    plural: 'Solutions',
  },

  admin: {
    useAsTitle: 'title',
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
      label: 'Title',
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

    // Category / Type (adjust options if needed)
    {
      name: 'category',
      type: 'select',
      label: 'Solution Category',
      required: true,
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },

    // Main image
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Image',
    },

    // Short description
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },

    // Detail sections (similar to case study)
    {
      name: 'sections',
      type: 'array',
      label: 'Content Sections',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          label: 'Content',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Optional Icon',
        },
      ],
    },
  ],
}

export default Solutions
