/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useCallback, useRef, useState } from 'react';

import { Icon } from '@rsuite/icons';
import { VscTools } from 'react-icons/vsc';

import firebase from 'firebase/compat/app';

import { Button, Form, Input, Modal, Schema, toaster, Message } from 'rsuite';

import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
));

const INITIAL_FORM = {
    name: '',
    description: '',
};

const { StringType } = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired('Name is required to create a Chat Room'),
    description: StringType(),
});

const CreateRoomBtnModal = () => {
    const { isOpen, open, close } = useModalState();

    const [formValue, setFormValue] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef();

    const onFormChange = useCallback(value => {
        setFormValue(value);
    }, []);

    const onSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }
        setIsLoading(true);

        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
        };

        try {
            await database.ref('rooms').push(newRoomData);

            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            close();

            toaster.push(
                <Message showIcon type="success" duration={4000}>
                    Success: Created new Chat Room - {formValue.name}
                </Message>
            );
        } catch (error) {
            setIsLoading(false);

            toaster.push(
                <Message showIcon type="error" duration={4000}>
                    {error.message}
                </Message>
            );
        }
    };

    return (
        <div className="mt-2">
            <Button block color="green" appearance="primary" onClick={open}>
                <Icon as={VscTools} size="1.5em" /> Create new Chat Room
            </Button>

            <Modal open={isOpen} onClose={close}>
                <Modal.Header>
                    <Modal.Title>Chat Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        onChange={onFormChange}
                        formValue={formValue}
                        model={model}
                        ref={formRef}
                    >
                        <Form.Group>
                            <Form.ControlLabel>Room name</Form.ControlLabel>
                            <Form.Control
                                name="name"
                                placeholder="Enter Chat Room name..."
                            />
                            <Form.HelpText>Name is required</Form.HelpText>
                        </Form.Group>

                        <Form.Group controlId="textarea">
                            <Form.ControlLabel>Description</Form.ControlLabel>
                            <Form.Control
                                rows={6}
                                name="description"
                                placeholder="Describe..."
                                accepter={Textarea}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        block
                        color="blue"
                        appearance="primary"
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        Create new Chat Room
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateRoomBtnModal;

// VscTools
