'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import prismadb from '@/db';
import { redirect } from 'next/navigation';
import GenHeader from '../ui/dashboard/GenHeader';

interface userInfoTypes {
    email: string;
    password: string;
    username: string;
}

export default function Register(){
    'use client'
    //@ts-ignore
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState<userInfoTypes>({email:'', password:'', username:''});
    const [isPWCorrect, setIsPWCorrect] = useState(false);
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);

    function handleUserData(e:any){
        setUserInfo((obj:userInfoTypes) => {
        return {...obj, [e.target.title]:e.target.value}
        })
    }

    function handleRegisterSubmit(e){
        console.log(JSON.stringify(userInfo))
        e.preventDefault()
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then((res) => {
            console.log("register check 1", res)
            return 
        })
        .catch(error => {
            console.log("register error", error)
            })
    }

    return (
        <>
        <GenHeader/>
        <form
            onSubmit={handleRegisterSubmit} 
            className="flex flex-col border w-full h-90 py-5 items-center gap-2 text-slate-900">
            <h1 className='mb-5 text-2xl text-slate-200'>Register</h1>
            {
            errorMessage && 
            <div className="fail"> 
                {errorMessage} 
                </div> 
                }
            <h4 className='text-slate-200'>Username</h4>    
            <input 
                value={userInfo.username}
                type="text"
                title="username"
                onChange={handleUserData}
                placeholder="username"
                className='w-70'/>
            <h4 className='text-slate-200'>Email</h4>
            {
                !isEmailCorrect && <span className='text-red-700'>Your email does not match</span>
            }
            <div className='flex gap-5'>
                <input 
                    value={userInfo.email}
                    type="email"
                    title="email"
                    onChange={handleUserData}
                    placeholder="someone@gmail.com"
                    className='w-70'/>
                <input 
                    onChange={e => {
                        if(e.target.value === userInfo.email){
                            setIsEmailCorrect(true)
                        } else {
                            setIsEmailCorrect(false)
                        }
                    }}
                    placeholder="Confirm Email"
                    className='w-70'/>
            </div>
            <h4 className='text-slate-200'>Password</h4>
            {
                !isPWCorrect && <span className=' text-red-700'>Your passwords do not match</span>
            }
            <div className='flex gap-5'>
                <input 
                    value={userInfo.password}
                    onChange={handleUserData}
                    type="password"
                    title="password"
                    placeholder="Password"
                    className='w-70'/>
                <input 
                    onChange={e => {
                        if(e.target.value === userInfo.password){
                            setIsPWCorrect(true)
                        } else {
                            setIsPWCorrect(false)
                        }
                    }}
                    type="password"
                    placeholder="Confirm Password"
                    className='w-70'/>
            </div>
            <button 
                type='submit'
                disabled={!userInfo.email || !userInfo.password}
                className='w-50 border rounded px-4 py-2 my-4 hover:bg-slate-300 hover:cursor-pointer text-slate-200 hover:text-slate-700'>
                Register
            </button>
        </form>
        </>
    )
}