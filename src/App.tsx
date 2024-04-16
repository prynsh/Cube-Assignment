import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { usersAtom, selectedUserAtom } from './atom';
import { UserData } from './types';
import CardComponent from './components/Card';
import PhotoGrid from './components/PhotoGrid';
import axios from 'axios';

interface Photo {
  id: string;
  url: string;
}

const MemoizedPhotoGrid = React.memo(PhotoGrid);

const getRandomUser = async (): Promise<UserData> => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    return {
      name: `${user.name.first} ${user.name.last}`,
      title: user.name.title,
      address: `${user.location.street.name}, ${user.location.city}, ${user.location.country}`,
      highlighted: false
    };
  } catch (error) {
    console.error('Error fetching random user:', error);
    throw error;
  }
};

const fetchRandomPhotos = async (): Promise<Photo[]> => {
  const accessKey = 'dbqW_FreCX0DOA6i2x_JyLsrY91Xzar2MdBr95G3GxA';
  const url = `https://api.unsplash.com/photos/random?count=9&client_id=${accessKey}`;

  try {
    const response = await axios.get(url);
    return response.data.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular
    }));
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

const App: React.FC = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[][]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await Promise.all([...Array(10)].map(() => getRandomUser()));
        setUsers(fetchedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAndSetPhotos = async () => {
      const photoData = await fetchRandomPhotos();
      const grid: Photo[][] = [];
      for (let i = 0; i < 3; i++) {
        grid.push(photoData.slice(i * 3, i * 3 + 3));
      }
      setPhotos(grid);
    };

    fetchAndSetPhotos();

    const intervalId = setInterval(fetchAndSetPhotos, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = (index: number) => {
    const updatedUsers = users.map((user: UserData, i: number) => ({
      ...user,
      highlighted: i === index,
    }));
    setUsers(updatedUsers);
    setSelectedUser(updatedUsers[index]);
  };

  return (
    <div className="grid grid-cols-3 px-28 py-5 h-screen">
      <div className="col-span-1 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-700 scrollbar-track-gray-300 border-slate-300 border-2">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          users.map((user: UserData, index: number) => (
            <CardComponent
              key={index}
              name={user.name}
              title={user.title}
              onClick={() => handleCardClick(index)}
              highlighted={user.highlighted || false}
            />
          ))
        )}
      </div>

      <div className="col-span-2 flex justify-center border-slate-300 border-2">
        {selectedUser && (
          <div>
            <div className='justify-center pt-10 '>
              <div className='flex justify-center'> <h2>{selectedUser.title} {selectedUser.name}</h2></div>
              <div className='flex justify-center'><p>{selectedUser.address}</p></div>
            </div>
            <div className='pt-12'>
              <MemoizedPhotoGrid photos={photos} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;