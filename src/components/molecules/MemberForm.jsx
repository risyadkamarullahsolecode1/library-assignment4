import React, { useState, useEffect, useNavigate } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CustomButton from '../atoms/Button';
import { toast } from 'react-toastify';
import apiClient from '../../axiosConfig';

const MemberForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [noHp, setnoHp] = useState(initialData.noHp || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData.id) {
      apiClient.get(`/User/${initialData.id}`)
        .then(response => {
          const { name, email, noHp } = response.data;
          setName(name);
          setEmail(email);
          setnoHp(noHp);
        })
        .catch(error => {
          toast.error('Failed to load member data.');
        });
    }
  }, [initialData.id]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = 'Full Name is required';
    if (!email || !emailRegex.test(email)) newErrors.email = 'Invalid email format';

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

    if (initialData.id) {
      apiClient.put(`/User/${initialData.id}`, memberData)
        .then(() => {
          toast.success('Member updated successfully!');
          onSubmit(memberData);
        })
        .catch(() => {
          toast.error('Failed to update member.');
        });
    } else {
      apiClient.post('/User', memberData)
        .then(() => {
          toast.success('Member created successfully!');
          onSubmit(memberData);
        })
        .catch(() => {
          toast.error('Failed to create member.');
        });
    }
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

      <Form.Group controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          value={noHp}
          onChange={(e) => setnoHp(e.target.value)}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      <CustomButton type="submit" variant="primary">
        {initialData.id ? 'Update Member' : 'Save Member'}
      </CustomButton>
    </Form>
  );
};

export default MemberForm;
