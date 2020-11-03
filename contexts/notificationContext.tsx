import React, {createContext, useState} from 'react';

export const NotificationContext = createContext({
  notify: true,
  setNotify: (value: boolean) => {},
});

const NotificatonContextProvider: React.FC = ({children}) => {
  const [notify, setNotify] = useState(true);

  return (
    <NotificationContext.Provider
      value={{notify, setNotify: (value: boolean) => setNotify(value)}}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificatonContextProvider;
