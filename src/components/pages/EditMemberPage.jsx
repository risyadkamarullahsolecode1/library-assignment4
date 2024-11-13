import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberForm from '../molecules/MemberForm';
import apiClient from '../../axiosConfig';

const EditMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the member details from the API by ID
    apiClient.get(`/User/${id}`)
      .then((response) => {
        setMember(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load member details.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdateMember = (updatedMember) => {
    apiClient.put(`/User/${id}`, updatedMember)
      .then(() => {
        navigate('/members');
      })
      .catch((error) => {
        setError("Failed to update member.");
      });
  };

  return (
    <div>
      <h1>Edit Member</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MemberForm initialValues={member} onSubmit={handleUpdateMember} />
      )}
    </div>
  );
};

export default EditMemberPage;
