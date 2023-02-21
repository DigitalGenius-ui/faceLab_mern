import React from "react";
import "./Navigation.scss";
import FoundationIcon from "@mui/icons-material/Foundation";
import WindowIcon from "@mui/icons-material/Window";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SingleNav from "./SingleNav/SingleNav";
import { FaceLab } from "../../context/Context";

const Navigation = () => {
  const { isAuth } = FaceLab();
  const { username, _id } = isAuth;

  return (
    <>
      <SingleNav icon={<FoundationIcon />} path={"/"} name={"Home"} />
      <SingleNav
        icon={<WindowIcon />}
        path={"/professionals"}
        name={"Find Professionals"}
      />
      <SingleNav
        icon={<NotificationsNoneIcon />}
        path={"/notification"}
        name={"Notification"}
      />
      <SingleNav
        icon={<MailOutlineIcon />}
        path={"/message"}
        name={"Message"}
      />
      <SingleNav
        icon={<PermIdentityIcon />}
        path={`/${_id}/user?username=${username}`}
        name={"Profile"}
      />
      <SingleNav
        icon={<StorefrontIcon />}
        path={"/Promotions"}
        name={"Promotions"}
      />
      <SingleNav
        icon={<PersonIcon />}
        path={"/professional"}
        name={"Professional Profile"}
      />
      <SingleNav
        icon={<CardMembershipIcon />}
        path={"/subscription"}
        name={"Subscription"}
      />
    </>
  );
};

export default Navigation;
