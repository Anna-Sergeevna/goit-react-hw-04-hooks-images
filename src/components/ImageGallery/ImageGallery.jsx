import { Component } from 'react';
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

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    status: Status.IDLE,
    showModal: false,
    page: 1,
    largeImageURL: '',
    alt: '',
    // error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });

      imagesAPI
        .fetchImages(nextQuery, this.state.page)
        .then(images => {
          if (images.hits.length === 0) {
            throw Error();
          }
          this.setState(({ page }) => {
            return {
              images: images.hits,
              status: Status.RESOLVED,
              page: page + 1,
            };
          });
        })
        .catch(error => this.setState({ status: Status.REJECTED }));
    }
  }

  addImages = () => {
    imagesAPI
      .fetchImages(this.props.query, this.state.page)
      .then(photos => {
        this.setState(({ images, page }) => {
          return {
            images: [...images, ...photos.hits],
            status: Status.RESOLVED,
            page: page + 1,
          };
        });
      })
      .catch(error => this.setState({ status: Status.REJECTED }));
  };

  toggleModal = (datasrc, alt) => {
    this.setState(state => ({
      showModal: !state.showModal,
      largeImageURL: datasrc,
      alt,
    }));
  };

  onGalleryCardClick = e => {
    const url = e.target.getAttribute('datasrc');
    const alt = e.target.getAttribute('alt');
    this.toggleModal(url, alt);
    console.log(url);
  };

  render() {
    const { images, status, largeImageURL, alt, showModal } = this.state;

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
              onClose={this.toggleModal}
              largeImageURL={largeImageURL}
              alt={alt}
            />
          )}
          <ImagesDataView images={images} onClick={this.onGalleryCardClick} />
          <Button onClick={this.addImages} />
        </>
      );
    }
  }
}

export default ImageGallery;
