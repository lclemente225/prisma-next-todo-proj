import {cookies} from 'next/headers';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

export default function loginCheck(req: NextRequest){
    let cookie = req.cookies.get('userInfo');
    let url = req.url;
    console.log("checking cookies AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", cookie, url)

    if(cookie){
        return NextResponse.rewrite(new URL(`/todoList`, url))
    } else {
        return NextResponse.rewrite(new URL(`/login`, url))
    }
}
export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }