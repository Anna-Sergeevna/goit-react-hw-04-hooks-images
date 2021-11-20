import errorImage from './error.jpg';

function ImagesErrorView({ message }) {
  return (
    <div className="error" role="alert">
      <img src={errorImage} alt="error" />
      <h2>{message}</h2>
    </div>
  );
}

export default ImagesErrorView;
