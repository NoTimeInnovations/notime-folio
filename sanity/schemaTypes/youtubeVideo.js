export default {
    name: "youtube_videos",
    title: "Youtube Videos",
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: (Rule) => Rule.min(50).max(150)
        },
        {
            name: 'link',
            title: 'Link',
            type: "url"
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            options: {
                hotspot: true
            }
        }
    ]
}
