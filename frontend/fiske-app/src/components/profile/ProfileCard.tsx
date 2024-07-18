import React from "react";
import { ReactNode, useState } from "react";
import { CardImg, CardBody, CardTitle, CardText,Card, Button } from "reactstrap";
import styles from './css/ProfileCard.module.css';
import EditProfileContainer from "./EditProfileContainer.tsx";
import { useUser } from "../../context/UserContext.tsx";




function ProfileCard({ profileIsUser, profileUser, updateProfileUser, toggleCreateGroup}): ReactNode {
  const {user, setUser} = useUser()
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  function toggleEditProfile(){
    setIsEditProfileOpen(!isEditProfileOpen)
  }


    return (
        <div  >
          <Card className={styles.profileCard}>
            <CardImg
              alt="Card image cap"
              src={profileUser.user!.header_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`}
              style={{
                height: 180
              }}
              className={styles.headerImage}
              top
              width="100%"
            />
            <img src={profileUser.user!.profile_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} className={styles.profileImage} alt="" />
            <CardBody className={styles.cardBody}>
              <CardTitle tag="h5">
                <div>
                {`${profileUser.user!.first_name} ${profileUser.user!.last_name}`} <span className={styles.userName}><i>{`${profileUser.user!.username}`}</i></span><span className={styles.fishboardPoints}><i className='fas fa-fish'><i style={{marginLeft:'.5rem'}}>{profileUser.user.fishboard_points}</i></i></span> {profileIsUser ?
           <span className={styles.userProfileButtons}><i onClick={toggleCreateGroup} className={styles.createGroupButton}>+ Group</i><i onClick={toggleEditProfile} className={`${styles.editButton} bi bi-pen`}></i></span>
:""}
                </div>
              </CardTitle>
              <CardText>
                {`${profileUser.user!.bio}`}
              </CardText>
            </CardBody>
          </Card>
          {isEditProfileOpen ? <EditProfileContainer updateProfileUser={updateProfileUser}  toggleEditProfileForm={toggleEditProfile}/> :""}
        </div>
    );
}

export default ProfileCard;