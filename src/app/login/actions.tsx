'use server'
import { useRouter } from 'next/navigation'
import {cookies} from 'next/headers';

interface loginSubmitParams {
    e: any;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    userInfo: {
        emailValue: string;
        passwordValue: string;
    };
}
interface userInfoInterface {
    emailValue: string;
    passwordValue: string;
}

export async function loginSubmit(
    e: any, 
    setSuccessMessage: React.Dispatch<React.SetStateAction<string>>, 
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>, 
    userInfo: userInfoInterface)
    {
    e.preventDefault
    const {emailValue, passwordValue} = userInfo

    const router = useRouter();

    const userInfoCookie = cookies().get('userInfo') || undefined;
    
    if(userInfoCookie){ 
        router.push('todoList')
        return
    }

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
        setSuccessMessage("Logging in...")
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
