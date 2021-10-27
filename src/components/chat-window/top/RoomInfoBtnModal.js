/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { Button, IconButton, Modal } from 'rsuite';

import { Icon } from '@rsuite/icons';
import { HiInformationCircle } from 'react-icons/hi';

import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/custom-hooks';

const RoomInfoBtnModal = () => {
    const { isOpen, open, close } = useModalState();

    const description = useCurrentRoom(v => v.description);
    const name = useCurrentRoom(v => v.name);

    return (
        <>
            <IconButton
                icon={<Icon as={HiInformationCircle} />}
                className="px-0 ml-1"
                onClick={open}
                style={{ marginTop: '-2%' }}
            />
            {/* Room Information */}
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
