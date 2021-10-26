import React, { useCallback, useState } from 'react';

import { Close, Edit, CheckOutline } from '@rsuite/icons';
import { Input, InputGroup, Tooltip, Whisper } from 'rsuite';

const EditableDescription = ({
    initialValue,
    onSave,
    label = null,
    placeholder = 'This room is for ...',
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

        if (trimmed !== initialValue) {
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
                    as="textarea"
                    rows={5}
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

export default EditableDescription;
