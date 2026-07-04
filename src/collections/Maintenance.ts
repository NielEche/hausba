import type { CollectionConfig } from 'payload'

export const Maintenance: CollectionConfig = {
  slug: 'maintenance',
  labels: {
    singular: 'Maintenance Page',
    plural: 'Maintenance Page',
  },
  admin: {
    useAsTitle: 'internalTitle',
    description: 'Content for the Maintenance & Support page. Only one entry should exist.',
  },

  fields: [
    {
      name: 'internalTitle',
      type: 'text',
      required: true,
      label: 'Internal Title (admin only)',
      defaultValue: 'Maintenance Page',
      admin: {
        position: 'sidebar',
        description: 'Not shown on the frontend — just for identifying this entry in the admin.',
      },
    },

    // ── HERO ────────────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Label',
          defaultValue: "HAUSBACARES'",
        },
        {
          name: 'headingLine1',
          type: 'text',
          required: true,
          label: 'Heading (Line 1)',
          defaultValue: 'Keep Your Systems',
        },
        {
          name: 'headingLine2',
          type: 'text',
          required: true,
          label: 'Heading (Line 2, bold/emphasized)',
          defaultValue: 'Performing at Their Best',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Button Label',
          defaultValue: 'SEND US A WHATSAPP',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'CTA Link / WhatsApp URL',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Hero Background Image',
        },
      ],
    },

    // ── INTRO STATEMENT ─────────────────────────────────────
    {
      name: 'intro',
      type: 'group',
      label: 'Intro Statement',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Label',
          defaultValue: 'WHY IT MATTERS',
        },
        {
          name: 'statementLine1',
          type: 'text',
          label: 'Statement (Line 1)',
          defaultValue: 'AV system is a living',
        },
        {
          name: 'statementLine2',
          type: 'text',
          label: 'Statement (Line 2, bold)',
          defaultValue: 'system. It deserves ongoing care.',
        },
      ],
    },

    // ── WHY IT MATTERS — FEATURE CARDS ──────────────────────
    {
      name: 'features',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (SVG/PNG)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },

    // ── PLANS ────────────────────────────────────────────────
    {
      name: 'plansSection',
      type: 'group',
      label: 'Plans Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Label',
          defaultValue: 'LEVELS OF PLANS',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Choose the level of care that fits.',
        },
        {
          name: 'toggleOptions',
          type: 'group',
          label: 'Tab Toggle Labels',
          fields: [
            {
              name: 'residentialLabel',
              type: 'text',
              defaultValue: 'RESIDENTIAL',
            },
            {
              name: 'commercialLabel',
              type: 'text',
              defaultValue: 'COMMERCIAL',
            },
          ],
        },
        {
          name: 'plans',
          type: 'array',
          label: 'Plan Tiers',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'planType',
              type: 'select',
              required: true,
              options: [
                { label: 'Residential', value: 'residential' },
                { label: 'Commercial', value: 'commercial' },
              ],
              admin: {
                description: 'Which toggle tab this plan appears under.',
              },
            },
            {
              name: 'tierLabel',
              type: 'text',
              label: 'Tier Label (small text above name)',
              admin: { description: 'e.g. "TIER 01"' },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Plan Name',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              admin: { description: 'e.g. "Essential care for baseline reliability."' },
            },
            {
              name: 'features',
              type: 'array',
              label: 'Feature List',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'highlighted',
              type: 'checkbox',
              label: 'Highlight this plan (e.g. "Most Popular")',
              defaultValue: false,
            },
            {
              name: 'highlightLabel',
              type: 'text',
              label: 'Highlight Badge Text',
              admin: {
                condition: (_, siblingData) => siblingData?.highlighted,
                description: 'e.g. "MOST POPULAR"',
              },
            },
          ],
        },
      ],
    },

    // ── MID CTA ──────────────────────────────────────────────
    {
      name: 'midCta',
      type: 'group',
      label: 'Mid-Page CTA',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'CHAT WITH US ON WHATSAPP',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'CTA Link',
        },
        {
          name: 'subtext',
          type: 'text',
          label: 'Subtext below button',
        },
      ],
    },

    // ── #HAUSBACARES SECTION ─────────────────────────────────
    {
      name: 'hausbaCares',
      type: 'group',
      label: '#HausbaCares Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: '#HausbaCares',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // ── TESTIMONIALS ─────────────────────────────────────────
    {
      name: 'testimonialsSection',
      type: 'group',
      label: 'Testimonials Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'CLIENT WORDS',
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Cared for, long after handover.',
        },
        {
          name: 'testimonials',
          type: 'array',
          label: 'Testimonials',
          minRows: 1,
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'roleOrProperty',
              type: 'text',
              label: 'Role / Property Type',
              admin: { description: 'e.g. "Homeowner, Lagos" or "Property Manager"' },
            },
          ],
        },
      ],
    },

    // ── FAQ ──────────────────────────────────────────────────
    {
      name: 'faqSection',
      type: 'group',
      label: 'FAQ Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'FAQ',
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Questions, answered.',
        },
        {
          name: 'faqs',
          type: 'array',
          label: 'FAQ Items',
          minRows: 1,
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default Maintenance