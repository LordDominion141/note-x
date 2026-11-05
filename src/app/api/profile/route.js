import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";

export async function GET(request) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;

        return Response.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Error loading profile', error);
        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}