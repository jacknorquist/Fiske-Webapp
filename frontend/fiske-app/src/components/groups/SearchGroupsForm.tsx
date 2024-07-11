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

function SearchGroupsForm({updateGroups}): ReactNode {


    const initialState = {
        search: ""
    };
    const [formData, setFormData] = useState(initialState);


    function handleChange(evt) {
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