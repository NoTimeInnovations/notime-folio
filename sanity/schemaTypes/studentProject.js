export default {
  name: "student_project",
  title: "Student Project",
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
      name: "profile_image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "project_title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.max(50).min(10),
    },
    {
      name: "project_description",
      title: "Project Description",
      type: "text",
      validation: (Rule) => Rule.max(150).min(30),
    },
    {
      name: "project_link",
      title: "Project Link",
      type: "url",
    },
    {
      name: "project_image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
