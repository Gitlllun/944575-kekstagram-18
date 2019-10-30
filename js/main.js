'use strict';

// 5. ЛИЧНЫЙ ПРОЕКТ: ПОКА ВСЕ ДОМА

var USER_NAMES = ['Артём', 'Маша', 'Игорь', 'Коля', 'Настя'];
var USER_POSTS = 25;
var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var POST_DESCRIPTION = ['Дорогие друзья, выбранный нами инновационный путь влечет за собой процесс', 'Не следует, однако, забывать о том, что новая модель организационной', 'Равным образом дальнейшее развитие различных форм деятельности требует от нас', 'Таким образом, начало повседневной работы по формированию позиции требует от'];
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;

// Генерация рандомного значения
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Генерация массива с нужным количеством данных
var createNumber = function (min, max) {
  var number = [];

  for (var i = min; i <= max; i++) {
    number.push(i);
  }

  return number;
};

// Массив из сгенерированных объектов для описания фотографии
var createPost = function (value) {
  var posts = [];

  var POST_LIKES = createNumber(LIKES_MIN, LIKES_MAX);
  var POST_AVATARS = createNumber(AVATAR_MIN, AVATAR_MAX);

  for (var i = 0; i < value; i++) {
    var urlPost = 'photos/' + (i + 1) + '.jpg';
    var descriptionPost = getRandomElement(POST_DESCRIPTION);
    var likesPost = getRandomElement(POST_LIKES);
    var randomAvatars = getRandomElement(POST_AVATARS);
    var commentsPost = getRandomElement(USER_COMMENTS);
    var namesPost = getRandomElement(USER_NAMES);

    posts.push({
      url: urlPost,
      description: POST_DESCRIPTION[descriptionPost],
      likes: POST_LIKES[likesPost],
      comments: [{
        avatar: 'img/avatar-' + POST_AVATARS[randomAvatars] + '.svg',
        message: USER_COMMENTS[commentsPost],
        name: USER_NAMES[namesPost]
      }]
    });
  }

  return posts;
};

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Заполнение данных поста
var renderPicture = function (obj) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = obj.url;
  picture.querySelector('.picture__likes').textContent = obj.likes;
  picture.querySelector('.picture__comments').textContent = obj.comments.length;

  return picture;
};

// Генерация и отрисовка постов
var picturePost = document.querySelector('.pictures');

var renderPost = function (post) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < post.length; i++) {
    fragment.appendChild(renderPicture(post[i]));
  }

  return picturePost.appendChild(fragment);
};

var postsList = createPost(USER_POSTS);

renderPost(postsList);

// 6. ЛИЧНЫЙ ПРОЕКТ: БОЛЬШЕ ДЕТАЛЕЙ

var bigPictureElement = document.querySelector('.big-picture');
// bigPictureElement.classList.remove('hidden');

// Прячет блок счетчика комментариев и загрузки новых
bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');

// Заполняет данными комментарий
var getCommentMarkup = function (comment) {
  var сommentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
  var commentAvatarElement = сommentElement.querySelector('.social__picture');
  commentAvatarElement.src = comment.avatar;
  commentAvatarElement.alt = comment.name;
  сommentElement.querySelector('.social__text').textContent = comment.message;

  return сommentElement;
};

// Создает фрагменты комментариев
var getCommentsMarkup = function (picture) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(getCommentMarkup(picture.comments[i]));
  }

  return fragment;
};

// Заполнение данных и отрисовка
var renderBigPicture = function (picture) {
  var listComments = getCommentsMarkup(picture);
  var commentsListElement = bigPictureElement.querySelector('.social__comments');

  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(listComments);
};

renderBigPicture(postsList[0]);

// 8. ЛИЧНЫЙ ПРОЕКТ: ПОДРОБНОСТИ

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadClosed = uploadOverlay.querySelector('#upload-cancel');

var onOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

var openOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
};

var closeOverlay = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onOverlayEscPress);
};

// Сброс по умолчанию
var getValueReset = function () {
  document.querySelector('.img-upload__form').reset();
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.img-upload__preview img').style.transform = '';
  document.querySelector('.img-upload__preview img').className = '';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
};

// Открывает форму редактирования изображения
uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  getValueReset();
  openOverlay();
});

uploadFile.addEventListener('change', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    openOverlay();
  }
});

// Закрывает форму редактирования изображения
uploadClosed.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeOverlay();
});

uploadClosed.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    closeOverlay();
  }
});

// Константы масштабирования
var SCALE_MAX = 100;
var SCALE_MIN = 25;
var SCALE_STEP = 25;
var FLAG_MINUS = -1;
var FLAG_PLUS = 1;

var sectionPicture = document.querySelector('.pictures');
var imagePreview = sectionPicture.querySelector('.img-upload__preview img');
var scalePreview = sectionPicture.querySelector('.img-upload__scale');
var controlSmaller = scalePreview.querySelector('.scale__control--smaller');
var controlValue = scalePreview.querySelector('.scale__control--value');
var controlBigger = scalePreview.querySelector('.scale__control--bigger');

// Функция расчета масштабирования
var getScale = function (number) {
  var parseValue = parseFloat(controlValue.value);
  var totalValue = parseValue + number * SCALE_STEP;

  if (totalValue > SCALE_MAX) {
    totalValue = SCALE_MAX;
  } else if (totalValue < SCALE_MIN) {
    totalValue = SCALE_MIN;
  }

  controlValue.value = totalValue + '%';
  imagePreview.style.transform = 'scale(' + (totalValue / SCALE_MAX) + ')';
};

// Уменьшение масштаба
controlSmaller.addEventListener('click', function (evt) {
  evt.preventDefault();
  getScale(FLAG_MINUS);
});

// Увеличение масштаба
controlBigger.addEventListener('click', function (evt) {
  evt.preventDefault();
  getScale(FLAG_PLUS);
});

// Переменные доя фильтров
var previewClasses = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];

var IMAGE_EFFECT = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];

var imageUploadEffect = document.querySelector('.img-upload__effects');

var getImageEffect = function (evt) {
  var target = evt.target.parentNode;

  for (var i = 0; i < IMAGE_EFFECT.length; i++) {
    if (target.previousElementSibling && target.previousElementSibling.id === IMAGE_EFFECT[i]) {
      if (target.previousElementSibling.id === IMAGE_EFFECT[0]) {
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
      } else {
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      }

      imagePreview.className = '';
      imagePreview.classList.add(previewClasses[i]);
    }
  }
};

imageUploadEffect.addEventListener('click', function (evt) {
  getImageEffect(evt);
});
