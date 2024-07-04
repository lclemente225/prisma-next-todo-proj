import React from 'react'
import Link from 'next/link'
import prismadb from '@/db';
import { redirect } from 'next/navigation';
import GenHeader from '../ui/dashboard/GenHeader';

async function createTodo(data:FormData){  
    "use server"
    const title = data.get("title")?.valueOf();
    let duration = data.get("duration")?.valueOf();
    //@ts-ignore
    duration = parseInt(duration);
    if(typeof title !== 'string' || title.length === 0){
        throw new Error("invalid title")
    }

    if(typeof duration !== 'number' || !duration){
      throw new Error("invalid duration")
    }

    await prismadb.todo.create({
        data:{
            title,
            duration, 
            complete: false
        }
    })
    redirect("/todoList")
}

export default async function Register(){
    'use client'
    return (
        <>
        <GenHeader/>
        Register
        </>
    )
}