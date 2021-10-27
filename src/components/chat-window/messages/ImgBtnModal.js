/* eslint-disable arrow-body-style */
import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';

const ImgBtnModal = ({ src, fileName }) => {
    const { isOpen, open, close } = useModalState();
    return (
        <>
            <input
                type="image"
                src={src}
                alt="file"
                onClick={open}
                className="mw-100 mh-100 w-auto"
            />
            <Modal open={isOpen} onClose={close}>
                <Modal.Header>
                    <Modal.Title>{fileName}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">
                    <div>
                        <img src={src} height="100%" width="100%" alt="file" />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button>
                        <a href={src} target="_blank" rel="noopener noreferrer">
                            View Original
                        </a>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImgBtnModal;
