/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, children, ...btnProps }) => {
    const { isOpen, close, open } = useModalState();

    const shortName = profile.name.split(' ')[0];
    const memberSince = new Date(profile.createdAt).toLocaleDateString();

    return (
        <>
            <Button {...btnProps} onClick={open}>
                {shortName}
            </Button>

            <Modal open={isOpen} onClose={close}>
                <Modal.Header>
                    <Modal.Title>{shortName}&apos;s Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">
                    <ProfileAvatar
                        src={profile.avatar}
                        name={profile.name}
                        className="width-200 height-200 img-fullsize font-huge"
                    />

                    <h4 className="mt-2">{profile.name}</h4>
                    <p>Member since {memberSince}</p>
                </Modal.Body>

                <Modal.Footer>
                    {children}
                    <Button
                        block
                        onClick={close}
                        appearance="primary"
                        color="red"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileInfoBtnModal;
