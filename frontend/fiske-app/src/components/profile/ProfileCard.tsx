import React from "react";
import { ReactNode, useState } from "react";
import { CardImg, CardBody, CardTitle, CardText,Card, Button } from "reactstrap";
import styles from './css/ProfileCard.module.css';
import EditProfileContainer from "./EditProfileContainer.tsx";
import { ProfileUserType } from "../../types.ts";

type FormData ={
  username:string;
  first_name:string;
  last_name:string;
  bio: string;
  profile_image?: File;
  header_image?: File
}
type ProfileCardProps = {
  profileIsUser:boolean;
  profileUser: ProfileUserType;
  updateProfileUser:() =>void;
  toggleCreateGroup:()=>void;
};


/**ProfileCard: renders profile information
 *
 *Props:
 * - profileIsUser (boolean) : if true, allow user to edit profile and create group
 * - profileUser (obj): object containing data of the user thats profile is being viewed like...
 *    {
 *      user:
 *          {
 *           header_image_url:'link.com',
 *           profile_image_url:'link.com',
 *           first_name:'bob',
 *           last_name:'jerry',
 *           bio:'I like to fish',
 *           username: 'walleyeguy',
 *           fishboardboard_points:5,
 *           }
 *    fishboard:{
 *            fish:[fish(obj), fish(obj)],
 *            id: 2,
 *                }
 *    }
 * - updateProfileUser (function): function that updates the profile being viewed in the case of editing the profile
 * - toggleCreateGroup (function): toggles CreateGroupContainer visibility
 *
 *State:
 * - isEditProfileOpen (boolean): if true, EditProfileContainer is rendered
 *
 * ProfileContainer -> ProfileCard-> EditProfileContainer
 */
function ProfileCard({ profileIsUser, profileUser, updateProfileUser, toggleCreateGroup}:ProfileCardProps): ReactNode {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false)

  //toggle isEditProfileOpen
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
                  {`${profileUser.user!.first_name} ${profileUser.user!.last_name}`}
                  <span className={styles.userName}>
                    <i>{`${profileUser.user!.username}`}</i>
                  </span>
                  <span className={styles.fishboardPoints}>
                    <i className='fas fa-fish'><i style={{marginLeft:'.5rem'}}>{profileUser.user.fishboard_points}</i></i>
                  </span>
                  {profileIsUser ?
                  <span className={styles.userProfileButtons}>
                    <i onClick={toggleCreateGroup} className={styles.createGroupButton}>+ Group</i>
                    <i onClick={toggleEditProfile} className={`${styles.editButton} bi bi-pen`}></i>
                  </span>
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