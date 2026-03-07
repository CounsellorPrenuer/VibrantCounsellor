
export const schemaTypes = [
  {
    name: 'plan',
    title: 'Mentorship Plan',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'price', title: 'Price', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'category', title: 'Category', type: 'string', options: { list: ['standard', 'custom'] } },
      { name: 'subgroup', title: 'Subgroup', type: 'string' },
      { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
      { name: 'gradient', title: 'Gradient', type: 'string' },
      { name: 'popular', title: 'Popular', type: 'boolean' },
      { name: 'order', title: 'Order', type: 'number' },
      { name: 'buttonId', title: 'Button ID / Payment Link', type: 'string' },
    ]
  },
  {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'excerpt', title: 'Excerpt', type: 'text' },
      { name: 'content', title: 'Content', type: 'text' },
      { name: 'publishedAt', title: 'Published At', type: 'datetime' },
      { name: 'mainImage', title: 'Main Image', type: 'image' },
    ]
  },
  {
    name: 'settings',
    title: 'Global Settings',
    type: 'document',
    fields: [
      { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' },
      { name: 'contactPhone', title: 'Contact Phone', type: 'string' },
      { name: 'contactEmail', title: 'Contact Email', type: 'string' },
      { name: 'contactLocation', title: 'Contact Location', type: 'string' },
      { name: 'contactWebsite', title: 'Contact Website', type: 'string' },
      { name: 'facebookLink', title: 'Facebook Link', type: 'string' },
      { name: 'instagramLink', title: 'Instagram Link', type: 'string' },
      { name: 'heroTitle', title: 'Hero Title', type: 'string' },
      { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' },
    ]
  },
  {
    name: 'stat',
    title: 'Statistic',
    type: 'document',
    fields: [
      { name: 'label', title: 'Label', type: 'string' },
      { name: 'value', title: 'Value', type: 'string' },
      { name: 'suffix', title: 'Suffix', type: 'string' },
      { name: 'order', title: 'Order', type: 'number' },
    ]
  },
  {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
      { name: 'quote', title: 'Quote', type: 'text' },
      { name: 'author', title: 'Author', type: 'string' },
      { name: 'role', title: 'Role', type: 'string' },
      { name: 'location', title: 'Location', type: 'string' },
      { name: 'order', title: 'Order', type: 'number' },
    ]
  },
  {
    name: 'credential',
    title: 'Hero Credential',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'string' },
      { name: 'icon', title: 'Icon (lucide name)', type: 'string', description: 'e.g. Award, GraduationCap, Users, Heart' },
      { name: 'order', title: 'Order', type: 'number' },
    ]
  }
]
