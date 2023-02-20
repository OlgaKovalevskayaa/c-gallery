import { commentsContent, getComent, COMMENT_AVATAR, statisticsCommentsSpan, postComment, commentsButton, currenPostId } from './getting-posts.js'
import { COMMENTS, AUTHORIZATION, showТotification, alertSuccess } from './main.js';

export function writeAcomment() {
    const postCommentText = document.querySelector(`#post-comment`).value;
    if (postCommentText === '') {
        return
    }
    const commentСontent = getComent(postCommentText, 'codegirl_school', COMMENT_AVATAR, new Date());
    statisticsCommentsSpan.textContent = ++statisticsCommentsSpan.textContent;
    commentsContent.append(commentСontent)

    const comment = postComment.value;
    if (comment === '') {
        commentsButton.disabled = true;
    } else {
        commentsButton.disabled = false;
    }
    const formData = new FormData();
    formData.append("text", comment);
    formData.append("post", currenPostId);

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
            emptyStringCheck()
        })
        .catch(() => {
            showТotification(alertSuccess, 'Попробуйте в другой раз', '');
        })
        .finally(() => {
            postComment.value = "";
        })
}