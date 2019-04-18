import PromptDialog from 'components/PromptDialog';
import * as React from 'react';
import Loader from 'sleek-ui/Loader';
import Tooltip from 'sleek-ui/Tooltip';
import styledComponents from 'styled-components';

const Container = styledComponents.div`
    padding: 16px 0 ;
    flex: 1;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const VersionText = styledComponents.h3`
    border-bottom: 2px solid #DD1C1A;
    margin-bottom: 0;
    padding: 8px 16px;
`;

/**
 * Books Detail page's component
 */
class Detail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.props.getBook(props.$stateParams.id);
    }

    /**
     * TODO
     */
    private renderVersions = () => {
        return (<div />);
    }

    /**
     * Render method.
     */
    public render() {
        return (
            <Container>
                <VersionText>Available Versions</VersionText>
                {
                    this.props.global.inProgress
                    ? <Loader centered={true} />
                    : this.renderVersions()
                }
            </Container>
        );
    }
}

export default Detail;
