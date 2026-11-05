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


export async function POST(request) {
    try {

        await dbConnect();
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        const { password } = body;
        if (!email || !password) {
            return Response.json({
                message: 'Password and email required',
            }, {status: 400});
        }
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            console.log('This user does not exist');
            return Response.json({
                message: 'User not found',
            }, {status: 401})
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return Response.json({message: 'Password not correct'}, {status: 400});
        }

        const token = generateToken(user._id);

        const response = NextResponse.json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        }, {status: 200});

        response.cookies.set("jwt", token, cookieOptions);

        console.log(`${user.name} just logged in successfully.`);

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return Response.json({
            message: 'Log in Failed',
            error: error.message,
        }, {status: 500});
    }
}