import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => { 
  const USERS = [ // 추후 서버에서 받아온 데이터로 교체 예정
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
