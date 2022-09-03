import React from 'react';
import UserResults from '../components/Users/UserResults';
import UserSearch from '../components/Users/UserSearch';

function Home() {
  return (
    <div>
      <UserSearch />
      <UserResults />
    </div>
  )
}

export default Home
