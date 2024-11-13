import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../atoms/InputField';
import CustomButton from '../atoms/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import apiClient from '../../axiosConfig';

const BookForm = ({ onSubmit, initialData = {} }) => {
    const [isbn, setIsbn] = useState(initialData.name || '');
    const [title, setTitle] = useState(initialData.title || '');
    const [author, setAuthor] = useState(initialData.author || '');
    const [publicationYear, setPublicationYear] = useState(initialData.publicationYear || '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData.id) {
          apiClient.get(`/Book/${initialData.id}`)
            .then(response => {
              const { isbn, title, author, publicationYear } = response.data;
              setIsbn(isbn);
              setTitle(title);
              setAuthor(author);
              setPublicationYear(publicationYear)
            })
            .catch(error => {
              toast.error('Failed to load book data.');
            });
        }
      }, [initialData.id]);

    const validate = () => {
        const newErrors = {};
        if (!book.isbn) newErrors.isbn = "ISBN is required.";
        if (!book.title || book.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
        if (!book.author) newErrors.author = "Author is required.";
        if (!book.publicationYear || book.publicationYear > new Date().getFullYear()) {
            newErrors.publicationYear = "Invalid publication year.";
        }
        return newErrors;
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newErrors = validate();
    //     if (Object.keys(newErrors).length > 0) {
    //         setErrors(newErrors); // Set errors if validation fails
    //     } else {
    //         const request = id 
    //             ? apiClient.put(`/Book/${id}`, book)  // Update book if id exists
    //             : apiClient.post('/Book', book);  // Add new book if no id

    //         request
    //             .then(() => {
    //                 toast.success("Book saved successfully!");
    //                 navigate('/books'); // Navigate back to book list after successful save
    //             })
    //             .catch(() => toast.error("Error saving book."));
    //     }
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
    
        const bookData = { isbn, title, author, publicationYear };
    
        if (initialData.id) {
          apiClient.put(`/Book/${initialData.id}`, bookData)
            .then(() => {
              toast.success('Book updated successfully!');
              onSubmit(bookData);
            })
            .catch(() => {
              toast.error('Failed to update member.');
            });
        } else {
          apiClient.post('/User', bookData)
            .then(() => {
              toast.success('Member created successfully!');
              onSubmit(bookData);
            })
            .catch(() => {
              toast.error('Failed to create member.');
            });
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({ ...prevBook, [name]: value })); // Update state on input change
    };

    return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="isbn">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          isInvalid={!!errors.isbn}
        />
        <Form.Control.Feedback type="invalid">{errors.isbn}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          isInvalid={!!errors.author}
        />
        <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Publication Year</Form.Label>
        <Form.Control
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          isInvalid={!!errors.publicationYear}
        />
        <Form.Control.Feedback type="invalid">{errors.publicationYear}</Form.Control.Feedback>
      </Form.Group>

      <CustomButton type="submit" variant="primary">
        {initialData.id ? 'Update Book' : 'Save Book'}
      </CustomButton>
      <ToastContainer />
    </Form>
    );
};

export default BookForm;
