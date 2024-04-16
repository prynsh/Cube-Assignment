import axios from 'axios';

// Dummy function to simulate fetching customer photos
export const fetchCustomerPhotos = async (): Promise<string[]> => {
  // Example API endpoint for fetching photos
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=9');
  const photosData = response.data;
  const photos = photosData.map((photo: any) => photo.thumbnailUrl);
  return photos;
};
