"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserContextType {
    user: any,
    setUser: (value: any) => void,
    logOut: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>()
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem('user_info')
        if (user)
            setUser(JSON.parse(user))
    }, [])

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_expire");
        localStorage.removeItem("user_info");

        setUser(null);

        router.push('/login');
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                logOut
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
