export default {

    name : 'founder',
    title : 'Founder',
    type : 'document',

    fields : [

        {
            name : 'name',
            title : 'Name',
            type : 'string'
        },
        {
            name : 'profile_image',
            title : 'Profile Image',
            type : 'image',
            options : {
                hotspot : true
            }
        }

    ]

}