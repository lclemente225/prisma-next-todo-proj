
'use server'
import { useRouter } from 'next/navigation'
import {cookies} from 'next/headers';

export function checkCookie(){
    const router = useRouter();

    const userInfoCookie = cookies().get('userInfo') || undefined;
    
    if(userInfoCookie){ 
        router.push('todoList')
        return true
    } else return false
}
