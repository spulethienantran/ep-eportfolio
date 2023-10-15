import React, { useRef, useState } from "react";
import "./PostProjectPage.css";
import axios from "axios";
import StandardDropDown from "../../Components/DropDowns/StandardDropDown/StandardDropDown";
import { API } from "../../Constants";
import NavBar from "../../Components/NavBar/NavBar";
import IconButton from "../../Components/Buttons/IconButton/IconButton";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import StandardTextInputField from "../../Components/InputFields/StandardTextInputField";
import StandardTextAreaInputField from "../../Components/InputFields/StandardTextAreaInputField/StandardTextAreaInputField";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
function PostProjectPage({ userData }) {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [imageBase64, setImageBase64] = useState(null); // State to store the base64 image data
  const [imageOGWidth, setImageOGWidth] = useState(null);
  const [imageOGHeight, setImageOGHeight] = useState(null);
  const [selectedCollaborators, setSelectedCollaborators] = useState(null);

  const maxWidth = 240;
  const maxHeight = 240;

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [projectInformation, setProjectInformation] = useState({
    projectTitle: "",
    collaborators: [],
    projectDescription: "",
  });

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let newWidth = img.width;
          let newHeight = img.height;

          if (img.width > maxWidth || img.height > maxHeight) {
            if (img.width / maxWidth > img.height / maxHeight) {
              newWidth = maxWidth;
              newHeight = (img.height / img.width) * maxWidth;
            } else {
              newHeight = maxHeight;
              newWidth = (img.width / img.height) * maxHeight;
            }
          }
          setImageOGHeight(img.height);
          setImageOGWidth(img.width);
          canvas.width = newWidth;
          canvas.height = newHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const base64Data = canvas.toDataURL("image/jpeg", 0.7); // Use 'image/jpeg' for JPEG format
          setImageBase64(base64Data);
        };
      };

      reader.readAsDataURL(selectedFile);
    }
  };
  const handleCollaboratorsChange = (selectedOptions) => {
    const collaboratorValues = selectedOptions.map((option) => option.value);
    setProjectInformation({
      ...projectInformation,
      collaborators: collaboratorValues,
    });
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const NavigateProfile = (userId) => {
    navigate("/Profile", { state: { userId } });
  };

  const handlePostButtonClick = () => {
    // Prepare the request body
    const requestBody = {
      projectTitle: projectInformation.projectTitle,
      encodePhoto: imageBase64,
      photoOGHeight: imageOGHeight,
      photoOGWidth: imageOGWidth,
      projectOwnerId: userData.userId, // Set the correct owner ID
      projectCollaborators: projectInformation.collaborators, // Set the correct collaborators array
      projectDescription: projectInformation.projectDescription,
    };
    console.log(requestBody);
    // Make the API POST request using Axios
    axios
      .post("/api/project/upload", requestBody, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        // Handle the response from the API, e.g., show a success message or perform further actions
        console.log(requestBody);
        NavigateProfile(userData?.userId);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
        console.error("API request error:", error.response.data.message);
      });
  };

  const HandleInputChange = (propertyName, inputValue) => {
    if (isError) {
      setIsError(false);
    }
    setProjectInformation({
      ...projectInformation,
      [propertyName]: inputValue,
    });
  };

  return (
    <div className="wrapper PostProjectPage-Wrapper">
      <NavBar />
      <div className="PostProjectPage-ContentContainer">
        <div className="PostProjectPage-Content">
          <p className="heading-1 PostProjectPage-Title">Post Your Project</p>
          <div className="PostProjectPage-UploadPhotoContainer">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            {imageBase64 === null ? (
              <IconButton
                icon={faImage}
                className="PostProjectPage-UploadPhoto"
                onClick={openFileDialog}
              />
            ) : (
              <div
                className="PostProjectPage-UploadPhotoContainer"
                onClick={openFileDialog}
              >
                <img
                  src={imageBase64}
                  className="PostProjectPage-UploadedPhoto"
                  alt="Uploaded Project Banner"
                />
              </div>
            )}
          </div>
          {isError && (
            <>
              <p className="paragraph-2 PostProjectPage-ErrorMessage">
                {errorMessage}
              </p>
            </>
          )}
          <div className="PostProjectPage-Form">
            <StandardTextInputField
              placeholder="Project Title"
              onChange={HandleInputChange}
              name="projectTitle"
            />
            <StandardDropDown
              placeholder="Add Collaborators"
              isMulti={true}
              name="collaborators"
              isCollaboratorDropdown={true}
              onCollaboratorsChange={handleCollaboratorsChange}
            />
            <StandardTextAreaInputField
              placeholder="Project Description"
              onChange={HandleInputChange}
              name="projectDescription"
            />
          </div>
          <StandardButton title="Post" onClick={handlePostButtonClick} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});
export default connect(mapStateToProps)(PostProjectPage);
