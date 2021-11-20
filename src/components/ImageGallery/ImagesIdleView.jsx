import searchImage from './search.png';

function ImagesIdleView() {
  return (
    <div role="alert" className="searchImage">
      <img src={searchImage} alt="Search" width="200" />
    </div>
  );
}

export default ImagesIdleView;
