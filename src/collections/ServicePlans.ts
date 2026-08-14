import type { CollectionConfig } from 'payload'

export const ServicePlans: CollectionConfig = {
  slug: 'service-plans',
  labels: {
    singular: 'Service Plan',
    plural: 'Service Plans',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'planType', 'price', 'highlighted', 'order'],
    description:
      'Maintenance plan tiers shown on the Maintenance page (Basic, Standard, Premium, etc).',
  },
  defaultSort: 'order',

  fields: [
    {
      name: 'planType',
      type: 'select',
      required: true,
      label: 'Plan Category',
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
      ],
      admin: {
        description: 'Which toggle tab this plan appears under on the Maintenance page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first (e.g. Basic = 1, Standard = 2, Premium = 3).',
      },
    },
    {
      name: 'tierLabel',
      type: 'text',
      label: 'Tier Label',
      admin: { description: 'Small label above the plan name, e.g. "TIER 01".' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Plan Name',
      admin: { description: 'e.g. "Basic Plan", "Standard Plan", "Premium Plan".' },
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      admin: {
        description:
          'Short description under the plan name, e.g. "Basic care for baseline reliability."',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      admin: {
        description:
          'Numeric cost for this plan, e.g. 150000. Leave blank for "Custom Quote" plans.',
      },
    },
    {
      name: 'priceCurrency',
      type: 'select',
      label: 'Currency',
      defaultValue: 'NGN',
      options: [
        { label: 'NGN (₦)', value: 'NGN' },
        { label: 'USD ($)', value: 'USD' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.price != null && siblingData.price !== '',
      },
    },
    {
      name: 'priceInterval',
      type: 'select',
      label: 'Billing Interval',
      defaultValue: 'yearly',
      options: [
        { label: 'One-time', value: 'one_time' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Yearly', value: 'yearly' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.price != null && siblingData.price !== '',
        description: 'How often this price is billed. Only shown if a price is set.',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature List',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Feature',
        },
      ],
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Highlight this plan',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Visually emphasizes this plan card (e.g. the "Premium" tier in the design).',
      },
    },
    {
      name: 'highlightLabel',
      type: 'text',
      label: 'Highlight Badge Text',
      defaultValue: 'MOST RECOMMENDED',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData?.highlighted),
        description: 'e.g. "MOST RECOMMENDED" — only shown if Highlight is checked.',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'CHAT WITH US ON WHATSAPP',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Link',
    },
  ],
}

export default ServicePlans
