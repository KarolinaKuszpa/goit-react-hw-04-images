import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          alt={image.tags}
          onClick={() => openModal(image.largeImageURL, image.tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
