export default {
  name: 'orgValue',
  title: 'Values',
  type: 'document',
  fields: [
    {
      name: 'word',
      title: 'Word',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'word', subtitle: 'order' },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: `Order: ${selection.order ?? 'unset'}`,
      };
    },
  },
};
