// import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button type="button" className="button" onClick={onClick}>
      Load more
    </button>
  );
}

// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

export default Button;
