
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
const previewPostModal = document.querySelector(`.preview-post-modal`);
const AUTHORIZATION = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1Njk5MzE5LCJpYXQiOjE2NzA4NjA5MTksImp0aSI6IjdlYTM3Y2E0OTg0NDRhYWZhNDExNjU0NWE2ZjdjMDUxIiwidXNlcl9pZCI6MjR9.LICWgUcTIanVA4xHrvCAyZsovRGY_mq1gPigA8OrsDw";
const ADDRESS_POST = "https://c-gallery.polinashneider.space/api/v1/posts/";
const ADDRESS_GET = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";
const COMMENTS = "https://c-gallery.polinashneider.space/api/v1/comments/";

export { AUTHORIZATION, ADDRESS_POST, ADDRESS_GET, body, bodyOverlay, COMMENTS }
const postText = document.querySelector(`#post-text`);
const postHashtags = document.querySelector(`#post-hashtags`);

const AUTHORIZATION = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1Njk5MzE5LCJpYXQiOjE2NzA4NjA5MTksImp0aSI6IjdlYTM3Y2E0OTg0NDRhYWZhNDExNjU0NWE2ZjdjMDUxIiwidXNlcl9pZCI6MjR9.LICWgUcTIanVA4xHrvCAyZsovRGY_mq1gPigA8OrsDw";
const ADDRESSPOST = "https://c-gallery.polinashneider.space/api/v1/posts/";
const ADDRESSGET = "https://c-gallery.polinashneider.space/api/v1/users/me/posts/";

const previewPostModal = document.querySelector(`.preview-post-modal`);

export { AUTHORIZATION, ADDRESSPOST, ADDRESSGET, body, bodyOverlay, previewPostModal

addPost.addEventListener('click', openModalWindow);
createApost.addEventListener('click', openModalWindow);

function openModalWindow() {

    body.classList.add(`with-overlay`);
    postModal.classList.add(`active`);


    body.classList.add(`with-overlay`);
    postModal.classList.add(`active`);

    postModal.classList.add(`active`);
    body.classList.add(`with-overlay`);


    bodyOverlay.classList.add(`active`);
    fileUpload.accept = ".png, .jpg, .jpeg";
}

bodyOverlay.addEventListener('click', () => {
    postModal.classList.remove(`active`);
    body.classList.remove(`with-overlay`);
    bodyOverlay.classList.remove(`active`);

    previewPostModal.classList.remove(`active`);


    //
    previewPostModal.classList.remove(`active`);


})

fileUpload.addEventListener('change', () => {
    file = fileUpload.files[0];

    image.src = URL.createObjectURL(file);


    image.src = URL.createObjectURL(file);

    image.src = URL.createObjectURL(file)

    if (fileUpload) {
        step1.classList.add(`hidden`);
        step2.classList.remove(`hidden`);
        modalFooter.classList.remove(`hidden`);
    }
});


export function showТotification(header, paragraf) {

function notifyOfSuccess(header, paragraf) {

    const success = alertSuccess.content.cloneNode(true);

    success.querySelector('h4').textContent = header;
    success.querySelector('p').textContent = paragraf;


    const cancelNotification = setTimeout(() => {
        bodyOverlay.remove();

    setTimeout(() => {

        bodyOverlay.remove();

        bodyOverlay.remove(success);


    }, 2000);

    return success
}



publish.addEventListener("click", () => {

function reportAnError(header, paragraf) {

function reportAnError() {

    const mistake = alertFail.content.cloneNode(true);

    mistake.querySelector('h4').textContent = header;
    mistake.querySelector('p').textContent = paragraf;

    setTimeout(() => {

        bodyOverlay.remove();

        bodyOverlay.remove(mistake);

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

    fetch(ADDRESS_POST, {
            method: "POST",
            headers: {
                "Authorization": AUTHORIZATION,

    fetch(`${ADDRESSPOST}`, {
            method: "POST",
            headers: {
                "Authorization": `${AUTHORIZATION}`,

    const postText = document.querySelector(`#post-text`);
    const postHashtags = document.querySelector(`#post-hashtags`);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("text", postText.value);
    formData.append("tags", postHashtags.value);

    fetch("https://c-gallery.polinashneider.space/api/v1/posts/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1Njk5MzE5LCJpYXQiOjE2NzA4NjA5MTksImp0aSI6IjdlYTM3Y2E0OTg0NDRhYWZhNDExNjU0NWE2ZjdjMDUxIiwidXNlcl9pZCI6MjR9.LICWgUcTIanVA4xHrvCAyZsovRGY_mq1gPigA8OrsDw",


            },
            body: formData,
        })
        .then(() => {
            postModal.classList.remove("active");

            const notificationTextSuccess = showТotification('Фото успешно добавлено', '');
            bodyOverlay.append(notificationTextSuccess);
        })
        .catch(() => {
            const noticeTextError = showТotification('Произошла ошибка при добавлении фото', 'Повторите попытку');


            const notificationTextSuccess = notifyOfSuccess('Фото успешно добавлено', '');
            bodyOverlay.append(notificationTextSuccess);
        })
        .catch(() => {
            const noticeTextError = reportAnError('Произошла ошибка при добавлении фото', 'Повторите попытку');
            bodyOverlay.append(noticeTextError);

            const notificationText = notifyOfSuccess('Фото успешно добавлено', '');
            bodyOverlay.append(notificationText);
        })
        .catch((error) => {
            console.log(error);
            const notificationText = notifyOfSuccess('Произошла ошибка при добавлении фото', 'Повторите попытку');
            bodyOverlay.append(notificationText);


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


import { gettingPosts } from './getting-posts.js';
gettingPosts();

import { gettingPosts } from './getting_posts.js';
gettingPosts();

        })
})

