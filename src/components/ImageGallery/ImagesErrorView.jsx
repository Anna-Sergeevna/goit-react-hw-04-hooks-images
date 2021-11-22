import errorImage from './error.jpg';
import PropTypes from 'prop-types';

function ImagesErrorView({ message }) {
  return (
    <div className="error" role="alert">
      <img src={errorImage} alt="error" />
      <h2>{message}</h2>
    </div>
  );
}

ImagesErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ImagesErrorView;
