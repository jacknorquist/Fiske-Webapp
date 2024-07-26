import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/SearchGroupsForm.module.css'




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


  type FormData = {
    search: string;
  };


/**SearchGroupsForm: Renders form to to search for fish
 *
 *Props:
 * - updateGroups (function): function to update groups rendered in SeachGroupsContainer
 *
 *State:
 * - formData: data for the form
 *
 * Homepage & GroupsContainer -> SearchGroupsContainer -> SearchGroupsForm
 */
function SearchGroupsForm({updateGroups}:{updateGroups: (formData:FormData) => void}): ReactNode {


    const initialState:FormData = {
        search: ""
    };
    const [formData, setFormData] = useState<FormData>(initialState);

    //handle form change and update groups in SearchGroupsContainer
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = evt.target;
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
          updateGroups(formData);
  }


    return (
        <div className={styles.formContainer}>
        <Form className={styles.form}>
        <FormGroup row style={{margin:'auto'}}>
          <Col sm={10} style={{width:'100%'}}>
            <Input
              style={{textAlign:'center'}}
              id="search"
              name="search"
              value={formData.search}
              type="text"
              placeholder="Search For Groups"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
      </Form>
      </div>

    );
}

export default SearchGroupsForm