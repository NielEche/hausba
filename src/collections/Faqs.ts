import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'page', 'order'],
    description: 'Frequently asked questions, grouped by which page they appear on.',
  },
  defaultSort: 'order',

  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Answer',
    },
    {
      name: 'page',
      type: 'select',
      required: true,
      label: 'Shown On Page',
      defaultValue: 'maintenance',
      options: [
        { label: 'Maintenance Page', value: 'maintenance' },
        { label: 'Homepage', value: 'homepage' },
        { label: 'General / Other', value: 'general' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Lets you reuse this collection for FAQ sections on other pages later.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first in the accordion.',
      },
    },
  ],
}

export default Faqs
