import * as React from 'react';
import Loader from 'sleek-ui/Loader';
import styled from 'styled-components';
import bookIcon from '../../../images/bookIcon.png';
import { Error404 } from '../../Error';

const Container = styled.div`
    flex: 1;
    max-width: 1024px;
    padding: 8px;
    margin: 0 auto;
`;

const HeroContainer = styled.div`
    display: flex;
    min-height: 166px;
`;

const ThumbnailContainer = styled.div`
    margin-right: 8px;
    min-height: 150px;
    width: 120px;
    align-items: center;

    & > img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
`;

const Title = styled.h1`
    margin: 0 0 5px 0;
`;

const DescriptionContainer = styled.div`
    text-align: justify;
`;

const Label = styled.div`
    font-size: 12px;
    font-weight: bold;
`;

const P = styled.div`
    margin-bottom: 10px;
`;

interface IISBN {
    type: string;
    identifier: number;
}

interface IDetailProps {
    global: any;
    scope: {
        data: {
            id: string,
            volumeInfo: {
                authors: string[],
                averageRating: number,
                categories: string[],
                description: string,
                imageLinks: {
                    thumbnail: string,
                }
                industryIdentifiers: IISBN[],
                pageCount: number,
                publisher: string,
                ratingsCount: number,
                subtitle: string,
                title: string,
            },
        },
    };
    getBook: (bookId: string) => void;
}

/**
 * Books Detail page's component
 */
class Detail extends React.Component<IDetailProps> {
    constructor(props: any) {
        super(props);
        this.props.getBook(props.$stateParams.id);
    }

    /**
     * Renders the book's information.
     */
    private renderBook = () => {
        const { volumeInfo } = this.props.scope.data;
        return (
            <Container>
                <HeroContainer>
                    <ThumbnailContainer>
                        <img
                            src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail ||
                                bookIcon}
                        />
                    </ThumbnailContainer>
                    <TextContainer>
                        <Title>{volumeInfo.title}</Title>
                        <div>{volumeInfo.subtitle}</div>
                        <h4>{volumeInfo.publisher}</h4>
                        {
                            volumeInfo.averageRating ?
                            <div>
                                <strong>Rating: </strong>
                                {volumeInfo.averageRating} / 5 ({volumeInfo.ratingsCount})
                            </div> :
                            <div>Not rated yet!</div>
                        }
                    </TextContainer>
                </HeroContainer>
                <DescriptionContainer>
                    <h3>Description</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: volumeInfo.description,
                        }}
                    />
                </DescriptionContainer>
                <DescriptionContainer>
                    <h3>Additional Information</h3>
                    <P>
                        <Label>Page Count</Label>
                        <div>{volumeInfo.pageCount}</div>
                    </P>
                    {
                        volumeInfo.categories &&
                        <P>
                            <Label>Categories</Label>
                            <div>
                                {volumeInfo.categories.map(category =>
                                    <div key={category}>{category}</div>)}
                            </div>
                        </P>
                    }
                    {
                        volumeInfo.industryIdentifiers &&
                        <P>
                            <Label>ISBN</Label>
                            <div>
                                {volumeInfo.industryIdentifiers.map(identifier =>
                                    <div key={identifier.identifier}>
                                        {identifier.type} : {identifier.identifier}
                                    </div>)}
                            </div>
                        </P>
                    }
                </DescriptionContainer>
            </Container>
        );
    }

    /**
     * Render method.
     */
    public render() {
        if (this.props.global.inProgress) {
            return <Loader centered={true} />;
        }
        if (!this.props.scope.data) {
            return <Error404 />;
        }
        return this.renderBook();
    }
}

export default Detail;
