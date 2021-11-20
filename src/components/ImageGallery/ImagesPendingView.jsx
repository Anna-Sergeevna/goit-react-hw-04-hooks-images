import Loader from 'react-loader-spinner';

function ImagesPendingView() {
  return (
    <div className="loader">
      <Loader
        type="Rings"
        color="#00BFFF"
        height={200}
        width={200}
        timeout={3000}
      />
    </div>
  );
}

export default ImagesPendingView;
