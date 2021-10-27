/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Icon } from '@rsuite/icons';
import { FaMicrophoneAlt } from 'react-icons/fa';

import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';

import React, { useCallback, useState } from 'react';
import { InputGroup, Message, toaster } from 'rsuite';
import { storage } from '../../../misc/firebase';

const AudioMsgBtn = ({ afterUpload }) => {
    const { chatId } = useParams();
    const [isRecording, setisRecording] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

    const onClick = useCallback(() => {
        setisRecording(p => !p);
    }, []);

    const onUpload = useCallback(
        async data => {
            setIsUploading(true);
            try {
                const snap = await storage
                    .ref(`/chat/${chatId}`)
                    .child(`audio_${Date.now()}.webm`)
                    .put(data.blobFile, {
                        cacheControl: `public, max-age=${3600 * 24 * 3}`,
                    });

                const file = {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL(),
                };

                setIsUploading(false);
                afterUpload([file]);
            } catch (error) {
                setIsUploading(false);

                toaster.push(
                    <Message showIcon type="error" duration={4000}>
                        {error.message}
                    </Message>
                );
            }
        },
        [afterUpload, chatId]
    );

    return (
        <>
            <InputGroup.Button
                onClick={onClick}
                disabled={isUploading}
                className={isRecording ? 'animate-blink' : ''}
            >
                <Icon as={FaMicrophoneAlt} size="1.5em" />
                <ReactMic
                    record={isRecording}
                    className="d-none"
                    onStop={onUpload}
                />
            </InputGroup.Button>
        </>
    );
};

export default AudioMsgBtn;
