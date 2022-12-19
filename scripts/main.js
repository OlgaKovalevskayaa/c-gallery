'use strict';
const addPost = document.querySelector(`#add-photo`);
const createApost = document.querySelector(`#add-first-post`);
const postModal = document.querySelector(`.add-post-modal`);

const body = document.querySelector(`body`);
const bodyOverlay = document.querySelector(`.body-overlay`);

const step1 = document.querySelector(`.add-post-modal__step-1`);
const step2 = document.querySelector(`.add-post-modal__step-2`);
const modalFooter = document.querySelector(`.modal__footer`);

const publish = document.querySelector(`#post-publish`);
const uploadedPhoto = document.querySelector(`#uploaded-photo`);
let image = document.querySelector('#uploaded-photo');
const fileUpload = document.querySelector('#file-upload');

addPost.addEventListener('click', openModalWindow);
createApost.addEventListener('click', openModalWindow);


function openModalWindow() {
    postModal.classList.add(`active`);
    body.classList.add(`with-overlay`);
    bodyOverlay.classList.add(`active`);
    fileUpload.accept = ".png, .jpg, .jpeg";
}


bodyOverlay.addEventListener('click', сloseModalWindow);

function сloseModalWindow() {
    postModal.classList.remove(`active`);
    body.classList.remove(`with-overlay`);
    bodyOverlay.classList.remove(`active`);
}

fileUpload.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    image.src = URL.createObjectURL(fileUpload.files[0]);
    image.style.display = "block";
    if (fileUpload) {
        console.log(fileUpload);
        step1.classList.add(`hidden`);
        step2.classList.remove(`hidden`);
        step2.classList.add('active');
        modalFooter.classList.remove(`hidden`);
    }

}

function notifyOfSuccess() {
    const alertSuccess = document.querySelector(`#alert-success`);
    const success = alertSuccess.content.cloneNode(true);
    bodyOverlay.append(success);

    setTimeout(() => {
        bodyOverlay.remove(success);
    }, 2000)
}


function reportAnError() {
    const alertFail = document.querySelector(`#alert-fail`);
    const mistake = alertFail.content.cloneNode(true);
    bodyOverlay.append(mistake);

    setTimeout(() => {
        bodyOverlay.remove(mistake);
    }, 2000)
}

publish.addEventListener("click", (event) => {
    const postText = document.querySelector(`#post-text`);
    const postHashtags = document.querySelector(`#post-hashtags`);

    const formData = new FormData();
    formData.append("image", fileUpload.files[0]);
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
            notifyOfSuccess();
        })
        .catch((error) => {
            console.log(error);
            reportAnError()
        });

    //document.querySelector(".form").reset();

    const inputs = document.querySelectorAll('textarea');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    };
})