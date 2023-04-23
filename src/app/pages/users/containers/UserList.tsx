import { handleRemoveItems } from '@app/core/helpers/array';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const GET_USERS_API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isFeching, setFetching] = useState(false);
  const [isFailed, setFailed] = useState(false);

  useEffect(() => {
    setFetching(true);
    axios.get(GET_USERS_API_ENDPOINT)
    .then((response) => {
      setUsers(response.data);
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setFetching(false));
  }, []);

  const onDeleteUser = useCallback((id: number) => {
    setUsers((pre) => handleRemoveItems(pre, [id]));
  }, []);

  return (
    <div className="list-page">
      {isFeching ?
        <p>Fetching Users</p>
        :
        null
      }
      {
        users.length ? <List data={users} onDelete={onDeleteUser} /> : <p>Users Not Found</p>
      }
      {
        isFailed ? <p role="alert">Opps! Something went wrong!</p> : null
      }
    </div>
  );
};

export default UserList;

export type User = {
  id: number;
  name: string;
}

type Props = {
  data: User[];
  onDelete: (id) => void;
}

const List = (props: Props) => {
  const { data, onDelete } = props;
  return (
    <ul className='users-list' data-testid="users-list">
      {
        data.map(item =>
          <li key={item.id}>
            <Link data-testid={`${item.id}`} to={`${item.id}`}>{item.name}</Link>
            <button data-testid="delete-btn" onClick={() => {
              onDelete(item.id);
            }}>Delete</button>
          </li>
        )
      }
    </ul>
  );
};
