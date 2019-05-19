import {formDataToJSON} from "../helpers";

const postId = location.pathname.split('/').slice(-1)[0];
const submit = document.getElementById('editPostSubmit');
document.getElementById('editPost')
    .addEventListener('submit', onEditPostSubmit);
document.getElementById('deletePostButton')
    .addEventListener('click', onDeletePost);

async function onEditPostSubmit(e) {
    e.preventDefault();
    const form = e.target;
    submit.setAttribute('disabled', 'disabled');
    const jsonData = formDataToJSON(new FormData(form));
    try {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(jsonData)
        });
        if (response.status === 200) {
            location.assign('/');
        } else {
            throw new Error('Something went wrong');
        }
    } catch (e) {
        console.error(e);
    } finally {
        submit.removeAttribute('disabled');
    }
}

async function onDeletePost(e) {
    try {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
            location.assign('/');
        } else {
            throw new Error('Something went wrong');
        }
    } catch (e) {
        console.error(e);
    }
}
