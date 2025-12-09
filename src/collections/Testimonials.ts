import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'testimony',
      type: 'textarea',
      required: true,
      label: 'Testimonial',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image (Optional)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Testimonial',
      defaultValue: false,
      admin: {
        description: 'Mark this testimonial as featured to highlight it',
      },
    },
  ],
}
