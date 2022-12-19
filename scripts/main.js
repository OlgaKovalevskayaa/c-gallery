'use strict';
const addPost = document.querySelector(`#add-photo`);
const createApost = document.querySelector(`#add-first-post`);
const postModal = document.querySelector(`.add-post-modal`);

const body = document.querySelector(`body`);
const bodyOverlay = document.querySelector(`.body-overlay`);

let input = document.querySelector("#file-upload");
const step1 = document.querySelector(`.add-post-modal__step-1`);
const step2 = document.querySelector(`.add-post-modal__step-2`);
const modalFooter = document.querySelector(`.modal__footer`);
let curFiles = null;
const publish = document.querySelector(`#post-publish`);
const uploadedPhoto = document.querySelector(`#uploaded-photo`);
const postText = document.querySelector(`#post-text`);
const postHashtags = document.querySelector(`#post-hashtags`);

const alertSuccess = document.querySelector(`#alert-success`);
const alertFail = document.querySelector(`#alert-fail`);

addPost.addEventListener('click', openModalWindow);
createApost.addEventListener('click', openModalWindow);

function openModalWindow() {
    postModal.classList.add(`active`);
    body.classList.add(`with-overlay`);
    bodyOverlay.classList.add(`active`);
    input.accept = ".png, .jpg, .jpeg";
}


bodyOverlay.addEventListener('click', сloseModalWindow);

function сloseModalWindow() {
    postModal.classList.remove(`active`);
    body.classList.remove(`with-overlay`);
    bodyOverlay.classList.remove(`active`);
}

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    curFiles = input.files;
    if (curFiles) {
        step1.classList.add(`hidden`);
        step2.classList.remove(`hidden`);
        modalFooter.classList.remove(`hidden`);
    }
    return curFiles
}

publish.addEventListener("click", (event) => {
    event.preventDefault();
    const file = curFiles[0];
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
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            console.log(data);

            function notifyOfSuccess() {
                const success = alertSuccess.content.cloneNode(true);
                return success;
            }

            const advance = notifyOfSuccess();
            bodyOverlay.append(advance);
            // работает, но странно  :((
            setTimeout(() => {
                bodyOverlay.remove(advance);
            }, 2000)
        })
        .catch((error) => {
            console.log(error);

            function reportAnError() {
                const mistake = alertFail.content.cloneNode(true);
                return mistake;
            }

            const failure = reportAnError();
            bodyOverlay.append(failure)
        });
    //не работает :(( 
    //document.postText.reset();
    //document.postHashtags.reset();
})