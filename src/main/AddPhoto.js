import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import ButtonComponent from "./Components/ButtonComponent";
import PageTemplateComponent from "./Components/PageTemplateComponent";
import LeftSideNavBarComponent from "./Components/LeftSideNavBarComponent";
import CenterComponent from "./Components/CenterComponent";
import RightSideComponent from "./Components/RightSideComponent ";
import "../css/app.css";
import {ProgressBar} from "react-bootstrap";
import 'axios-progress-bar/dist/nprogress.css'

const AddPhoto = () => {

  const [description, setDescription] = useState('')
  const [photoSrc, setPhotoSrc] = useState('')
  const [photoData, setPhotoData] = useState('')
  const [redirectToMyProfile, setRedirectToMyProfile] = useState('')
  const [progress, setProgress] = useState(0)


  const photoSourceSetter = (event) => {
    setPhotoSrc(event.target.result)
  }

  const handlePhotoUploadChange = (event) => {
    setPhotoData(event.target.files[0]);
    let input = event.target;

    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = photoSourceSetter;
      reader.readAsDataURL(input.files[0]);
    }
  }


  const handleSubmit = (event) => {
    const formData = new FormData();

    formData.append('photo', photoData);
    formData.append('description', description);

    const config = {
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted)
      }
    };

    axios.post("api/photo/", formData, config)
      .then(response => {
        setRedirectToMyProfile(true);
      })
      .catch((error) => {
        console.log(error)
        alert('Ups! Something went wrong, try again later.')
      })
    event.preventDefault();
  }


  if (redirectToMyProfile) {
    return <Redirect to="/myprofile"/>;
  }

  const renderProgress = (progress) => {
    const now = progress;
    const progressInstance = <ProgressBar now={now} label={`${now}%`}/>;
    return (progressInstance);
  }

  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent tabToHighlight="addphoto"/>
      <CenterComponent>

        <form onSubmit={handleSubmit}>
          {photoData ?
            (<div className="row">
              <div className="col-6">
                <h4>Choose photo</h4>
                <div className="image-container">
                  <img
                    src={photoSrc}
                    alt="your added content"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-sm-4 col-md-4 col-xs-12">
                <h4>Add description</h4>
                <textarea
                  placeholder="Type some description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="add-photo-button-wrapper">
                  <ButtonComponent
                    disabled={progress ? "true" : ""}
                    className="btn-block"
                    id="add-photo-button"
                    type="button "
                  >Add photo</ButtonComponent>
                </div>
                {renderProgress(progress)}
              </div>
            </div>)
            :
            (
              <div className="col-xl-6 col-lg-6 col-sm-6 col-md-6 col-xs-12">
                <h4>Choose photo</h4>
                <label htmlFor="file" className="br_dropzone">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handlePhotoUploadChange}
                    required/>
                  <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    placeholder="Drop files to upload (or click)"
                    readOnly/>
                </label>
              </div>
            )
          }
        </form>
      </CenterComponent>
      <RightSideComponent/>
    </PageTemplateComponent>
  );
}

export default AddPhoto;
