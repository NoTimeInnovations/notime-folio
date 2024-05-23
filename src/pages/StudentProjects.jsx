import React, { useEffect } from "react";
import Banner from "../components/common/Banner";
import ProjectCard from "../components/studentProjects/ProjectCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";
import { client } from "../utils/sanity/client";

const StudentProjects = () => {
  const [projects, setProjects] = React.useState();

  useEffect(() => {
    const fetchProjects = async () => {
      const Studprojects = await client.fetch(`*[_type == 'student_project']{
        name,
        position,
        profile_image,
        project_title,
        project_description,
        project_link,
        project_image
      }`);
      setProjects(Studprojects);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-40 px-5 md:px-10 lg:px-16 xl:px-[15%]">
      <ScrollProgressIndicator />
      <Banner text="Student Projects" />

      {/* courses  */}

      <div className="grid gap-10 lg:grid-cols-3 mt-20 place-items-center">
        {projects?.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default StudentProjects;
