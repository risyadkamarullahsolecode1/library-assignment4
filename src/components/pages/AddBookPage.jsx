import React from 'react';
import { Container } from 'react-bootstrap';
import BookForm from '../molecules/BookForm';

const AddBookPage = () => {
    return (
      <Container>
        <h1>Add New Book</h1>
        <BookForm />
      </Container>
    );
  };

export default AddBookPage;
