// collections/Brands.ts
import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'website', 'createdAt'],
  },
  access: {
    read: () => true, // publicly readable
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Brand Name',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Brand Logo',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
      admin: {
        description: 'Enter full URL, e.g. https://example.com',
      },
    },
  ],
}
