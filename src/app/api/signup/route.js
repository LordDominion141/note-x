// 1. IMPORT DEPENDENCIES
import User from "@/db/User";
import dbConnect from "@/libs/dbConnect";
import generateToken from "@/utils/generateToken";
import { NextResponse } from "next/server.js";


// 2. CREATE COOKIE OPTIONS
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60,
};


// 3. INITIALIZE MY POST REQUEST HANDLER FUNCTION
export async function  POST(request) {
    try {
        await dbConnect();
        // 4. EXTRACT THE PARAMETERS FROM THE BODY
        const body = await request.json();
        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        const { password } = body;

        if (!name || !email || !password) {
            return Response.json({ message: 'Name, email, and password are required' }, { status: 400 });
        }

        // 5. CHECK IF A USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });

        // 6. RETURN IF HE DOES ALREADY EXIST
        if(existingUser) {
            return Response.json({message: 'A user with this email already exists'}, {status: 400});
        }

        // 7. NOW YOU CAN CREATE A NEW USER
        const newUser = await User.create({
            name,
            email,
            password
        });

        // 8. GENERATE YOUR TOKEN FOR THE USER SESSION
        const token = generateToken(newUser._id);

        // 9. SINCE THIS IS NOT NODEJS, WE HAVE TO USE NEXTRESPONSE TO PASS OUR TOKEN, AND OUR COOKIES
        const response = NextResponse.json({
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        }, {status: 201});

        // 10. THAT'S IT, PASS THE COOKIE OPTIONS AND TOKENS TO YOUR COOKIES TO MAKE A NEW SESSION ON CREATE
        response.cookies.set('jwt', token, cookieOptions);

        // 11. CONSOLE LOG WHEN SUCCESSFUL
        console.log(`${newUser.name} Just signed up successfully.`);


        // 12. RETURN THE RESPONSE OBJECT
        return response;
        
    } catch (error) {
        // 13. HANDLE ERRORS
        console.error("Signup Controller Error:", error);

        return Response.json({ 
            message: "Sign up Failed", 
            error: error.message
        }, {status: 500});
    }
}