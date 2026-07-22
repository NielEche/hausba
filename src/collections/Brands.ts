// collections/Brands.ts
import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'website', 'createdAt'],
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
    // Type — lets you distinguish Partners from Brands
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Type',
      defaultValue: 'brand',
      options: [
        { label: 'Partner', value: 'partner' },
        { label: 'Brand', value: 'brand' },
      ],
      admin: {
        position: 'sidebar',
      },
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
