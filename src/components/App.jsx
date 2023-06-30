import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import CustomLoader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import styles from './App.module.css';

const API_KEY = '36135104-b4eff6e01978aa2902705eb38';

const fetchImages = async (keyword, page = 1) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (selectedImage) {
      console.log('Wybrany obraz:', selectedImage);
    }
  }, [selectedImage]);

  const searchImages = async keyword => {
    setLoading(true);
    try {
      const images = await fetchImages(keyword);
      setImages(images);
      setCurrentPage(1);
      setSearchKeyword(keyword);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania obrazów:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newImages = await fetchImages(searchKeyword, nextPage);
      setImages(prevImages => [...prevImages, ...newImages]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Błąd podczas ładowania kolejnych obrazów:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imageUrl, alt) => {
    setSelectedImage({ imageUrl, alt });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={searchImages} />

      {loading ? (
        <CustomLoader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {images.length > 0 && !loading && (
        <Button onClick={loadMoreImages}>Load more</Button>
      )}

      {selectedImage && (
        <Modal
          imageUrl={selectedImage.imageUrl}
          alt={selectedImage.alt}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
