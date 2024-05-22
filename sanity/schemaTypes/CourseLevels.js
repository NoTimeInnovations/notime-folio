export default {
    name: 'levels',
    title: 'Course Levels',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'level_title',
            title: 'Level Title',
            type: 'string',
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
        {
            name: 'main_contents',
            title: 'Main Contents',
            type: 'array',
            of: [
                {
                    type: 'sub_contents'
                }
            ]
        }
    ]
};
