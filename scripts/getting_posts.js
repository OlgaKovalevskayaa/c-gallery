import { authorization, addressPost, addressGet } from './main.js'

export function gettingPosts() {
    const emptyContent = document.querySelector(`.empty-content`);
    const photosContent = document.querySelector(`.photos__content`);
    const postTemplate = document.querySelector(`#post-template`);
    const previewPostModal = document.querySelector(`.preview-post-modal`);
    const photoCount = document.querySelector(`#photo-count`);
    let counter = null;

    fetch(`${addressGet}`, {
            headers: {
                "Authorization": `${authorization}`,
            },
        })
        .then((result) => {
            return result.json();
        })
        .then((obj) => {
            //это то, куда я должна вставить//
            const modalContent = document.querySelector(`.modal__content`);
            const postPhoto = modalContent.querySelector("#post-photo");
            const postText = modalContent.querySelector(".post-text");
            const postHashtags = modalContent.querySelector(".post-hashtags");
            const infoTime = modalContent.querySelector(".account-info__time");

            counter = obj.length;
            photoCount.textContent = `${counter}`;

            obj.forEach((item) => {
                const addPost = postAdd(item.image, item.likes, item.comments);
                photosContent.append(addPost);

                //это то, что я должна вставить//
                //const preview = openModal(item.image, item.text, item.tags, item.created_at);
            });

            function postAdd(image, likes, comments) {
                const clonPost = postTemplate.content.cloneNode(true);
                clonPost.querySelector("img").src = image;
                clonPost.querySelector(".likes span").textContent = likes;
                clonPost.querySelector(".comments span").textContent = comments;
                return clonPost;
            }

            //функция, для вставки// Но я не понимаю как это сделать// Беспорядок в голове
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