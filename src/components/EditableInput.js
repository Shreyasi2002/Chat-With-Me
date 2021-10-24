/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';

import { Close, Edit, CheckOutline } from '@rsuite/icons';
import { Input, InputGroup, toaster, Message, Tooltip, Whisper } from 'rsuite';

const EditableInput = ({
    initialValue,
    onSave,
    label = null,
    placeholder = 'Write your Username',
    emptyMsg = 'Your Username cannot be empty ...',
    ...inputProps
}) => {
    const [input, setInput] = useState(initialValue);
    const [isEditable, setIsEditable] = useState(false);

    const onInputChange = useCallback(value => {
        setInput(value);
    }, []);

    const onEditClick = useCallback(() => {
        setIsEditable(p => !p);
        setInput(initialValue);
    }, [initialValue]);

    const onSaveClick = async () => {
        const trimmed = input.trim();

        if (trimmed === '') {
            toaster.push(
                <Message showIcon type="warning" duration={4000}>
                    {emptyMsg}
                </Message>,
                { placement: 'topStart' }
            );
            setInput(initialValue);
        }

        if (trimmed !== initialValue && trimmed !== '') {
            await onSave(trimmed);
        }

        setIsEditable(false);
    };

    return (
        <div>
            {label}
            <InputGroup>
                <Input
                    {...inputProps}
                    disabled={!isEditable}
                    placeholder={placeholder}
                    value={input}
                    onChange={onInputChange}
                />

                <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={
                        <Tooltip>
                            {isEditable ? 'Discard Changes' : 'Edit'}
                        </Tooltip>
                    }
                >
                    <InputGroup.Button onClick={onEditClick}>
                        {isEditable ? (
                            <Close style={{ color: 'red' }} />
                        ) : (
                            <Edit />
                        )}
                    </InputGroup.Button>
                </Whisper>

                {isEditable && (
                    <Whisper
                        placement="top"
                        controlId="control-id-hover"
                        trigger="hover"
                        speaker={<Tooltip>Save Changes</Tooltip>}
                    >
                        <InputGroup.Button onClick={onSaveClick}>
                            <CheckOutline style={{ color: 'green' }} />
                        </InputGroup.Button>
                    </Whisper>
                )}
            </InputGroup>
        </div>
    );
};

export default EditableInput;
