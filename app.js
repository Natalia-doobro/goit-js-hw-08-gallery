const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// добавляем разметку фото в галерею
const listGallery = document.querySelector('.js-gallery'); //ссылка на <ul class="gallery js-gallery"></ul>
const modal = document.querySelector('.lightbox'); //ссылка на <div class="lightbox js-lightbox">
const modalImage = document.querySelector('.lightbox__image');//ссылка на <img class="lightbox__image" src="" alt="" />
const modalBtn = document.querySelector('.lightbox__button');
const modalOverlay = document.querySelector('.lightbox__overlay');

const markup = (acc, { preview, original, description }) => acc + `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
//калбек функцыя которая генерирует стрроку , и переносит значение елементов из galleryItems 
const photo = galleryItems.reduce(markup, '');//переменая хранит полученую строку от  калбек функцыи

listGallery.insertAdjacentHTML('beforeend', photo);//добавляем с помощью шаблонной строки сгенерированую строку в переменной photo 

//ДЕЛЕГИРОВАНИЕ

function onModalOpen(evt) {
  evt.preventDefault();//Отмена действий по умолчанию
  if (evt.target.nodeName !== 'IMG') { //зашита от случайного нажатия
    return;
  }
  
  //РАБОТА С МОДАЛЬНЫМ ОКНОМ
  modal.classList.add('is-open');//при клике добавляем класс is-open на див lightbox
  modalImage.src = evt.target.dataset.source; //меняем значение атрибута на ту сылку фото на которое нажали
  modalImage.alt = evt.target.alt; //меняем значение атрибута alt, на alt фото на которое нажали
  window.addEventListener('keydown', onEscKeyClick);// слушатель отслеживает действия на клавиатуре

  //------------------------------------------------------------------------------
  //window.addEventListener('keydown', onScrolling);// слушатель отслеживает действия на клавиатуре
};

function onModalClose(evt) {
  // если без кнопки добавить слушателя на модальное окно и поставить зашиту
  // if (evt.target.nodeName === 'IMG') { //зашита от случайного нажатия 
  //   return;
  // }
  
  modal.classList.remove('is-open');//при клике удаляем класс is-open на диве lightbox
  modalImage.src = '';//очисчаем значение атрибута
  modalImage.alt = '';//очисчаем значение атрибута
  window.removeEventListener('keydown', onEscKeyClick);// снимаем слушателя

  //------------------------------------------------------------------------------
  //window.removeEventListener('keydown', onScrolling);// снимаем слушателя
};

//закрытие модального окна при нажатии клавиши Esc
function onEscKeyClick(evt) {
  console.log(evt.code);
  if (evt.code !== "Escape") {
    return;
  };
  onModalClose();
};

//-------------------------------------------------------------------------------------------------------------------------------------
// Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".
// function onScrolling(evt) {
//   console.log(evt.code);

//   const img = galleryItems.forEach((elem) => elem.original)

//   if (evt.code === "ArrowRight") {
//     modalImage.src = img.target.nextSibling.dataset.source; //меняем значение атрибута на ту сылку фото на которое нажали
//     modalImage.alt = img.target.nextSibling.alt; //меняем значение атрибута alt, на alt фото на которое нажали
//   }
//   else if (evt.code === "ArrowLeft") {
//     modalImage.src = img.target.previousSibling.dataset.source; //меняем значение атрибута на ту сылку фото на которое нажали
//     modalImage.alt = img.target.previousSibling.alt; //меняем значение атрибута alt, на alt фото на которое нажали
//   }
//   else { return;}
// };
//-------------------------------------------------------------------------------------------------------------------------------------


listGallery.addEventListener('click', onModalOpen);//вешаем 1 слушателя не родителя елементов которые мы вызываем
modalBtn.addEventListener('click', onModalClose);//при клике на все кроме фото молдальное окно закроется
modalOverlay.addEventListener('click', onModalClose);//при клике на все кроме фото молдальное окно закроется
