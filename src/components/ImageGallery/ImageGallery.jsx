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
    setShowModal(prevModal => !prevModal);
    setLargeImageURL(datasrc);
    setAlt(alt);
  };

  const onGalleryCardClick = e => {
    const url = e.target.getAttribute('datasrc');
    const alt = e.target.getAttribute('alt');
    toggleModal(url, alt);
    console.log(url);
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

// class ImageGallery extends Component {
//   state = {
//     images: [],
//     status: Status.IDLE,
//     showModal: false,
//     page: 1,
//     largeImageURL: '',
//     alt: '',
//     // error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const nextQuery = this.props.query;

//     if (prevQuery !== nextQuery) {
//       this.setState({ status: Status.PENDING });

//       imagesAPI
//         .fetchImages(nextQuery, this.state.page)
//         .then(images => {
//           if (images.hits.length === 0) {
//             throw Error();
//           }
//           this.setState(({ page }) => {
//             return {
//               images: images.hits,
//               status: Status.RESOLVED,
//               page: page + 1,
//             };
//           });
//         })
//         .catch(error => this.setState({ status: Status.REJECTED }));
//     }
//   }

//   addImages = () => {
//     imagesAPI
//       .fetchImages(this.props.query, this.state.page)
//       .then(photos => {
//         this.setState(({ images, page }) => {
//           return {
//             images: [...images, ...photos.hits],
//             status: Status.RESOLVED,
//             page: page + 1,
//           };
//         });
//       })
//       .catch(error => this.setState({ status: Status.REJECTED }));
//   };

//   toggleModal = (datasrc, alt) => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//       largeImageURL: datasrc,
//       alt,
//     }));
//   };

//   onGalleryCardClick = e => {
//     const url = e.target.getAttribute('datasrc');
//     const alt = e.target.getAttribute('alt');
//     this.toggleModal(url, alt);
//     console.log(url);
//   };

//   render() {
//     const { images, status, largeImageURL, alt, showModal } = this.state;

//     if (status === Status.IDLE) {
//       return <ImagesIdleView />;
//     }

//     if (status === Status.PENDING) {
//       return <ImagesPendingView />;
//     }

//     if (status === Status.REJECTED) {
//       return <ImagesErrorView message={'Sorry we nothing found for you'} />;
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <>
//           {showModal && (
//             <Modal
//               onClose={this.toggleModal}
//               largeImageURL={largeImageURL}
//               alt={alt}
//             />
//           )}
//           <ImagesDataView images={images} onClick={this.onGalleryCardClick} />
//           <Button onClick={this.addImages} />
//         </>
//       );
//     }
//   }
// }

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
