import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({message: 'Logged out successfully'}, {status:200});
        response.cookies.delete('jwt')
        return response;
    } catch (error) {
        console.error('Logout failed:', error);
        return Response.json({
            message: 'Logout failed',
            error: error.message
        }, {status: 500});
    }
} 