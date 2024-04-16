import React, { Suspense } from 'react';
import PhotoGridContent from './LazyPhotoGridComponent';
interface Photo {
    id: string;
    url: string;
}

interface Props {
    photos: Photo[][];
}

const PhotoGrid: React.FC<Props> = ({ photos }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PhotoGridContent photos={photos} />
        </Suspense>
    );
};

export default PhotoGrid;
