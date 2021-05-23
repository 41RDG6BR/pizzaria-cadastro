import React, { createContext, useCallback, useState } from 'react'
import t from 'prop-types'
import firebase from '../services/firebase'

const AuthContext = createContext()

function AuthProvider ({children}) {
    const [userInfo, setUserInfo] = useState({
        isUserLoggedIn: false,
        user: null
    })

    const loginGit = useCallback(()=>{
        const provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider)
    }, [])

    const loginGoogle = useCallback(()=>{
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
    }, [])

    const logout = useCallback(() => {
        firebase.auth().signOut().then(()=>{
            console.log('Deslogou')
            setUserInfo({
                isUserLoggedIn: false,
                user: null
            })
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            loginGit,
            loginGoogle,
            logout,
            userInfo,
            setUserInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: t.node.isRequired
}

export { AuthProvider, AuthContext }