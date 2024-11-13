import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import BookForm from '../molecules/BookForm';
import apiClient from '../../axiosConfig';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get(`/Book/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load member details.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdateBook = (updatedBook) => {
    apiClient.put(`/Book/${id}`, updatedBook)
      .then(() => {
        navigate('/books');
      })
      .catch((error) => {
        setError("Failed to update member.");
      });
  };
  return (
    <Container>
       <h1>Edit Member</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <BookForm initialValues={book} onSubmit={handleUpdateBook} />
      )}
    </Container>
  );
};

export default EditBookPage;
