import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AdminUserDataType } from '../utilities/interfaces';

interface AppContextType {
    user: AdminUserDataType | undefined;
    setUser: (data: AdminUserDataType | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState<AdminUserDataType | undefined>(undefined);

    // Data available with this context
    const contextData = { user, setUser };

    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within an AppProvider');
    return context;
};
