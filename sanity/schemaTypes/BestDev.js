export default {
  name: "bestDev",
  title: "Best Dev",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "position",
      title: "Position",
      type: "string",
    },
    {
      name: "number_of_projects",
      title: "Number of Projects",
      type: "number",
    },
    {
        name : 'best_project_link',
        title : 'Best Project Link',
        type : 'url'
    },
    {
        name : 'skill',
        title : 'Skill out of 3',
        type : 'number'
    },
    {
        name : 'image',
        title : 'Profile Image',
        type : 'image',
        options : {
            hotspot : true
        }
    }
  ],
};
