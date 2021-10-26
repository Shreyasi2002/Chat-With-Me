/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/custom-hooks';

const RoomInfoBtnModal = () => {
    const { isOpen, open, close } = useModalState();

    const description = useCurrentRoom(v => v.description);
    const name = useCurrentRoom(v => v.name);

    return (
        <>
            <Button appearance="link" className="px-0" onClick={open}>
                Room Information
            </Button>
            <Modal open={isOpen} onClose={close}>
                <Modal.Header>
                    <Modal.Title>
                        <b>About {name}</b>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <b className="mb-1">Decsription</b>
                    <p>
                        {description.split('\n').map(line => (
                            <>
                                {line} <br />
                            </>
                        ))}
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        block
                        onClick={close}
                        color="red"
                        appearance="ghost"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default memo(RoomInfoBtnModal);
