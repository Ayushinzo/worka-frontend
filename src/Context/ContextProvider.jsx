import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

let Context = createContext(null)

function ContextProviderFunction({ children }) {
    const [joinedEmail, setJoinedEmail] = useState('');
    const [membersList, setMembersList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    let { user } = useAuth0()

    let value = {
        joinedEmail,
        setJoinedEmail,
        membersList,
        setMembersList,
        projectList,
        setProjectList,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProviderFunction;

export const useAuth = () => {
    return useContext(Context);
};