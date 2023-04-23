import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GET_USERS_API_ENDPOINT, User } from './UserList';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios.get(`${GET_USERS_API_ENDPOINT}/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);
  return (
    <div role="detail-page" className="detail-page">
      {user ? <h1 role='user-name'>{user.name}</h1> : <p>User not found</p>}
    </div>
  );
};

export default UserDetail;
