import { AUTHORIZATION, ADDRESSPOST, ADDRESSGET, body, bodyOverlay, previewPostModal } from './main.js'

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

    fetch(`${ADDRESSGET}`, {
            method: 'GET',
            headers: {
                "Authorization": `${AUTHORIZATION}`,
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
                    openModal(item.image, item.text, item.tags, resultDate);
                });

                const date1 = new Date(item.created_at);
                let date = date1.getDate();
                if (date < 10) date = '0' + date;
                let month = date1.getMonth();
                if (month < 10) month = '0' + month;
                let year = date1.getFullYear();
                let resultDate = date + '.' + month + '.' + year;
            });

            function postAdd(image, likes, comments) {
                const clonPost = postTemplate.content.firstElementChild.cloneNode(true);
                clonPost.querySelector("img").src = image;
                clonPost.querySelector(".likes span").textContent = likes;
                clonPost.querySelector(".comments span").textContent = comments;
                return clonPost;
            }

            function openModal(image, text, tags, created_at) {
                postPhoto.src = image;
                postText.textContent = text;
                postHashtags.textContent = tags;
                infoTime.textContent = created_at;
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