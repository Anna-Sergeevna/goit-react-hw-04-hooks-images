import React from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ id, webformatURL, largeImageURL, tags, onClick }) {
  return (
    <li key={id} className="imageGalleryItem">
      <img
        className="imageGalleryItem-image"
        src={webformatURL}
        datasrc={largeImageURL}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
}

// const ImageGalleryItem = ({
//   id,
//   webformatURL,
//   largeImageURL,
//   tags,
//   onClick,
// }) => {
//   return (
//     <li key={id} className="imageGalleryItem">
//       <img
//         className="imageGalleryItem-image"
//         src={webformatURL}
//         datasrc={largeImageURL}
//         alt={tags}
//         onClick={onClick}
//       />
//     </li>
//   );
// };

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
