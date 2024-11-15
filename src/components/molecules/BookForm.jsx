import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../atoms/Button';

const BookForm = ({ onSubmit, initialData = {} }) => {
    const [isbn, setIsbn] = useState(initialData.isbn || '');
    const [title, setTitle] = useState(initialData.title || '');
    const [author, setAuthor] = useState(initialData.author || '');
    const [publicationYear, setPublicationYear] = useState(initialData.publicationYear || '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData.id) {
            setIsbn(initialData.isbn || '');
            setTitle(initialData.title || '');
            setAuthor(initialData.author || '');
            setPublicationYear(initialData.publicationYear || '');
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!isbn) newErrors.isbn = 'ISBN is required.';
        if (!title || title.length < 3) newErrors.title = 'Title must be at least 3 characters.';
        if (!author) newErrors.author = 'Author is required.';
        if (!publicationYear || publicationYear > new Date().getFullYear()) {
            newErrors.publicationYear = 'Invalid publication year.';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const bookData = { isbn, title, author, publicationYear };

        onSubmit(bookData); // Trigger the onSubmit function passed from the parent
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

            <Form.Group controlId="publicationYear">
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
        </Form>
    );
};

export default BookForm;
