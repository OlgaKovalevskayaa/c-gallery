import { AUTHORIZATION, ADDRESS_GET, body, bodyOverlay, previewPostModal, COMMENTS } from './main.js'

export function gettingPosts() {
    const emptyContent = document.querySelector(`.empty-content`);
    const photosContent = document.querySelector(`.photos__content`);
    const postTemplate = document.querySelector(`#post-template`);
    const photoCount = document.querySelector(`#photo-count`);
    let counter = null;
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


    fetch(ADDRESS_GET, {
            method: 'GET',
            headers: {
                "Authorization": AUTHORIZATION,
            },
        })
        .then((result) => {
            return result.json();
        })
        .then((obj) => {
            counter = obj.length;
            photoCount.textContent = `${counter}`;

            obj.forEach((item) => {
                const addPost = postAdd(item.image, item.likes, item.comments);
                photosContent.append(addPost);
                addPost.addEventListener("click", () => {
                    openModal(item.image, item.text, item.tags, resultDate, item.id, item.likes, item.comments.length, item.text);
                });

                const date1 = new Date(item.created_at);
                let date = date1.getDate();
                let month = date1.getMonth();
                let year = date1.getFullYear();

                if (date < 10) {
                    date = '0' + date;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                let resultDate = date + '.' + month + '.' + year;

                //Отображение комментариев
                function get(comment) {
                    const clonPost = showComments.content.cloneNode(true);
                    clonPost.querySelector(".comments__item-comment").textContent = comment;
                    clonPost.querySelector(".comments__item-nickname").textContent = 'No name';
                    return clonPost;
                }
                item.comments.forEach((item) => {
                    console.log(item.text);
                    const ghjk = get(item.text)
                    commentsContent.append(ghjk)
                });
            });

            function postAdd(image, likes, comments) {
                const clonPost = postTemplate.content.firstElementChild.cloneNode(true);
                clonPost.querySelector("img").src = image;
                clonPost.querySelector(".likes span").textContent = likes;
                clonPost.querySelector(".comments span").textContent = comments.length;
                return clonPost;
            }

            function openModal(image, text, tags, created_at, id, likes, comments) {
                postPhoto.src = image;
                postText.textContent = text;
                postHashtags.textContent = tags;
                infoTime.textContent = created_at;
                statisticsLikesSpan.textContent = likes;
                statisticsCommentsspan.textContent = comments;
                let DELETE = `https://c-gallery.polinashneider.space/api/v1/users/me/posts/${id}/`;
                let LIKE = `https://c-gallery.polinashneider.space/api/v1/posts/${id}/like/`;

                //поставить лайк
                faHeart.addEventListener('click', function() {
                    statisticsLikes.classList.add(`liked`);

                    const like = statisticsLikesSpan.value;
                    const formData = new FormData();
                    formData.append("likes", like);
                    //поставить лайк
                    fetch(LIKE, {
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
                            alert('Попробуйте в другой раз');
                        })
                });

                //удаление поста
                deletePost.addEventListener('click', function() {
                    fetch(DELETE, {
                            method: "DELETE",
                            headers: {
                                "Authorization": AUTHORIZATION,
                            },
                        })
                        .then(() => {
                            previewPostModal.classList.remove(`active`);
                            alert('Пост успешно удален');
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
                                        const redrawPosts = postAdd(item.image, item.likes, item.comments);
                                        photosContent.append(redrawPosts);
                                    });
                                });
                        })
                        .catch(() => {
                            alert('Попробуйте в другой раз');
                        })
                        .finally(() => {
                            body.classList.remove('with-overlay');
                            bodyOverlay.classList.remove('active');
                        })
                });

                //написать комментарий 
                function writeAcomment() {
                    const postCommentText = postComment.value;
                    const formData = new FormData();
                    formData.append("text", postCommentText);
                    formData.append("post", id);
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
                        .then(() => {
                            const postCommentText = document.querySelector(`#post-comment`).value;
                            if (postCommentText == '') {
                                alert('Вы забыли ввести текст');
                                return false;
                            } else {
                                alert("Запись успешно внесена");
                                commentsItem.textContent = postCommentText;
                            }
                            return true;
                        })
                        .catch(() => {
                            alert("Ошибка")
                        })
                        .finally(() => {
                            postComment.value = "";
                        })
                }
                commentsButton.addEventListener("click", writeAcomment);
                postComment.addEventListener("keydown", function(event) {
                    if (event.key == 'Enter') {
                        writeAcomment();
                    }
                });
            }

            photosContent.addEventListener('click', function() {
                previewPostModal.classList.add(`active`);
                body.classList.add('with-overlay');
                bodyOverlay.classList.add('active');
            })
        });

    if (counter === 0) {
        emptyContent.classList.remove(`hidden`);
        photosContent.classList.add(`hidden`);
    } else {
        emptyContent.classList.add(`hidden`);
        photosContent.classList.remove(`hidden`);
    }
}