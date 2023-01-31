export { AUTHORIZATION, ADDRESS_POST, ADDRESS_GET, body, bodyOverlay, COMMENTS, alertSuccess, previewPostModal }
import { photoCount, gettingPosts } from './getting-posts.js'



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


addPost.addEventListener('click', openModalWindow);
createApost.addEventListener('click', openModalWindow);


function openModalWindow() {
    body.classList.add(`with-overlay`);
    bodyOverlay.classList.add(`active`);
    postModal.classList.add(`active`);
    fileUpload.accept = ".png, .jpg, .jpeg";
}

bodyOverlay.addEventListener('click', () => {
    postModal.classList.remove(`active`);
    body.classList.remove(`with-overlay`);
    bodyOverlay.classList.remove(`active`);
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

export function showТotification(type, header, paragraf) {
    const messageFail = type;
    const success = messageFail.content.firstElementChild.cloneNode(true);
    success.querySelector('h4').textContent = header;
    success.querySelector('p').textContent = paragraf;
    document.body.append(success);
    const cancelNotification = setTimeout(() => {
        success.remove();
    }, 2000);
    return cancelNotification
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
            },
            body: formData,
        })
        .then(() => {
            postModal.classList.remove("active");
            body.classList.remove(`with-overlay`);
            bodyOverlay.classList.remove(`active`);
            showТotification(alertSuccess, 'Фото успешно добавлено', '');
            photoCount.textContent = ++photoCount.textContent;
        })
        .catch(() => {
            showТotification(alertSuccess, 'Произошла ошибка при добавлении фото', 'Повторите попытку');
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

gettingPosts();