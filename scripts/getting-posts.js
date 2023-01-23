import { AUTHORIZATION, ADDRESS_POST, ADDRESS_GET, body, bodyOverlay, COMMENTS } from './main.js'
import { showТotification } from './main.js';
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
const statisticsCommentsspan = document.querySelector(`.statistics__comments span`);
const postComment = document.querySelector(`#post-comment`);
const commentsButton = document.querySelector(`.comments-button`);
const showComments = document.querySelector('#show_comments');
let resultDate = null;
let resultTime = null;
const fragment = new DocumentFragment();
const commentAvatar = 'https://c-gallery.polinashneider.space/images/avatar.svg';

function postAdd(item) {
    const clonPost = postTemplate.content.firstElementChild.cloneNode(true);
    clonPost.querySelector("img").src = item.image;
    clonPost.querySelector(".likes span").textContent = item.likes;
    clonPost.querySelector(".comments span").textContent = item.comments.length;
    return clonPost;
}

function getComent(text, nickname, photo, created_at) {
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
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();

    return resultDate = addZero(date) + '.' + addZero(month) + '.' + addZero(year);
}

function changeTime(addingTime) {
    const newDate = new Date(addingTime);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();

    return resultTime = addZero(hours) + ':' + addZero(minutes);
}

function emptyStringCheck() {
    const postCommentText = document.querySelector(`#post-comment`).value;
    if (postCommentText === '') {
        return false;
    }
    const commentСontent = getComent(postCommentText, 'codegirl_school', commentAvatar, new Date());
    statisticsCommentsspan.textContent = ++statisticsCommentsspan.textContent;
    commentsContent.append(commentСontent)
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
            photoCount.textContent = `${counter}`;

            object.forEach((item) => {
                const addPost = postAdd(item);
                fragment.append(addPost);
                photosContent.append(fragment)
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
                statisticsCommentsspan.textContent = item.comments.length;

                item.comments.forEach((item) => {
                    changeDate(item.created_at);
                    changeTime(item.created_at);
                    //Отображение комментариев
                    const commentСontent = getComent(item.text, item.user.nickname, item.user.photo, item.created_at);
                    fragment.append(commentСontent);
                    commentsContent.append(fragment)
                });

                //поставить лайк
                faHeart.addEventListener('click', function() {
                    statisticsLikes.classList.add(`liked`);
                    const like = statisticsLikesSpan.value;
                    const formData = new FormData();
                    formData.append("likes", like);
                    fetch(`${ADDRESS_POST}${item.id}/like/`, {
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
                            const addLikeError = showТotification('Попробуйте в другой раз', '');
                            bodyOverlay.append(addLikeError);
                        })
                });

                //удаление поста
                deletePost.addEventListener('click', function() {
                    fetch(`${ADDRESS_GET}${item.id}/`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": AUTHORIZATION,
                            },
                        })
                        .then(() => {
                            previewPostModal.classList.remove(`active`);
                            const postDeleted = showТotification('Пост успешно удален', '');
                            bodyOverlay.append(postDeleted);
                            //перерисовка поста
                            fetch(ADDRESS_GET, {
                                    method: 'GET',
                                    headers: {
                                        "Authorization": AUTHORIZATION,
                                    },
                                })
                                .then((result) => {
                                    return result.json();
                                })
                                .then((data) => {
                                    photosContent.innerHTML = "";
                                    data.forEach((item) => {
                                        const redrawPosts = postAdd(item);
                                        fragment.append(redrawPosts);
                                        photosContent.append(fragment)
                                    });
                                });
                        })
                        .catch(() => {
                            const redrawPostError = showТotification('Попробуйте в другой раз', '');
                            bodyOverlay.append(redrawPostError);
                        })
                        .finally(() => {
                            body.classList.remove('with-overlay');
                        })
                })

                //написать комментарий 
                function writeAcomment() {
                    emptyStringCheck()
                    const postCommentText = postComment.value;
                    const formData = new FormData();
                    formData.append("text", postCommentText);
                    formData.append("post", item.id);
                    fetch(COMMENTS, {
                            method: 'POST',
                            headers: {
                                'Authorization': AUTHORIZATION
                            },
                            body: formData,
                        })
                        .then((result) => {
                            return result.json();
                        })
                        .catch(() => {
                            const writeCommentError = showТotification('Попробуйте в другой раз', '');
                            bodyOverlay.append(writeCommentError);
                        })
                        .finally(() => {
                            postComment.value = "";
                        })
                }
                commentsButton.addEventListener("click", writeAcomment);
                postComment.addEventListener("keydown", function(event) {
                    if (event.key === 'Enter') {
                        writeAcomment();
                    }
                });
            }

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
        })
}