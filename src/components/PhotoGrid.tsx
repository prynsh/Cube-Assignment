import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Photo {
    id: string;
    url: string;
}

const PhotoGrid: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[][]>([]);

    useEffect(() => {
        const fetchRandomPhotos = async (): Promise<void> => {
            const accessKey = 'mvlbccA2la3DPiZvGX32caPLE1k1gXDbhZws41uEF10';
            const url = `https://api.unsplash.com/photos/random?count=9&client_id=${accessKey}`;

            try {
                const response = await axios.get(url);
                const photoData: Photo[] = response.data.map((photo: any) => ({
                    id: photo.id,
                    url: photo.urls.regular
                }));

                const grid: Photo[][] = [];
                for (let i = 0; i < 3; i++) {
                    grid.push(photoData.slice(i * 3, i * 3 + 3));
                }
                setPhotos(grid);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchRandomPhotos();

        const intervalId = setInterval(fetchRandomPhotos, 10000); 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-wrap px-20">
            {photos.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap w-full">
                    {row.map((photo) => (
                        <div key={photo.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-1">
                            <img src={photo.url} alt={`Photo ${photo.id}`} className="w-44 h-40 border rounded-lg" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;
