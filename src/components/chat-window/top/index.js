/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { memo } from 'react';

import { ButtonToolbar, IconButton } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { BsBoxArrowLeft } from 'react-icons/bs';

import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';

const Top = () => {
    const name = useCurrentRoom(state => state.name);

    const isMobile = useMediaQuery('(max-width: 992px)');

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-disappear d-flex align-items-center">
                    <IconButton
                        icon={<Icon as={BsBoxArrowLeft} size="2em" />}
                        href="/"
                        className={
                            isMobile
                                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                                : 'd-none'
                        }
                    />
                    <span className="text-disappear">{name}</span>
                </h4>

                <ButtonToolbar className="ws-nowrap">
                    <EditRoomBtnDrawer />
                </ButtonToolbar>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <span>Todo</span>
                <RoomInfoBtnModal />
            </div>
        </div>
    );
};

export default memo(Top);
