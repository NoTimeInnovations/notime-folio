import { CollectionConfig } from "payload";

export const Users:CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'radio',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Mentor',
          value: 'mentor',
        },
      ],
      defaultValue: 'admin', 
      required: true,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        condition: (data: { role: string; }) => data.role === 'student' || data.role === 'mentor',
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true,
      admin: {
        condition: (data: { role: string; }) => data.role === 'student' || data.role === 'mentor',
      },
    },
  ],
};

