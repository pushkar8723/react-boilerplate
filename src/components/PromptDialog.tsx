import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button, { BUTTON_TYPES } from 'sleek-ui/Button';
import Dialog from 'sleek-ui/Dialog';
import Input from 'sleek-ui/Input';
import styledComponents from 'styled-components';

const DialogContent = styledComponents.div`
    padding: 16px;
`;

/**
 * Class to automatically render a confirmation dialog and
 * handle all Button events for easy and consistent ux.
 */
export default class PromptDialog {
    /**
     * Header text of dialog.
     */
    private header: string;

    /**
     * Body of dialog. Can be a JSX or a string.
     */
    private body: Element | string;

    /**
     * Accept button text.
     */
    private yesText: string;

    /**
     * Reject button text.
     */
    private noText: string;

    /**
     * DOM node inside which dialog will be rendered.
     */
    private div: Element;

    /**
     * Props to be passed to input
     */
    private inputProps: any;

    /**
     * Callback when user accepts the prompt.
     */
    private resolve: () => void;

    /**
     * Callback when user rejects the prompt.
     */
    private reject: () => void;

    /**
     * Value of input
     */
    private value: string | number;

    /**
     * Constructor to initialize class's private variables.
     *
     * @param header
     * @param body
     * @param yesText
     * @param noText
     */
    constructor(header: string, body: Element | string, inputProps: any,
                yesText: string = 'Yes', noText: string = 'No') {
        this.header = header;
        this.body = body;
        this.inputProps = inputProps;
        this.yesText = yesText;
        this.noText = noText;
        this.div = document.createElement('div');
    }

    /**
     * Function to close the dialog and unmount the dom node.
     */
    private close = (callback: (value: string | number) => void) => {
        ReactDOM.unmountComponentAtNode(this.div);
        this.div.remove();
        callback(this.value);
    }

    /**
     * Submits the value
     */
    private accept = () => {
        this.close(this.resolve);
    }

    /**
     * Closes the dialog
     */
    private cancel = () => {
        this.close(this.reject);
    }

    /**
     * Updates the value
     */
    private handleInputChange = (value: string | number) => {
        this.value = value;
    }

    /**
     * Opens the dialog and returns a promise.
     * If user accepts, then the promise resolves.
     * Otherwise promise is rejected.
     */
    public show = () => {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            document.body.appendChild(this.div);
            ReactDOM.render(
                <Dialog
                    open={true}
                    headerContent={this.header}
                    footerContent={
                        <div>
                            <Button
                                classNamePrefix="action"
                                label={this.noText}
                                onClick={this.cancel}
                                type={BUTTON_TYPES.TERTIARY}
                            />
                            <Button
                                classNamePrefix="action"
                                label={this.yesText}
                                onClick={this.accept}
                                type={BUTTON_TYPES.PRIMARY}
                            />
                        </div>
                    }
                >
                    <DialogContent>
                        <p>{this.body}</p>
                        <Input
                            {...this.inputProps}
                            value={this.value}
                            onChange={this.handleInputChange}
                        />
                    </DialogContent>
                </Dialog>,
                this.div,
            );
        });
    }
}
