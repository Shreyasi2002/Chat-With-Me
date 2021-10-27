/* eslint-disable arrow-body-style */
import { Icon } from '@rsuite/icons';

import { IoAttach } from 'react-icons/io5';
import { useParams } from 'react-router';

import React, { useState } from 'react';
import { InputGroup, Modal, Button, Uploader, toaster, Message } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';

const MAX_FILE_SIZE = 1000 * 1024 * 10;

const AttachmentBtnModal = ({ afterUpload }) => {
    const { chatId } = useParams();
    const { isOpen, close, open } = useModalState();

    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onChange = fileArr => {
        const filtered = fileArr
            .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
            .slice(0, 5);

        setFileList(filtered);
    };

    const onUpload = async () => {
        try {
            const uploadPromises = fileList.map(f => {
                return storage
                    .ref(`/chat/${chatId}`)
                    .child(Date.now() + f.name)
                    .put(f.blobFile, {
                        cacheControl: `public, max-age=${3600 * 24 * 3}`,
                    });
            });

            const uploadSnapShots = await Promise.all(uploadPromises);

            const shapePromises = uploadSnapShots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL(),
                };
            });

            const files = await Promise.all(shapePromises);

            await afterUpload(files);
            setIsLoading(false);
            close();
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
        <>
            <InputGroup.Button onClick={open}>
                <Icon as={IoAttach} size="2em" />
            </InputGroup.Button>

            <Modal open={isOpen} onClose={close}>
                <Modal.Header>
                    <Modal.Title>
                        <b>Upload Files</b>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Uploader
                        fileList={fileList}
                        autoUpload={false}
                        action=""
                        onChange={onChange}
                        multiple
                        listType="picture-text"
                        disabled={isLoading}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        block
                        color="blue"
                        appearance="primary"
                        disabled={isLoading}
                        onClick={onUpload}
                    >
                        Send
                    </Button>
                    <div className="text-right mt-2">
                        <small>* only files less than 10 mb are allowed</small>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AttachmentBtnModal;
