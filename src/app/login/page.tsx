'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import GenHeader from '../ui/dashboard/GenHeader'

export default async function Login(){
    'use client'
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    function loginSubmit(){
        fetch('/lib/login')
        .then(() => {
            
        })
    }

    return (
        <>
        <GenHeader/>
        <div className="flex flex-col border w-full h-90 py-5 items-center gap-2">
            <h1 className='mb-5 text-2xl'>Log In</h1>
            {
            errorMessage && 
            <div className="fail"> 
                {errorMessage} 
                </div> 
                }
            <input 
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"
                className='w-70'/>
            <input 
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password"
                className='w-70'/>
            <button 
                disabled={!emailValue || !passwordValue}
                onSubmit={}
                className='w-50 border rounded px-4 py-2 my-4 hover:bg-slate-300 hover:cursor-pointer '>
                
                Log In
            </button>
            <button>Forgot Password?</button>

            <div>
                Don't have an account? 
                <Link href='/register'className='hover:text-green-400 mx-2'>Sign Up with Us!</Link>
            </div>
        </div>
        </>
    )
}