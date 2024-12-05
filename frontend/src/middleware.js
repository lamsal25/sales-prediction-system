import React from 'react'
import getSession from './helpers/getSession'
import { NextResponse } from 'next/server'
import { alert } from '@material-tailwind/react'

export async function middleware(request) {
    const sessionId = await getSession()
    const path = request.nextUrl.pathname
   
    const isPublicPath = path === '/login' || path === '/register'
    const isPrivatePath =  path==='/prediction'

    if(isPublicPath && sessionId){
        return NextResponse.redirect(new URL('/',request.url))
    }
    if(isPrivatePath && !sessionId){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}