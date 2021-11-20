const URL = {
  BASE_URL: `https://pixabay.com/api`,
  IMAGE_TYPE: `photo`,
  ORIENTATION: `horizontal`,
  PER_PAGE: 12,
  KEY: `23640925-62666e78aedb939489768c224`,
};

function fetchImages(query, page) {
  return fetch(
    `${URL.BASE_URL}/?q=${query}&page=${page}&key=${URL.KEY}&image_type=${URL.IMAGE_TYPE}&orientation=${URL.ORIENTATION}&per_page=${URL.PER_PAGE}`,
  ).then(r => r.json());
}

const api = {
  fetchImages,
};

export default api;
