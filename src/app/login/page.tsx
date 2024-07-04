'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import prismadb from '@/db';
import { redirect } from 'next/navigation';
import GenHeader from '../ui/dashboard/GenHeader'

export default async function Login(){
    'use client'
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    return (
        <>
        <GenHeader/>
        <div className="content-container">
        <h1>Log In</h1>
        {
        errorMessage && 
        <div className="fail"> 
            {errorMessage} 
            </div> 
            }
        <input 
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
            placeholder="someone@gmail.com"/>
        <input 
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
            type="password"
            placeholder="password"/>
        <button 
            disabled={!emailValue || !passwordValue}
            >Log In</button>
        <button >Forgot Password?</button>
        <button onClick={() => redirect('/register')}>Don't have an account? Sign Up</button>
    </div>
        </>
    )
}