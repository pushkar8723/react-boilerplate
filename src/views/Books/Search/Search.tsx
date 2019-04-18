import * as React from 'react';
import Loader from 'sleek-ui/Loader';
import styledComponents from 'styled-components';
import searchGif from '../../../images/search.gif';

const Container = styledComponents.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const SearchImage = styledComponents.img`
    margin-top: -120px;
    margin-bottom: -80px;
`;

const List = styledComponents.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 1024px;
    margin: 0 auto;
`;

const ListItem = styledComponents.a`
    padding: 8px;
    display: flex;
    border-bottom: 1px solid #eee;
    text-decoration: none;
    color: #000;
    min-height: 166px;

    &:hover {
        background-color: #f2f2f2;
    }
`;

const ThumbnailContainer = styledComponents.div`
    margin-right: 8px;
    min-height: 150px;
    width: 120px;
    align-items: center;

    & > img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const TextContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

interface IBook {
    authors: string[];
    id: string;
    title: string;
    subtitle: string;
    publisher: string;
    thumbnail: string;
}

interface ISearchProps {
    global: any;
    scope: {
        books: IBook[];
    };
}

/**
 * Books Search page.
 */
export default class Search extends React.Component<ISearchProps> {
    /**
     * Renders a book
     */
    private renderListItem = (book: IBook) => {
        return (
            <ListItem key={book.id} href={`#/books/${book.id}`}>
                <ThumbnailContainer>
                    <img src={book.thumbnail} />
                </ThumbnailContainer>
                <TextContainer>
                    <h4>{book.title}</h4>
                    <div>{book.subtitle}</div>
                    <div>{book.authors && book.authors.join(', ')}</div>
                    <h5>{book.publisher}</h5>
                </TextContainer>
            </ListItem>
        );
    }

    /**
     * Render Function.
     */
    public render() {
        const { scope, global } = this.props;
        return (
            <React.Fragment>
                {
                    global.inProgress ?
                        <Loader centered={true} /> :
                        scope.books ?
                            <List>
                                {scope.books.map((book: IBook) => this.renderListItem(book))}
                            </List> :
                            <Container>
                                <SearchImage src={searchGif} />
                                <div>Search a book to begin.</div>
                            </Container>
                }
            </React.Fragment>
        );
    }
}
