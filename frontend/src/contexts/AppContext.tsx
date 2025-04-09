import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AdminUserDataType } from '../utilities/types';

interface AppContextType {
    user: AdminUserDataType | undefined;
    setUser: (data: AdminUserDataType | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    // Initialize user state from localStorage on mount
    const [user, setUserState] = useState<AdminUserDataType | undefined>(() => {
        const storedUser = localStorage.getItem('userDetails');
        return storedUser ? JSON.parse(storedUser) : undefined;
    });

    // Custom setter function to update state and localStorage simultaneously
    const setUser = (data: AdminUserDataType | undefined) => {
        setUserState(data);
        if (data) {
            localStorage.setItem('userDetails', JSON.stringify(data));
        } else {
            localStorage.removeItem('userDetails');
        }
    };

    const contextData: AppContextType = { user, setUser };

    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
