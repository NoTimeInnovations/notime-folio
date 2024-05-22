export default {
  name: 'sub_contents',
  title: 'Sub Contents',
  type: 'object',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of:[
        {
          type: 'string'
        }
      ]
    },
  ],
};
