import jwt from 'jsonwebtoken';
import User from '@/db/User';


export async function protectRoute(request) {
    try {
        const token = request.cookies.get('jwt')?.value;
        if(!token) {
            return {
                user: null,
                response: Response.json({message: 'Unauthorized - No token provided'}, {status: 401})
            }
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return {
                user: null,
                response: Response.json({message: "Unauthorized - Invalid token"}, {status: 401})
            }
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return {
                user: null,
                response: Response.json({
                message: 'User not found'
            }, {status: 404})
            }
        }

        return {user, response: null};
        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);

        return { 
            user: null,
            response: Response.json({
                message:"Internal Server Error in protectRoute middleware!", 
                error: error.message
        }, {status: 500}) 
    };
    }
}