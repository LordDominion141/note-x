import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";
import Collection from "@/db/Collection";


// 1. GET ALL COLLECTIONS
export async function GET(request) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);

        if (!user?._id) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (response) return response;
        const collections = await Collection.find({ userId: user._id }).select('title description userId collectionItems').sort({createdAt: -1});
        return Response.json({collections}, {status: 200})
    } catch (error) {
        console.log('Error in get all collections', error);
        return Response.json({
            message: 'Internal Server Error', 
            error: error.message
        }, {status: 500});
    }
}


// 2. CREATE COLLECTION
export async function POST(request) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const body = await request.json();
        const { title, description } = body;
        if (!title) {
            return Response.json({message: 'Collection must have a title'}, {status: 404});
        }

        const newCollection = await Collection.create({
            userId: user._id,
            title,
            description,
            collectionItems: []
        });

        return Response.json({newCollection}, {status: 200});
    } catch (error) {
        console.log('Error in create collection');
        return Response.json({
            message: 'Internal Server Error',
            error: error.message
        }, {status: 500});
    }
}