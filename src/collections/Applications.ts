import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Application',
    plural: 'Applications',
  },
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      type: 'group',
      name: 'residential',
      label: 'Residential',
      fields: [
        {
          type: 'array',
          name: 'items',
          label: 'Residential Applications',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media', // change if your uploads collection is named differently
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'commercial',
      label: 'Commercial',
      fields: [
        {
          type: 'array',
          name: 'items',
          label: 'Commercial Applications',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
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
  ],
}

export default Applications
