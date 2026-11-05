import Note from "@/db/Note";
import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";


// 1. GET ALL NOTES FOR THIS USER
export async function GET(request) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;

        const notes = await Note.find({ userId: user._id }).select('title').sort({createdAt: -1}).lean();
        return Response.json({
            notes,
        }, {status: 200});

    } catch (error) {
        console.log('Error finding all notes', error);
        return Response.json({message: "Internal server error", error: error.message}, {status: 500});
    }
}


// 2. CREATE NEW NOTE FOR THIS USER
export async function POST(request) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;

        const reqBody = await request.json();
        const { title, body } = reqBody;

        if (!title || !body) {
            return Response.json({
                message: 'Title and Body required'
            }, {status: 404});
        }

        const newNote = await Note.create({
            title,
            body,
            userId: user._id
        });

        return Response.json({
            newNote
        }, {status: 200});
    } catch (error) {
        console.log('Error creating a new note', error);
        return Response.json({
            message: 'Internal server error',
            error: error.message
        })
    }
}