export interface Notification {
  msg_id: string;
  msg: string;
  time: string;
}

export interface Settings {
  notificationCount: number;
  notificationTimeout: number;
  notificationPosition: string;
}

export interface MainPageProps {
  settings: Settings;
  notifications: Notification[];
  closeNotification: (notificationId: string) => void;
  getPositionStyle: (position: string, index: number) => React.CSSProperties;
  calculateWidth: (message: string) => number;
}
