// App.tsx
import React, { useState, useEffect } from 'react';
import CardComponent from './components/Card';
import PhotoGrid from './components/PhotoGrid';

interface UserData {
  name: string;
  title: string;
  address: string;
  highlighted: boolean;
}

const getRandomUser = async (): Promise<UserData> => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    return {
      name: `${user.name.first} ${user.name.last}`,
      title: user.name.title,
      address: `${user.location.street.name}, ${user.location.city}, ${user.location.country}`,
      highlighted: true
    };
  } catch (error) {
    console.error('Error fetching random user:', error);
    throw error;
  }
};

const App: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await Promise.all([...Array(20)].map(() => getRandomUser()));
        setUsers(fetchedUsers.map(user => ({ ...user, highlighted: false })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = (index: number) => {
    const selected = users[index];
    setSelectedUser(selected);
    const updatedUsers = users.map((user, i) => ({
      ...user,
      highlighted: i === index ? !user.highlighted : false,
    }));
    setUsers(updatedUsers);
  };

  return (
    <div className="grid grid-cols-3 px-28 py-5 h-screen">
      <div className="col-span-1 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 border-slate-300 border-2">
  {users.map((user, index) => (
    <CardComponent
      key={index}
      name={user.name}
      title={user.title}
      onClick={() => handleCardClick(index)}
      highlighted={user.highlighted || false}
    />
  ))}
</div>

      
      <div className="col-span-2 flex justify-center border-slate-300 border-2">
        {selectedUser && (
          <div>
            <div className='justify-center pt-10 '>
              <div className='flex justify-center'> <h2>{selectedUser.title} {selectedUser.name}</h2></div>
              {/* <div className='flex justify-center'><h2>{selectedUser.title}</h2></div> */}
              <div className='flex justify-center'><p>{selectedUser.address}</p></div>
            </div>
            <div className='pt-12'>
              <PhotoGrid />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
