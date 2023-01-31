import { commentsContent, getComent, COMMENT_AVATAR, statisticsCommentsSpan, postComment, commentsButton, currenPostId, postAdd, photoCount, photosContent, fragment } from './getting-posts.js'
import { COMMENTS, AUTHORIZATION, showТotification, alertSuccess, ADDRESS_GET, body, previewPostModal, bodyOverlay } from './main.js';

export function deleteAPost() {
    fetch(`${ADDRESS_GET}${currenPostId}/`, {
            method: "DELETE",
            headers: {
                "Authorization": AUTHORIZATION,
            },
        })
        .then(() => {
            previewPostModal.classList.remove(`active`);
            body.classList.remove(`with-overlay`);
            bodyOverlay.classList.remove(`active`);
            showТotification(alertSuccess, 'Пост успешно удален', '');
            photoCount.textContent = --photoCount.textContent;

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
            showТotification(alertSuccess, 'Попробуйте в другой раз', '');
        })
        .finally(() => {
            body.classList.remove('with-overlay');
        })
}