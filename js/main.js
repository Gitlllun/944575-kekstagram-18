'use strict';

var NUMBER_POSTS = 25;
var POST_DESCRIPTION = ['Дорогие друзья, выбранный нами инновационный путь влечет за собой процесс', 'Не следует, однако, забывать о том, что новая модель организационной', 'Равным образом дальнейшее развитие различных форм деятельности требует от нас', 'Таким образом, начало повседневной работы по формированию позиции требует от'];
var LIKE_MIN = 15
var LIKE_MAX = 200
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
    var urlPost = 'img/photos/' + i + '.jpg';
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
      comments: avatarsPost + ' ' + POST_COMMENTS[commentsPost] + ' ' + POST_NAMES[namesPost]
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
  picture.querySelector('.picture__info').textContent = obj.description;
  picture.querySelector('.picture_likes').textContent = obj.likes;
  picture.quertSelector('.picture__comments').textContent = obj.comments;

  return picture;
};

// -------------------------
