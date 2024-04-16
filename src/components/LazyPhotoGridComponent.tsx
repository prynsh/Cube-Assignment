import React from 'react';

interface Photo {
    id: string;
    url: string;
}

interface Props {
    photos: Photo[][];
}

const PhotoGridContent: React.FC<Props> = React.memo(({ photos }) => {
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
});

export default PhotoGridContent;
