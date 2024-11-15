import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../atoms/Button';

const MemberForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [noHp, setnoHp] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Populate form fields when initialData is updated
    if (initialData.id) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setnoHp(initialData.noHp || '');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = 'Full Name is required.';
    if (!email || !emailRegex.test(email)) newErrors.email = 'Invalid email format.';
    if (!noHp) newErrors.noHp = 'Phone Number is required.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const memberData = { name, email, noHp };

    // Call the parent onSubmit with the member data
    onSubmit(memberData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="noHp">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          value={noHp}
          onChange={(e) => setnoHp(e.target.value)}
          isInvalid={!!errors.noHp}
        />
        <Form.Control.Feedback type="invalid">{errors.noHp}</Form.Control.Feedback>
      </Form.Group>

      <CustomButton type="submit" variant="primary">
        {initialData.id ? 'Update Member' : 'Save Member'}
      </CustomButton>
    </Form>
  );
};

export default MemberForm;
