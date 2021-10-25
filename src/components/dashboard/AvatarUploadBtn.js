/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Button, Modal, toaster, Message } from 'rsuite';

import AvatarEditor from 'react-avatar-editor';

import { useModalState } from '../../misc/custom-hooks';

const fileInputTypes = '.png, .jpeg, .jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const isValidFile = file => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
    const { isOpen, open, close } = useModalState();

    const [img, setImg] = useState(null);

    const onFileInputChange = ev => {
        const currFiles = ev.target.files;

        if (currFiles.length === 1) {
            const file = currFiles[0];
            if (isValidFile(file)) {
                setImg(file);
                open();
            } else {
                toaster.push(
                    <Message showIcon type="warning" duration={4000}>
                        You can not upload {file.type}
                    </Message>,
                    { placement: 'topStart' }
                );
            }
        }
    };

    return (
        <div className="mt-3 text-center">
            <div>
                <label
                    htmlFor="avatar-upload"
                    className="d-block cursor-pointer padded"
                >
                    Select new Avatar
                    <input
                        id="avatar-upload"
                        type="file"
                        className="d-none"
                        accept={fileInputTypes}
                        onChange={onFileInputChange}
                    />
                </label>

                <Modal open={isOpen} onClose={close}>
                    <Modal.Header>
                        <Modal.Title>Upload New Avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            {img && (
                                <AvatarEditor
                                    image={img}
                                    width={200}
                                    height={200}
                                    border={50}
                                    borderRadius={100}
                                    color={[255, 255, 255, 0.6]} // RGBA
                                    scale={1.2}
                                    rotate={0}
                                />
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance="ghost">
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AvatarUploadBtn;
