import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreateGroupForm.module.css'

import {
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    FormText,
    Button,
    CloseButton
  } from 'reactstrap';
import { GroupTypeWithFishboard } from "../../types";


  type FormData = {
    name: string;
    fish_species: string;
    area: string;
    description:string;
    header_image_url?: string;
  };
  type EditGroupFormProps = {
    editGroup: (FormData:FormData)=> void;
    toggleEditGroup: ()=> void;
    group:GroupTypeWithFishboard;
  }

/**EditGroupForm: renders form to edit group
 *
 *Props:
 * - editGroup (function): edits group
 * - toggleEditGroup (function): toogles visibility of EditGroupContainer
 * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 *
 *State:
 * -formData: data for the form
 *
 * ProfileContainer -> EditeGroupContainer -> EditGroupForm
 */

function EditGroupForm({editGroup, toggleEditGroup, group}:EditGroupFormProps): ReactNode {
  const initialState:FormData = {
    name:group.group.name,
    fish_species: group.group.fish_species,
    area:group.group.area,
    description:group?.group.description,
    header_image_url:group?.group?.header_image_url || undefined
  };

    const [formData, setFormData] = useState(initialState);

    //handle form change
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value, type, files } = evt.target;
      if (type === "file") {
        if(files && files.length>0){
          setFormData(fData => ({
              ...fData,
              [name]: files[0]
          }));
        }
      } else {
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
      }
  }

    //handle for submit
    function handleSave(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        editGroup(formData);
        setFormData(initialState);

    }

    return (
        <div>
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`} >
          <CloseButton onClick={toggleEditGroup}/>
          <h1>Edit Group</h1>
        <FormGroup row>
          <Label
            for="name"
            sm={2}
          >
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="name"
              name="name"
              placeholder={formData.name}
              value={formData.name}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="description"
            sm={2}
          >
            Description
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              placeholder={formData.description}
              value={formData.description}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="fish_species"
            sm={2}
          >
            Fish Species
          </Label>
          <Col sm={10}>
            <Input
              id="fish_species"
              name="fish_species"
              placeholder={formData.fish_species}
              value={formData.fish_species}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="area"
            sm={2}
          >
            Area
          </Label>
          <Col sm={10}>
            <Input
              id="area"
              name="area"
              placeholder={formData.area}
              value={formData.area}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="header_image"
            sm={2}
          >
            Header Image
          </Label>
          <Col sm={10}>
            <Input
              id="header_image"
              name="header_image"
              type="file"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>

        <Button>
        Submit
      </Button>

      </Form>
      </div>

    );
}

export default EditGroupForm