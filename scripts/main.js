const postModal = document.querySelector(`.add-post-modal`);
const addPost = document.querySelector(`#add-photo`);
const createApost = document.querySelector(`#add-first-post`);

const body = document.querySelector(`body`);
const bodyOverlay = document.querySelector(`.body-overlay`);

const step1 = document.querySelector(`.add-post-modal__step-1`);
const step2 = document.querySelector(`.add-post-modal__step-2`);
const modalFooter = document.querySelector(`.modal__footer`);
const fileUpload = document.querySelector('#file-upload');
const publish = document.querySelector(`#post-publish`);
const image = document.querySelector('#uploaded-photo');
let file = null;
const alertSuccess = document.querySelector(`#alert-success`);
const alertFail = document.querySelector(`#alert-fail`);
const postText = document.querySelector(`#post-text`);
const postHashtags = document.querySelector(`#post-hashtags`);

const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1Njk5MzE5LCJpYXQiOjE2NzA4NjA5MTksImp0aSI6IjdlYTM3Y2E0OTg0NDRhYWZhNDExNjU0NWE2ZjdjMDUxIiwidXNlcl9pZCI6MjR9.LICWgUcTIanVA4xHrvCAyZsovRGY_mq1gPigA8OrsDw";
const addressPost = "https://c-gallery.polinashneider.space/api/v1/posts/";
const addressGet = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";

export { authorization, addressPost, addressGet }

addPost.addEventListener('click', openModalWindow);
createApost.addEventListener('click', openModalWindow);

function openModalWindow() {
    body.classList.add(`with-overlay`);
    postModal.classList.add(`active`);
    bodyOverlay.classList.add(`active`);
    fileUpload.accept = ".png, .jpg, .jpeg";
}

bodyOverlay.addEventListener('click', () => {
    postModal.classList.remove(`active`);
    body.classList.remove(`with-overlay`);
    bodyOverlay.classList.remove(`active`);
    //
    previewPostModal.classList.remove(`active`);
})

fileUpload.addEventListener('change', () => {
    file = fileUpload.files[0];
    image.src = URL.createObjectURL(file);
    if (fileUpload) {
        step1.classList.add(`hidden`);
        step2.classList.remove(`hidden`);
        modalFooter.classList.remove(`hidden`);
    }
});

function notifyOfSuccess(header, paragraf) {
    const success = alertSuccess.content.cloneNode(true);

    success.querySelector('h4').textContent = header;
    success.querySelector('p').textContent = paragraf;

    setTimeout(() => {
        bodyOverlay.remove();
    }, 2000);

    return success
}

function reportAnError(header, paragraf) {
    const mistake = alertFail.content.cloneNode(true);

    mistake.querySelector('h4').textContent = header;
    mistake.querySelector('p').textContent = paragraf;

    setTimeout(() => {
        bodyOverlay.remove();
    }, 2000);

    return mistake
}

publish.addEventListener("click", () => {
    const text = postText.value;
    const hashtag = postHashtags.value;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("text", text);
    formData.append("tags", hashtag);

    fetch(`${addressPost}`, {
            method: "POST",
            headers: {
                "Authorization": `${authorization}`,
            },
            body: formData,
        })
        .then(() => {
            postModal.classList.remove("active");
            const notificationTextSuccess = notifyOfSuccess('Фото успешно добавлено', '');
            bodyOverlay.append(notificationTextSuccess);
        })
        .catch(() => {
            const noticeTextError = notifyOfSuccess('Произошла ошибка при добавлении фото', 'Повторите попытку');
            bodyOverlay.append(noticeTextError);
        })
        .finally(() => {
            fileUpload.value = "";
            postHashtags.value = "";
            postText.value = "";
            image.src = "";

            step1.classList.remove(`hidden`);
            step2.classList.add(`hidden`);
            modalFooter.classList.add(`hidden`);
        })
})

import { gettingPosts } from './getting_posts.js';
gettingPosts();