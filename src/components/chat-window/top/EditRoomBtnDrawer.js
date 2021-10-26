/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Divider, Drawer, toaster, Message } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableDescription from '../../EditableDescription';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
    const { isOpen, open, close } = useModalState();
    const { chatId } = useParams();

    const isMobile = useMediaQuery('(max-width: 992px)');

    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);

    const updateData = (key, value) => {
        database
            .ref(`rooms/${chatId}`)
            .child(key)
            .set(value)
            .then(() => {
                toaster.push(
                    <Message showIcon type="success" duration={4000}>
                        Updated Successfully
                    </Message>,
                    { placement: 'topEnd' }
                );
            })
            .catch(err => {
                toaster.push(
                    <Message showIcon type="error" duration={4000}>
                        {err.message}
                    </Message>,
                    { placement: 'topStart' }
                );
            });
    };

    const onNameSave = newName => {
        updateData('name', newName);
    };

    const onDescriptionSave = newDescription => {
        updateData('description', newDescription);
    };

    return (
        <div>
            <Button className="br-circle" size="sm" color="red" onClick={open}>
                A
            </Button>

            <Drawer
                full={isMobile}
                open={isOpen}
                onClose={close}
                placement="right"
            >
                <Drawer.Header>
                    <Drawer.Title>Edit Room</Drawer.Title>
                </Drawer.Header>

                <Drawer.Body
                    style={{
                        marginLeft: '-6%',
                        marginRight: '-6%',
                    }}
                >
                    <EditableInput
                        initialValue={name}
                        onSave={onNameSave}
                        label={<h6 className="mb-2">Name</h6>}
                        emptyMsg="Name of a Chat room cannot be empty"
                    />

                    <br />

                    <EditableDescription
                        initialValue={description}
                        onSave={onDescriptionSave}
                        label={<h6 className="mb-2">Description</h6>}
                    />

                    <br />
                    <br />

                    <Divider />

                    <Drawer.Actions>
                        <Button
                            block
                            onClick={close}
                            color="red"
                            appearance="primary"
                        >
                            Close
                        </Button>
                    </Drawer.Actions>
                </Drawer.Body>
            </Drawer>
        </div>
    );
};

export default memo(EditRoomBtnDrawer);
