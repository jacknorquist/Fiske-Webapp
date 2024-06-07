import React from "react";
import { ReactNode, useState } from "react";
import { CardImg, CardBody, CardTitle, CardText,Card, Button } from "reactstrap";
import styles from '../../css/profile/ProfileCard.module.css';
import EditProfileContainer from "./EditProfileContainer.tsx";
import { useUser } from "../../context/UserContext.tsx";




function ProfileCard({ toggleEditProfileForm}): ReactNode {
  const {user, setUser} = useUser()


  function handleEdit(){

  }

    return (
        <div>
          <Card className="my-2">
            <CardImg
              alt="Card image cap"
              src={user!.header_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`}
              style={{
                height: 180
              }}
              className={styles.headerimage}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">
                {`${user!.first_name} ${user!.last_name}`}
              </CardTitle>
              <CardText>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
              </CardText>
              <CardText>
                <small className="text-muted">
                  Last updated 3 mins ago
                </small>
              </CardText>
            </CardBody>
            <Button onClick={toggleEditProfileForm}>Edit Profile</Button>
          </Card>
        </div>
    );
}

export default ProfileCard;