/* eslint-disable arrow-body-style */
import { Icon } from '@rsuite/icons';
import React, { useEffect, useRef, useState } from 'react';

import { FaHome } from 'react-icons/fa';
import { GiChatBubble } from 'react-icons/gi';

import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
    const topSidebarRef = useRef();

    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (topSidebarRef.current) {
            setHeight(topSidebarRef.current.scrollHeight);
        }
    }, [topSidebarRef]);

    return (
        <div className="h-100 pt-2">
            <div ref={topSidebarRef}>
                <Icon as={FaHome} size="2.5em" className="mb-1" />{' '}
                <b style={{ fontFamily: 'fantasy' }}>Chat With Me</b>{' '}
                <Icon as={GiChatBubble} size="1.5em" className="mb-2" />
                <br />
                <DashboardToggle />
                <CreateRoomBtnModal />
                <br />
                <Divider>Join Conversation</Divider>
            </div>
            <ChatRoomList aboveElementHeight={height} />
        </div>
    );
};

export default Sidebar;
