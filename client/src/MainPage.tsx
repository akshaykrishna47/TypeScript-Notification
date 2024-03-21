import React, { useEffect, useState } from 'react';
import { MainPageProps, Notification } from './types';

const MainPage: React.FC<MainPageProps> = ({ settings, notifications, closeNotification, getPositionStyle, calculateWidth }) => {
    return (
        <div className="notification-container">
            {notifications.map((notification, index) => (
                <div key={notification.msg_id} className="notification-box" style={getPositionStyle(settings.notificationPosition, index)}>
                    <div>
                        <p className="notification-title">Notification {index + 1}: {notification.msg}</p>
                    </div>
                    <button className="close-button" onClick={() => closeNotification(notification.msg_id)}>
                        <div style={{ fontSize: "25px" }}>&times;</div>
                    </button>
                </div>
            ))}
        </div>
    );
};


export default MainPage;
