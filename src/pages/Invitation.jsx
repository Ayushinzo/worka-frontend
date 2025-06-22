import React from 'react'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

function Invitation() {
    const [searchParams] = useSearchParams();
    const sender = searchParams.get('senderEmail'); // 'shoes'
    const receiver = searchParams.get('receverEmail');
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)
    const [success, setSuccess] = useState(false)

    async function joinUser(){
        try {
            setLoader(true)
            if (!sender || !receiver) {
                console.log("Missing parameters");
                setLoader(false)
                setLoader(false)
                return;
            }
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/joinUser?senderEmail=${sender}&receverEmail=${receiver}`);
            if (response.data.success) {
                setMessage(response.data.message)
                setLoader(false)
                setSuccess(true)
            } else {
                setMessage(response.data.message)
                setLoader(false)
                setSuccess(false)
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
            setSuccess(false)
        }
    }

    useEffect(() => {
        joinUser()
    }, [])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                window.location.href = '/user/members';
            }, 2000);
        }
    }, [success])

    return (
        <div className="min-h-screen flex items-center justify-center">
            {loader ? (
                <div>Loading...</div>
            ) : (
                <div className="text-center">
                    {message && <p className={`text-lg ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                    {success && <p className="text-sm mt-2">Redirecting to members page...</p>}
                </div>
            )}
        </div>
    )
}

export default Invitation
