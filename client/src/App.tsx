import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import MainPage from './MainPage';
import { Notification } from './types';
import './App.css';

const App = () => {
    const [settings, setSettings] = useState({
        notificationCount: 5,
        notificationPosition: 'Position 1', // Default notification position
        notificationTimeout: 5,
    });

    useEffect(() => {
        const eventSource = new EventSource('http://127.0.0.1:9000/events');
    
        eventSource.onmessage = (event) => {
            const newNotification: Notification = JSON.parse(event.data);
            setNotifications((prevNotifications) => {
                if (prevNotifications.length >= settings.notificationCount) {
                    // Remove the oldest notification and add the new one
                    return [...prevNotifications.slice(1), newNotification];
                } else {
                    // Add the new notification without removing any
                    return [...prevNotifications, newNotification];
                }
            });

            // Set timeout to remove notification after specified duration
            setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification.msg_id !== newNotification.msg_id)
                );
            }, settings.notificationTimeout * 1000); // Convert timeout to milliseconds
        };
    
        return () => {
            eventSource.close();
        };
    }, [settings]);

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const closeNotification = (notificationId: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.msg_id !== notificationId)
        );
    };

    const getPositionStyle = (position: string, index: number) => {
    const baseSpacing = 10; // Base spacing from the edge of the screen
    const notificationHeight = 50; // Adjust this based on your notification window height
    const marginBetweenNotifications = 80; // Margin between notifications

    // Calculate the total height of notifications displayed so far
    const totalHeight = index * (notificationHeight + marginBetweenNotifications);

    // Calculate the vertical position based on the index and total height
    let verticalPosition;
    switch (position) {
        case '1':
            verticalPosition = baseSpacing + totalHeight;
            return { top: `${verticalPosition}px`, left: `${baseSpacing}px` };
        case '2':
            verticalPosition = baseSpacing + totalHeight;
            return { top: `${verticalPosition}px`, right: `${baseSpacing}px` };
        case '3':
            verticalPosition = window.innerHeight - totalHeight - notificationHeight - baseSpacing;
            return { bottom: `${verticalPosition}px`, left: `${baseSpacing}px` };
        case '4':
            verticalPosition = window.innerHeight - totalHeight - notificationHeight - baseSpacing;
            return { bottom: `${verticalPosition}px`, right: `${baseSpacing}px` };
        default:
            verticalPosition = baseSpacing + totalHeight;
            return { top: `${verticalPosition}px`, right: `${baseSpacing}px` }; // Default to top-right
    }
};

    

    const calculateWidth = (message: string) => {
        const baseWidth = 200; 
        const extraWidthPerCharacter = 10; 
        const maxWidth = 400; 
        const calculatedWidth = baseWidth + message.length * extraWidthPerCharacter;
        return Math.min(calculatedWidth, maxWidth);
    };

    <Route path="/" element={
        <MainPage
            settings={settings}
            notifications={notifications}
            closeNotification={closeNotification}
            getPositionStyle={getPositionStyle} // Pass the getPositionStyle function as a prop
            calculateWidth={calculateWidth}
        />
    } />
    
    
    return (
        <Router>
            <div className='App'>
                <div className='notification-task-bar position-${position}'>
                    <div className="page-links-container"><h2 className="notification-task-title">Notification Tasks</h2>
                        <NavLink to="/" className={({ isActive }) => isActive ? "page-link active" : "page-link"}>Main</NavLink>
                
                        <NavLink to="/settings" className={({ isActive }) => isActive ? "page-link active" : "page-link"}>Settings</NavLink>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={
                        <MainPage
                            settings={settings}
                            notifications={notifications}
                            closeNotification={closeNotification}
                            getPositionStyle={getPositionStyle}
                            calculateWidth={calculateWidth}
                        />
                    } />
                    <Route path="/settings" element={
                        <SettingsPage settings={settings} setSettings={setSettings} />
                    } />
                </Routes>
            </div>
        </Router>
    );
    
};


export default App;
