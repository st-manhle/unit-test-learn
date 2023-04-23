import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';
import UserList from './pages/users/containers/UserList';
import Home from './pages/home/containers/Home';
import UserDetail from './pages/users/containers/UserDetail';

const App = () => {
  return (
    <div>
    <Link to="/">Home</Link>
    <Link role='users-list-navigator' to="/users">Users</Link>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  </div>
  );
};

export default App;
