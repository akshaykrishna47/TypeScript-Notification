import React from 'react';
import { Settings } from './types';

interface SettingsPageProps {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings }) => {
    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings({
            ...settings,
            [name]: name === 'notificationCount' || name === 'notificationTimeout' ? parseInt(value, 10) : value,
        });
    };

    return (
        <div className="settings-container">
            <form id="notificationForm">
                <div className="bar">
                    <label className="label-bar" htmlFor="notificationCount">Notification Count</label>
                    <div className="options-bar">
                        <input type="number" id="notificationCount" name="notificationCount" value={settings.notificationCount || ""} onChange={handleUpdate} />
                    </div>
                </div>

                <div className="bar">
                    <label className="label-bar">Notification Position</label>
                    <div className="options-bar">
                        <label htmlFor="topLeft">Position 1</label>
                        <input type="radio" id="topLeft" value="1" name="notificationPosition" onChange={handleUpdate} checked={settings.notificationPosition === "1"} />
                        <label htmlFor="topRight">Position 2</label>
                        <input type="radio" id="topRight" value="2" name="notificationPosition" onChange={handleUpdate} checked={settings.notificationPosition === "2"} />
                        <label htmlFor="bottomLeft">Position 3</label>
                        <input type="radio" id="bottomLeft" value="3" name="notificationPosition" onChange={handleUpdate} checked={settings.notificationPosition === "3"} />
                        <label htmlFor="bottomRight">Position 4</label>
                        <input type="radio" id="bottomRight" value="4" name="notificationPosition" onChange={handleUpdate} checked={settings.notificationPosition === "4"} />
                    </div>
                </div>

                <div className="bar">
                    <label className="label-bar" htmlFor="notificationDisappearTime">Notification Disappear Time</label>
                    <div className="options-bar">
                        <input type="number" id="notificationDisappearTime" name="notificationTimeout" value={settings.notificationTimeout || ""} onChange={handleUpdate} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
