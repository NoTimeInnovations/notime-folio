export default {

    name  : "pricing",
    title : "Pricing",
    type : "document",

    fields : [

        {
            name : "tag",
            title : "Tag",
            type : "string"
        },
        {
            name : "subTag",
            title : "Sub Tag",
            type : "string"
        },
        {
            name : "price",
            title : "Price",
            type : "string"
        },
        {
            name : "description",
            title : "Description",
            type : "string"
        },
        {
            name : "features",
            title : "Features",
            type : "array",
            of : [
                {
                    type : "string"
                }
            ]
        }

    ]

}