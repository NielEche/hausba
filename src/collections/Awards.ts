// collections/Awards.ts
import type { CollectionConfig } from 'payload'

export const Awards: CollectionConfig = {
  slug: 'awards',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt'],
  },
  access: {
    read: () => true, // publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Award Title',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Award Image',
      required: true,
    },
  ],
}