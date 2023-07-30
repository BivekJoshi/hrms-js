import React from "react";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";
import ProfileDetailCard from "../../../components/cards/ProfileCard/ProfileDetailCard";

const ProfileDetail = () => {
  const { data: loggedUserData } = useGetLoggedInUser();

  return (
    <>
    
    <ProfileDetailCard data={loggedUserData} />
    </>
  );
};

export default ProfileDetail;
