import React from "react";
import { ReactNode, useState } from "react";
import { CardImg, CardBody, CardTitle, CardText,Card, Button } from "reactstrap";
import styles from './css/ProfileCard.module.css';
import EditProfileContainer from "./EditProfileContainer.tsx";
import { useUser } from "../../context/UserContext.tsx";




function ProfileCard({ toggleEditProfileForm, profileIsUser, profileUser}): ReactNode {
  const {user, setUser} = useUser()
  function handleEdit(){

  }

  console.log(profileIsUser)

    return (
        <div >
          <Card className={`${styles.profileCard} my-2`}>
            <CardImg
              alt="Card image cap"
              src={profileUser!.header_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`}
              style={{
                height: 180
              }}
              className={styles.headerImage}
              top
              width="100%"
            />
            <img src={user!.profile_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} className={styles.profileImage} alt="" />
            <CardBody className={styles.cardBody}>
              <CardTitle tag="h5">
                <div>
                {`${profileUser!.first_name} ${profileUser!.last_name}`} <span className={styles.userName}><i>{`${profileUser!.username}`}</i></span>
                </div>
              </CardTitle>
              <CardText>
                {`${profileUser!.bio}`}
              </CardText>
              <CardText>
                <small className="text-muted">
                  Last updated 3 mins ago
                </small>
              </CardText>
            </CardBody>
            {profileIsUser ?
            <Button onClick={toggleEditProfileForm}>Edit Profile</Button>
:""}
          </Card>
        </div>
    );
}

export default ProfileCard;