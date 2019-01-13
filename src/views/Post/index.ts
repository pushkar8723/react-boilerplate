import Post from 'views/Post/Post';
import PostList from 'views/Post/PostList';

const postState = {
    component: Post,
    name: 'posts',
    parent: 'app',
    redirectTo: 'posts.list',
    url: '/posts',
};

const listPostState = {
    component: PostList,
    name: 'posts.list',
    url: '/list',
};

export const states = [postState, listPostState];
