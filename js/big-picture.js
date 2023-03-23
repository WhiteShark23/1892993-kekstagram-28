import { initBigPictureComments, destroyBigPictureComments } from './big-picture-comments.js';
import { isEscapeKey } from './utils.js';

const body = document.querySelector ('body');
const bigPictureContainer = document.querySelector('.js-big-picture');
const bigPictureImgElement = bigPictureContainer.querySelector('.js-big-picture-img img');
const likesCountPicture = document.querySelector('.js-likes-count');
const buttonCancelPicture = document.querySelector('.js-button-cancel');
const descriptionPictureContainer = document.querySelector('.js-social__caption');

const onDocumentEscKeydown = (evt) => {
  body.classList.remove('modal-open');

  if (isEscapeKey(evt)) {
    destroyBigPicture();
  }
};

const renderBigPictureData = ({url}) => {
  bigPictureImgElement.src = url;
};

const addEventsHandlers = () => {
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const removeEventsHandlers = () => {
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function destroyBigPicture() {
  bigPictureContainer.classList.add('hidden');
  destroyBigPictureComments();
  removeEventsHandlers();
}

const getLikesCount = (data) => {
  likesCountPicture.innerHTML = '';
  likesCountPicture.append(data);
};

const closeBigPictureButton = () => {
  buttonCancelPicture.onclick = () => {
    bigPictureContainer.classList.add('hidden');
    body.classList.remove('modal-open');
  };
};

const addDescriptionPicture = (data) => {
  descriptionPictureContainer.innerHTML = '';
  descriptionPictureContainer.append(data);
};

export const initBigPicture = (data) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  renderBigPictureData(data);
  initBigPictureComments(data.comments);
  addEventsHandlers();
  getLikesCount(data.likes);
  closeBigPictureButton();
  addDescriptionPicture(data.description);
};