"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserContextType {
    user: any,
    setUser: (value: any) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>()
    useEffect(() => {
        const user = localStorage.getItem('user_info')
        if (user)
            setUser(JSON.parse(user))
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
