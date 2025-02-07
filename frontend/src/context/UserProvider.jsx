import React, { createContext, useState } from 'react'


export const UserContext = createContext()


const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    //update user data func
    const updateUser = (userData) => {
        setUser(userData);
    }

    //function to the clear current user
    const clearUser = () => {
        setUser(null);
    }
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider