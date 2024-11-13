import React, { useEffect } from 'react';
import MemberForm from '../molecules/MemberForm';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const AddMemberPage = () => {


  return (
    <Container>
      <h1>Add New Member</h1>
      <MemberForm/>
    </Container>
  );
};

export default AddMemberPage;
