import react,{useState } from "react";
import Stats from "./Stats";

const EditableField = ({
  label,
  name,
  value,
  auth,
  onChange,
  type = "text",
  maxLength = 20,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col space-y-1 relative group">
      <label className="font-semibold text-gray-400">{label}</label>
      {auth ? (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="bg-gray-800 text-white rounded px-3 py-2 w-full "
        />
      ) : (
        <div
          className="text-gray-300 truncate max-w-xs md:max-w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {truncateText(value, maxLength)}
        </div>
      )}
      {/* Tooltip on hover */}
      {isHovered && value && value.length > maxLength && (
        <div className="absolute bg-gray-700 text-white text-xs rounded p-2 w-max z-10 shadow-lg left-0 top-full mt-1">
          {value}
        </div>
      )}
    </div>
  );
};

const Info = ({ userData, auth, setUserData }) => {
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUserImage = async () => {
    if (newImageFile) {
      const imageUrl = URL.createObjectURL(newImageFile); // Simulate image upload
      setUserData((prev) => ({
        ...prev,
        imageUrl, // Update user image
      }));
      setNewImageFile(null); // Clear file input
    }
  };

  return (
    <>
      {/* User Image and Basic Info Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="relative">
          <img
            src={userData.imageUrl || "https://via.placeholder.com/150"}
            alt="User"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
          />
          {auth && (
            <div className="absolute top-0 right-0">
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="bg-green-600 text-white rounded-full px-3 py-1 absolute right-6 top-4 transform translate-x-2/3 -translate-y-1/3"
              >
                Swap
              </button>
              <input
                id="file-input"
                type="file"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            {userData.name || "Anonymous"}
          </h1>
          <p className="text-gray-400">{userData.email || "No email provided"}</p>
        </div>
      </section>

      {/* Editable User Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <EditableField
            label="Name"
            name="name"
            value={userData.name}
            auth={auth}
            onChange={handleInputChange}
          />
          <EditableField
            label="Email"
            name="email"
            value={userData.email}
            auth={auth}
            onChange={handleInputChange}
            type="email"
          />
          <EditableField
            label="Phone"
            name="phone"
            value={userData.phone}
            auth={auth}
            onChange={handleInputChange}
            type="tel"
          />
          <EditableField
            label="GitHub"
            name="github"
            value={userData.github}
            auth={auth}
            onChange={handleInputChange}
            maxLength={25} // Setting a custom max length for GitHub link
          />
          <EditableField
            label="LinkedIn"
            name="linkedin"
            value={userData.linkedin}
            auth={auth}
            onChange={handleInputChange}
            maxLength={25} // Custom max length for LinkedIn link
          />
        </div>

        {/* User Stats Section */}
        <Stats userData={userData} />
      </section>
    </>
  );
};

export default Info;
