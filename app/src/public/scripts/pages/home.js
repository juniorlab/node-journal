import {formDataToJSON} from "../helpers";

const postsWrapper = document.getElementById('posts');
const submit = document.getElementById('newPostSubmit');
document.getElementById('newPost')
    .addEventListener('submit', onNewPostSubmit);

async function onNewPostSubmit(e) {
    e.preventDefault();
    const form = e.target;
    submit.setAttribute('disabled', 'disabled');
    const jsonData = formDataToJSON(new FormData(form));
    try {
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(jsonData),
        });
        if (response.status === 201) {
            const data = await response.json();
            const newChild = document.createElement('a');
            newChild.href = `/post/${data.id}`;
            newChild.innerHTML = `
                    <div class="post">
                        <div class="post__header">
                            <div class="post__header__title">
                                ${data.title}
                            </div>
                            <div class="post__header__date">
                                ${data.createdAt}
                            </div>
                        </div>
                        <div class="post__body">
                            ${data.body}
                        </div>
                    </div>
            `;
            postsWrapper.insertBefore(newChild, postsWrapper.firstChild);
            form.reset();
        } else {
            throw new Error('Something went wrong.')
        }
    } catch (e) {
        console.error(e)
    } finally {
        submit.removeAttribute('disabled');
    }
}
