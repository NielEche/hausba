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
    defaultColumns: ['title', 'type', 'status', 'featured', 'tags'],
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

    // Visibility / listing status
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Unlisted', value: 'unlisted' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Unlisted projects are excluded from the public project grid, sitemap, and other listing queries.',
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
        { label: 'Hospitality', value: 'hospitality' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // Systems Overview — shown in the meta bar (e.g. "Lighting Control", "Cinema", "Distribution")
    {
      name: 'systems',
      type: 'array',
      label: 'Systems Overview (shown in meta bar)',
      fields: [
        {
          name: 'system',
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
      required: false,
      label: 'Project Description',
    },

    // THE BRIEF
    {
      name: 'brief',
      type: 'group',
      label: 'The Brief',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'The Brief',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Brief Image',
        },
      ],
    },

    // THE SOLUTION
    {
      name: 'solution',
      type: 'group',
      label: 'The Solution',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'The Solution',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'images',
          type: 'array',
          label: 'Solution Images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },

    // EXTRA DETAILS
    {
      name: 'extraDetails',
      type: 'group',
      label: 'Extra Details',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Extra Details Image',
        },
      ],
    },

    // CRAFT — the dark pull-quote / highlight callout
    {
      name: 'craft',
      type: 'textarea',
      label: 'Craft Statement (highlight quote)',
    },

    // SPECIFICATION — "Related & Areas of Interest" spec table
    {
      name: 'specification',
      type: 'array',
      label: 'Specification',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true, // e.g. "Lighting Control System"
        },
        {
          name: 'value',
          type: 'text',
          required: true, // e.g. "Lutron Homeworks QS"
        },
      ],
    },

    // Gallery Images — extra gallery-only images (bottom thumbnail grid also
    // includes brief/solution/extraDetails images, combined at render time)
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

    // Featured on Homepage
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on Homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this project in the Selected Work section on the homepage.',
      },
    },

    // Homepage Order
    {
      name: 'homepageOrder',
      type: 'number',
      label: 'Homepage Order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first. Only applies when featured.',
        condition: (data) => data.featured,
      },
    },
  ],
}

export default Projects
