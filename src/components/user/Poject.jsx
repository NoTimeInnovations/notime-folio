import { useState } from "react";

const Project = ({ userData, setUserData, auth }) => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    gitLink: "",
    liveLink: "",
    imageUrl: "",
  });

  const handleAddProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProject((prev) => ({
      ...prev,
      imageFile: e.target.files[0], // Store the uploaded file
    }));
  };

  // Mock function to handle file and data upload
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("gitLink", newProject.gitLink);
    formData.append("liveLink", newProject.liveLink);
    formData.append("imageFile", newProject.imageFile);

    try {
      // Simulate file upload with a promise (mocked API call)
      const uploadResult = await new Promise((resolve) => {
        setTimeout(() =>
          resolve({
            success: true,
            imageUrl: URL.createObjectURL(newProject.imageFile),
          }), 1000);
      });

      if (uploadResult.success) {
        // Add the new project to userData
        setUserData((prev) => ({
          ...prev,
          projects: [
            ...prev.projects,
            {
              title: newProject.title,
              gitLink: newProject.gitLink,
              liveLink: newProject.liveLink,
              imageUrl: uploadResult.imageUrl, // Use the uploaded image URL
            },
          ],
        }));
        setShowAddProjectModal(false); // Close modal
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <>
      <section className="mt-10">
        <h2 className="flex items-center text-3xl font-semibold cursor-pointer">
          Projects
          {auth ? (
            <svg
              onClick={() => setShowAddProjectModal(true)}
              className="h-8 w-8 ml-2 text-slate-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
          ) : (
            <></>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {userData.projects.map((project, index) => (
            <div
              key={index}
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <a
                  href={project.gitLink}
                  className="text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Add New Project</h2>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleAddProjectChange}
              className="bg-gray-700 w-full p-2 mb-4 rounded"
            />
            <input
              type="url"
              name="gitLink"
              placeholder="GitHub Link"
              value={newProject.gitLink}
              onChange={handleAddProjectChange}
              className="bg-gray-700 w-full p-2 mb-4 rounded"
            />
            <input
              type="url"
              name="liveLink"
              placeholder="Live Link"
              value={newProject.liveLink}
              onChange={handleAddProjectChange}
              className="bg-gray-700 w-full p-2 mb-4 rounded"
            />
            <input
              type="file"
              name="imageFile"
              onChange={handleFileChange}
              className="bg-gray-700 w-full p-2 mb-4 rounded"
              accept="image/*" // Accept only image files
            />
            <div className="flex justify-between">
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add Project
              </button>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
