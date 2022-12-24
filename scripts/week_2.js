export function weekTwo() {
    const emptyContent = document.querySelector(`.empty-content`);
    const photosContent = document.querySelector(`.photos__content`);
    const postTemplate = document.querySelector(`#post-template`);
    const previewPostModal = document.querySelector(`.preview-post-modal`);
    const photoCount = document.querySelector(`#photo-count`);
    let counter = null;
    fetch("https://c-gallery.polinashneider.space/api/v1/posts/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1Njk5MzE5LCJpYXQiOjE2NzA4NjA5MTksImp0aSI6IjdlYTM3Y2E0OTg0NDRhYWZhNDExNjU0NWE2ZjdjMDUxIiwidXNlcl9pZCI6MjR9.LICWgUcTIanVA4xHrvCAyZsovRGY_mq1gPigA8OrsDw",
            },
        })
        .then((result) => {
            return result.json();
        })
        .then((obj) => {
            const modalContent = document.querySelector(`.modal__content`);
            let modalContentImg = modalContent.querySelector("#post-photo");
            let modalContentText = modalContent.querySelector(".post-text");
            let modalContentTags = modalContent.querySelector(".post-hashtags");


            function postAdd(image, likes) {
                const photo = postTemplate.content.cloneNode(true);
                photo.querySelector("img").src = image;
                photo.querySelector(".likes span").textContent = likes;
                //photo.querySelector(".comments span").textContent = comments; 
                return photo;
            }
            console.log(obj);
            //console.log(obj[5]);
            //console.log(obj[8]["image"]);

            counter = obj.length;
            photoCount.textContent = `${counter}`;

            obj.forEach((item) => {
                const addPost = postAdd(item["image"], item["likes"])
                photosContent.append(addPost);
                //console.log(item["text"]);
                let text = item["text"];
                let tags = item["tags"];
                let image = item["image"];
                let dateOfCreation = item["created_at"];
            });

            photosContent.addEventListener('click', function(event) {
                const element = event.target;
                console.log(element);
                previewPostModal.classList.add(`active`);
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