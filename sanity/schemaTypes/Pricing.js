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
            name : "order",
            title : "Order",
            type : "number",
        },
        {
            name : "subTag",
            title : "Sub Tag",
            type : "string"
        },
        {
            name : "price",
            title : "Price",
            type : "number"
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