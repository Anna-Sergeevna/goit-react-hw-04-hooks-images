import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

function ImagesDataView({ images, onClick }) {
  return (
    <ul className="imageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}
ImagesDataView.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImagesDataView;
