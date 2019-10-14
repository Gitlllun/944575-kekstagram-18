'use strict';

var NUMBER_POSTS = 25;
var POST_DESCRIPTION = ['Дорогие друзья, выбранный нами инновационный путь влечет за собой процесс', 'Не следует, однако, забывать о том, что новая модель организационной', 'Равным образом дальнейшее развитие различных форм деятельности требует от нас', 'Таким образом, начало повседневной работы по формированию позиции требует от'];
var LIKE_MIN = 15;
var LIKE_MAX = 200;
var POST_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var POST_NAMES = ['Артём', 'Маша', 'Игорь', 'Коля', 'Настя'];

// Функция генерация массива с нужным количеством данных
var createNumber = function (x, y) {
  var number = [];

  for (var i = x; i <= y; i++) {
    number.push(i);
  }

  return number;
};

// Функция получения рандомного значения
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Функция для создания массива из сгенерированных объектов для описания фотографии, опубликованной пользователем
var createPost = function (number) {
  var post = [];

  var POST_LIKES = createNumber(LIKE_MIN, LIKE_MAX);
  var POST_AVATARS = createNumber(AVATAR_MIN, AVATAR_MAX);

  for (var i = 1; i <= number; i++) {
    var urlPost = 'photos/' + i + '.jpg';
    var descriptionPost = getRandomElement(POST_DESCRIPTION);
    var likesPost = getRandomElement(POST_LIKES);
    var randomAvatars = getRandomElement(POST_AVATARS);
    var commentsPost = getRandomElement(POST_COMMENTS);
    var namesPost = getRandomElement(POST_NAMES);
    var avatarsPost = 'img/avatar-' + randomAvatars + '.svg';

    post.push({
      url: urlPost,
      description: POST_DESCRIPTION[descriptionPost],
      likes: POST_LIKES[likesPost],
      comments: [{
        avatar: avatarsPost,
        message: getRandomElement(POST_COMMENTS[commentsPost]),
        name: POST_NAMES[namesPost]
      }]
    });
  }

  return post;
};

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('a');

var renderPicture = function (obj) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = obj.url;
  picture.querySelector('.picture__likes').textContent = obj.likes;
  picture.querySelector('.picture__comments').textContent = obj.comments.length;

  return picture;
};

var picturePost = document.querySelector('.pictures');

var renderPost = function (post) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < post.length; i++) {
    fragment.appendChild(renderPicture(post[i]));
  }

  return picturePost.appendChild(fragment);
};

renderPost(createPost(NUMBER_POSTS));

// Начало работы с ТЗ

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadClosed = uploadOverlay.querySelector('#upload-cancel');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

// Открывает форму редактирования изображения
uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();

  document.querySelector('.img-upload__form').reset();
  uploadFile.value = '';
  controlValue.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  imagePreview.className = '';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

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

// Переменные для масштабирования
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
