import { UIView } from '@uirouter/react';
import * as React from 'react';
import Drawer from 'sleek-ui/Drawer';
import styledComponents from 'styled-components';

const Toolbar = styledComponents.div`
    min-height: 64px;
    display: flex;
    align-items: center;
    padding: 0 4px 0 16px;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    justify-content: center;
`;

const Form = styledComponents.form`
    flex: 1;
    display: flex;
`;

const Input = styledComponents.input`
    border: none;
    height: 40px;
    font-size: 18px;
    padding: 0 16px;
    flex: 1;
`;

const Icon = styledComponents.i`
    height: 24px;
    width: 24px;
    border-radius: 2px;
    padding: 8px;
    cursor: pointer;
    vertical-align: middle;

    &:hover {
        background-color: #f2f2f2;
    }
`;

const MenuIcon = styledComponents.i`
    height: 24px;
    width: 24px;
    border-radius: 2px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 10px;
`;

const DrawerHeaderContainer = styledComponents.div`
    display: flex;
    align-items: center;
`;

const DrawerHeaderText = styledComponents.div`
    padding-left: 16px;
`;

const UIViewContainer = styledComponents.div`
    display: flex;
    flex: 1;
    overflow: auto;
`;

const ListItem = styledComponents.a`
    display: block;
    padding: 16px;
    background-color: #fff;
    border: none;
    font-size: 14px;
    text-decoration: none;
    color: #000;
    line-height: 24px;
    cursor: pointer;

    &:hover {
        background-color: #f2f2f2;ß
    }
`;

const NameContainer = styledComponents.h4`
    margin-bottom: 8px;
`;

/**
 * Root Books class
 */
class Books extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputText: '',
            open: false,
        };
        if (!this.props.global.auth) {
            this.props.updateGlobalAuth();
        }
    }

    /**
     * Toggles the drawer.
     */
    private toggleDrawer = () => {
        this.setState({
            open: !this.state.open,
        });
    }

    /**
     * Renders the drawer header.
     */
    private renderDrawerHeader = () => {
        if (this.props.global && this.props.global.auth) {
            return (
                <DrawerHeaderContainer>
                    <i className="material-icons">account_circle</i>
                    <DrawerHeaderText>
                        <NameContainer>{this.props.global.auth.name}</NameContainer>
                        <h5>{this.props.global.auth.email}</h5>
                    </DrawerHeaderText>
                </DrawerHeaderContainer>
            );
        }
        return null;
    }

    /**
     * Handles the onChange event of the input field.
     */
    private handleInputTextChange = (event: React.SyntheticEvent) => {
        const value = event.target.value;
        this.setState({
            inputText: value,
        });
    }

    /**
     * Search for a Book.
     */
    private searchBook = (event: React.SyntheticEvent<any>) => {
        event.preventDefault();
        this.props.loadBook(this.state.inputText);
        return false;
    }

    /**
     * Render function
     */
    public render() {
        return (
            <React.Fragment>
                <Toolbar>
                    <i className="material-icons">search</i>
                    <Form onSubmit={this.searchBook}>
                        <Input
                            onChange={this.handleInputTextChange}
                            placeholder="Search a book ..."
                            value={this.state.inputText}
                            required={true}
                        />
                    </Form>
                    <Icon
                        className="material-icons"
                        onClick={this.toggleDrawer}
                    >
                        menu
                    </Icon>
                </Toolbar>
                <Drawer
                    open={this.state.open}
                    headerContent={this.renderDrawerHeader()}
                    data={<React.Fragment>
                        <ListItem href="#/" onClick={this.toggleDrawer}>
                            <MenuIcon className="material-icons">home</MenuIcon>
                            Home
                        </ListItem>
                        <ListItem onClick={this.props.logout}>
                            <MenuIcon className="material-icons">exit_to_app</MenuIcon>
                            Logout
                        </ListItem>
                    </React.Fragment>}
                    closeOnEsc={true}
                    handleOverlayLayerClick={this.toggleDrawer}
                    width={320}
                />
                <UIViewContainer>
                    <UIView />
                </UIViewContainer>
            </React.Fragment>);
    }
}

export default Books;
