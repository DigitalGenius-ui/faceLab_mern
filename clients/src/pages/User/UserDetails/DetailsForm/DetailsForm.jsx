import React, { useState } from "react";
import "./DetailsForm.scss";
import { MenuItem, TextField, Button } from "@mui/material";
import { FaceLab } from "../../../../context/Context";
import { useMutation, useQueryClient } from "react-query";
import { updateProfileDetails } from "../../../../fetchHook/userFetch";
import { useNavigate } from "react-router-dom";

const Input = ({ label, type, value, onChange }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      label={label}
      type={type}
      size="small"
    />
  );
};

const DetailsForm = () => {
  const { updateProfile, setUpdateProfile } = FaceLab();
  const [profileImg, setProfileImg] = useState("");

  const [profileBanner, setProfileBanner] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUpdateProfile({ ...updateProfile, status: event.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(updateProfileDetails, {
    onSuccess: () => queryClient.invalidateQueries("singleUser"),
  });

  if (isLoading) return "Loading...";
  if (isError) return "Something Went Wrong!!!";

  const submit = (e) => {
    const data = {
      updateProfile,
      profileImg,
      profileBanner,
    };
    e.preventDefault();
    mutate(data);
    navigate(-1);
  };

  return (
    <section className="details_form">
      <form className="form white_bg" onSubmit={submit}>
        <h1 className="title">Edit Your Profile Details</h1>

        <div className="inputs">
          <Input
            label="Full Name"
            type="text"
            value={updateProfile.username ? updateProfile.username : ""}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, username: e.target.value })
            }
          />
          <Input
            value={updateProfile.email ? updateProfile.email : ""}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, email: e.target.value })
            }
            label="Your Email"
            type="email"
          />
        </div>

        <div className="inputs">
          <Input
            value={updateProfile.position ? updateProfile.position : ""}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, position: e.target.value })
            }
            label="Position"
            type="text"
          />
          <Input
            value={updateProfile.born ? updateProfile.born : ""}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, born: e.target.value })
            }
            type="date"
          />
        </div>

        <div className="inputs">
          <TextField
            select
            label="Status"
            value={updateProfile.status}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="In A Relationship">In A Relationship</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorce">Divorce</MenuItem>
            <MenuItem value="Its Complicated">Its Complicated</MenuItem>
          </TextField>

          <Input
            value={updateProfile.location ? updateProfile.location : ""}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, location: e.target.value })
            }
            label="City / Country"
            type="text"
          />
        </div>

        <div className="inputs">
          <Input
            value={updateProfile.work ? updateProfile.work : ""}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, work: e.target.value })
            }
            label="Work At"
            type="text"
          />
        </div>

        <div className="files">
          <label>Profile Image</label>
          <Input onChange={(e) => setProfileImg(e.target.files[0])} type="file" />
        </div>

        <div className="files">
          <label>Banner Image</label>
          <Input
            onChange={(e) => setProfileBanner(e.target.files[0])}
            type="file"
          />
        </div>

        <div className="edit_button">
          <Button variant="contained" type="submit">
            Update
          </Button>
        </div>
      </form>
    </section>
  );
};

export default DetailsForm;
