import { useState, useEffect } from 'react';
import ImagesErrorView from './ImagesErrorView';
import ImagesDataView from './ImagesDataView';
import ImagesPendingView from './ImagesPendingView';
import ImagesIdleView from './ImagesIdleView';
import imagesAPI from '../../services/pixabay-api';
import Modal from 'components/Modal';
import Button from 'components/Button';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGallery({ query, onSubmit }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length === 0) return;
    setPage(1);

    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(query)
      .then(images => {
        if (images.hits.length === 0) {
          throw Error();
        }
        setImages(images.hits);
        setPage(prevPage => prevPage + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [query]);

  const addImages = () => {
    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(query, page)
      .then(images => {
        if (images.hits.length === 0) {
          throw Error();
        }
        setImages(prevImages => [...prevImages, ...images.hits]);
        setPage(prevPage => prevPage + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  };

  const toggleModal = (datasrc, alt) => {
    setShowModal(!showModal);
    setLargeImageURL(datasrc);
    setAlt(alt);
  };

  const onGalleryCardClick = e => {
    const url = e.target.getAttribute('datasrc');
    const alt = e.target.getAttribute('alt');
    toggleModal(url, alt);
  };

  if (status === Status.IDLE) {
    return <ImagesIdleView />;
  }

  if (status === Status.PENDING) {
    return <ImagesPendingView />;
  }

  if (status === Status.REJECTED) {
    return <ImagesErrorView message={'Sorry we nothing found for you'} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {showModal && (
          <Modal
            onClose={toggleModal}
            largeImageURL={largeImageURL}
            alt={alt}
          />
        )}
        <ImagesDataView images={images} onClick={onGalleryCardClick} />
        <Button onClick={addImages} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
