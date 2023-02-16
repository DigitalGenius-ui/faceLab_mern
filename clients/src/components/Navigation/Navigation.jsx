import React, { useState } from 'react';
import "./Navigation.scss";
import FoundationIcon from '@mui/icons-material/Foundation';
import WindowIcon from '@mui/icons-material/Window';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SingleNav from './SingleNav/SingleNav';
import { FaceLab } from '../../context/Context';

const Navigation = () => {
  const [selected, setSelected] = useState("Home");
  const { isAuth } = FaceLab();
  const { username, _id } = isAuth;

  return (
    <>
      <SingleNav
        icon={<FoundationIcon />}
        path={"/"}
        name={"Home"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<WindowIcon />}
        path={"/"}
        name={"Find Professionals"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<NotificationsNoneIcon />}
        path={"/notification"}
        name={"Notification"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<MailOutlineIcon />}
        path={"/message"}
        name={"Message"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<PermIdentityIcon />}
        path={`/${_id}/user?username=${username}`}
        name={"Profile"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<StorefrontIcon />}
        path={"/Promotions"}
        name={"Promotions"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<PersonIcon />}
        path={"/professional"}
        name={"Professional Profile"}
        selected={selected}
        setSelected={setSelected}
      />
      <SingleNav
        icon={<CardMembershipIcon />}
        path={"/subscription"}
        name={"Subscription"}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}

export default Navigation