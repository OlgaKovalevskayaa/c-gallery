import { AUTHORIZATION, ADDRESS_POST, ADDRESS_GET, body, bodyOverlay, COMMENTS, alertSuccess, showТotification } from './main.js'

import { writeAcomment } from './write-a-comment.js';
import { deleteAPost } from './delete-post.js';


export { photoCount, commentsContent, COMMENT_AVATAR, statisticsCommentsSpan, postComment, commentsButton, currenPostId, photosContent, fragment }
const emptyContent = document.querySelector(`.empty-content`);
const photosContent = document.querySelector(`.photos__content`);
const postTemplate = document.querySelector(`#post-template`);
const photoCount = document.querySelector(`#photo-count`);
let counter = null;
const previewPostModal = document.querySelector(`.preview-post-modal`);
const postPhoto = previewPostModal.querySelector("#post-photo");
const postText = previewPostModal.querySelector(".post-text");
const postHashtags = previewPostModal.querySelector(".post-hashtags");
const infoTime = previewPostModal.querySelector(".account-info__time");
const deletePost = document.querySelector(`#delete-post`);

const faHeart = document.querySelector(`.fa-heart`);
const statisticsLikes = document.querySelector(`.statistics__likes`);
const statisticsLikesSpan = document.querySelector(`.statistics__likes span`);

const commentsContent = document.querySelector(`.comments__content`);
const commentsItem = document.querySelector(`.comments__item`);
const statisticsCommentsSpan = document.querySelector(`.statistics__comments span`);

const commentsButton = document.querySelector(`.comments-button`);
const showComments = document.querySelector('#show_comments');
const postComment = document.querySelector(`#post-comment`);
let resultDate = null;
let resultTime = null;
const fragment = new DocumentFragment();
const COMMENT_AVATAR = 'https://c-gallery.polinashneider.space/images/avatar.svg';
let currenPostId = null;


export function postAdd(item) {
    const clonPost = postTemplate.content.firstElementChild.cloneNode(true);
    clonPost.querySelector("img").src = item.image;
    clonPost.querySelector(".likes span").textContent = item.likes;
    clonPost.querySelector(".comments span").textContent = item.comments.length;
    return clonPost;
}

export function getComent(text, nickname, photo, created_at) {
    const clonPost = showComments.content.cloneNode(true);
    clonPost.querySelector(".comments__item-comment").textContent = text;
    clonPost.querySelector(".comments__item-nickname").textContent = nickname;
    clonPost.querySelector(".comments__item-avatar").src = photo;
    clonPost.querySelector(".comments__item-time").textContent = `${changeDate( created_at)}  в ${changeTime( created_at)}`;
    return clonPost;
}

function addZero(variable) {
    if (variable < 10) {
        variable = '0' + variable;
        return variable
    }
    return variable
}

function changeDate(dayOfAddition) {
    const newDate = new Date(dayOfAddition);
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    return resultDate = addZero(date) + '.' + addZero(month) + '.' + addZero(year);
}

function changeTime(addingTime) {
    const newDate = new Date(addingTime);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    return resultTime = addZero(hours) + ':' + addZero(minutes);
}

export function gettingPosts() {
    fetch(ADDRESS_GET, {
            method: 'GET',
            headers: {
                "Authorization": AUTHORIZATION,
            },
        })
        .then((result) => {
            return result.json();
        })
        .then((object) => {
            counter = object.length;
            photoCount.textContent = counter;

            object.forEach((item) => {
                const addPost = postAdd(item);
                fragment.append(addPost);
                photosContent.append(fragment)
                    //Здесь обработчики добавляются в цикле — не будет зачтен критерий про делегирование. Но в принципе можешь оставить текущий вариант.
                addPost.addEventListener("click", () => {
                    commentsContent.textContent = '';
                    openModal(item, resultDate);
                });
            });

            function openModal(item) {
                postPhoto.src = item.image;
                postText.textContent = item.text;
                postHashtags.textContent = item.tags;
                infoTime.textContent = changeDate(item.created_at);
                statisticsLikesSpan.textContent = item.likes;
                statisticsCommentsSpan.textContent = item.comments.length;
                currenPostId = item.id;

                item.comments.forEach((item) => {
                    changeDate(item.created_at);
                    changeTime(item.created_at);
                    //Отображение комментариев
                    const commentСontent = getComent(item.text, item.user.nickname, item.user.photo, item.created_at);
                    fragment.append(commentСontent);
                    commentsContent.append(fragment)
                });
            }
        })
}


//написать комментарий
commentsButton.addEventListener("click", writeAcomment);
postComment.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        writeAcomment();
    }
});

faHeart.addEventListener('click', function() {
    if (statisticsLikes.classList.contains('liked')) {
        return
    }
    const like = statisticsLikesSpan.value;
    const formData = new FormData();
    formData.append("likes", like);
    fetch(`${ADDRESS_POST}${currenPostId}/like/`, {
            method: "POST",
            headers: {
                "Authorization": AUTHORIZATION,
            },
            body: formData,
        })
        .then(() => {
            statisticsLikesSpan.textContent = ++statisticsLikesSpan.textContent;
        })
        .catch(() => {
            showТotification(alertSuccess, 'Попробуйте в другой раз', '');
        })
});

//удаление поста
deletePost.addEventListener('click', deleteAPost);

photosContent.addEventListener('click', function() {
    previewPostModal.classList.add(`active`);
    body.classList.add('with-overlay');
    bodyOverlay.classList.add('active');
});

if (counter === 0) {
    emptyContent.classList.remove(`hidden`);
    photosContent.classList.add(`hidden`);
} else {
    emptyContent.classList.add(`hidden`);
    photosContent.classList.remove(`hidden`);
}