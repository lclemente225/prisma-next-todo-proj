'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GenHeader from '../ui/dashboard/GenHeader'

export default function Login(){
    'use client'
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const router = useRouter();

    function loginSubmit(e:any){
        e.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        })
        .then((res) => {
            if(res.status === 401){
                setErrorMessage(res.statusText)
            }
            return res.json()})
        .then(data => {
            setSuccessMessage(data.message)
            console.log("successs")
            router.push('/todoList')
        })
        .catch(error => {
            setErrorMessage(error.statusText)
            console.error("error logging in", error)})
    }

    return (
        <>
        <GenHeader/>
        <form 
            onSubmit={loginSubmit}
            className="flex flex-col border w-full h-90 py-5 items-center gap-2">
            <h1 className='mb-5 text-2xl'>Log In</h1>
            {
            errorMessage && 
            <div className="fail"> 
                {errorMessage}, <Link href='/' className="hover:text-red-500">Go back to home page</Link>
                </div> 
                }
            {
                successMessage &&
                <div>
                    {successMessage}
                </div>
            }
            <input 
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"
                className='w-70 text-slate-900'/>
            <input 
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password"
                className='w-70 text-slate-900'/>
            <button 
                disabled={!emailValue || !passwordValue}
                type='submit'
                className='w-50 border rounded px-4 py-2 my-4 hover:bg-slate-300 hover:cursor-pointer '>
                
                Log In
            </button>
            <button>Forgot Password?</button>

            <div>
                Don&apos;t have an account? 
                <Link href='/register'className='hover:text-green-400 mx-2'>Sign Up with Us!</Link>
            </div>
        </form>
        </>
    )
}