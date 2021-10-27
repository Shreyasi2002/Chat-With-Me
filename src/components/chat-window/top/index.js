/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { memo } from 'react';

import { ButtonToolbar, Divider, IconButton } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';

const Top = () => {
    const name = useCurrentRoom(state => state.name);
    const isAdmin = useCurrentRoom(v => v.isAdmin);

    const isMobile = useMediaQuery('(max-width: 992px)');

    return (
        <div style={{ marginTop: '-2%' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-disappear d-flex align-items-center">
                    <IconButton
                        icon={<Icon as={BsBoxArrowLeft} size="1.5em" />}
                        href="/"
                        className={
                            isMobile
                                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                                : 'd-none'
                        }
                    />
                    <span className="text-disappear">{name} </span>{' '}
                    <RoomInfoBtnModal />
                    <Divider vertical />
                    <ButtonToolbar className="ws-nowrap">
                        {isAdmin && <EditRoomBtnDrawer />}
                    </ButtonToolbar>
                </h4>

                <>
                    <IconButton
                        icon={
                            <Icon as={AiOutlineClose} color="red" size="1em" />
                        }
                        href="/"
                        size="sm"
                        className={
                            !isMobile
                                ? 'd-inline-block p-0 text-blue link-unstyled'
                                : 'd-none'
                        }
                        style={{ marginTop: '-2%' }}
                    />
                </>
            </div>
        </div>
    );
};

export default memo(Top);
