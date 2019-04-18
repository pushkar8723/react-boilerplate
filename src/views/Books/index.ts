import { createRoute } from 'core/stateManagement';
import { AccessType } from 'core/types';
import Books from './Books';
import BooksCtrl from './BooksCtrl';
import { Detail, DetailCtrl } from './Detail';
import { Search } from './Search';

const booksState = createRoute({
    component: Books,
    controller: BooksCtrl,
    data: {
        access: AccessType.AUTHENTICATED,
        pageTitle: 'Books',
    },
    name: 'books',
    redirectTo: 'books.search',
    url: '/books',
});

const booksSearchState = createRoute({
    component: Search,
    data: {
        access: AccessType.AUTHENTICATED,
        pageTitle: 'Books Search',
    },
    name: 'books.search',
    url: '/',
});

const booksDetailState = createRoute({
    component: Detail,
    controller: DetailCtrl,
    data: {
        access: AccessType.AUTHENTICATED,
        pageTitle: 'Books Detail',
    },
    name: 'books.detail',
    url: '/:id',
});

export const states = [booksState, booksSearchState, booksDetailState];
