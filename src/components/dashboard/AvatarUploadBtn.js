/* eslint-disable arrow-body-style */
import React, { useState, useRef } from 'react';
import { Button, Modal, toaster, Message } from 'rsuite';

import { Icon } from '@rsuite/icons';
import { FaCamera } from 'react-icons/fa';

import AvatarEditor from 'react-avatar-editor';

import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';

const fileInputTypes = '.png, .jpeg, .jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = canvas => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('File Processing Error'));
            }
        });
    });
};

const AvatarUploadBtn = () => {
    const { isOpen, open, close } = useModalState();

    const { profile } = useProfile();

    const [isLoading, setIsLoading] = useState(false);

    const [img, setImg] = useState(null);
    const avatarEditorRef = useRef();

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

    const onUploadClick = async () => {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();

        setIsLoading(true);

        try {
            const blob = await getBlob(canvas);

            const avatarFileRef = storage
                .ref(`/profiles/${profile.uid}`)
                .child('avatar');
            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`,
            });

            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

            const userAvatarRef = database
                .ref(`/profiles/${profile.uid}`)
                .child('avatar');
            await userAvatarRef.set(downloadUrl);

            setIsLoading(false);

            toaster.push(
                <Message showIcon type="success" duration={4000}>
                    Profile Picture uploaded successfully.
                </Message>,
                { placement: 'topStart' }
            );
        } catch (error) {
            setIsLoading(false);

            toaster.push(
                <Message showIcon type="error" duration={4000}>
                    {error.message}
                </Message>,
                { placement: 'topStart' }
            );
        }
    };

    return (
        <div className="mt-3 text-center">
            <div>
                <ProfileAvatar
                    src={profile.avatar}
                    name={profile.name}
                    className="width-200 height-200 img-fullsize font-huge"
                />
                <label
                    htmlFor="avatar-upload"
                    className="d-block cursor-pointer padded"
                >
                    <Icon as={FaCamera} size="1.3em" /> Update Profile Picture
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
                        <Modal.Title>Profile Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                <input
                                    type="range"
                                    step="0.01"
                                    min="1"
                                    max="2"
                                    id="scale"
                                    defaultValue="1.2"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            {img && (
                                <AvatarEditor
                                    ref={avatarEditorRef}
                                    image={img}
                                    width={200}
                                    height={200}
                                    border={20}
                                    borderRadius={100}
                                />
                            )}
                        </div>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            block
                            appearance="ghost"
                            onClick={onUploadClick}
                            disabled={isLoading}
                        >
                            Upload New Picture
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AvatarUploadBtn;
