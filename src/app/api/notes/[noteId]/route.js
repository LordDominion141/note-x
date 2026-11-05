import Note from "@/db/Note";
import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";




// 1. GET NOTE BY ID.
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const { noteId } = await params;
        const note = await Note.findOne({ _id: noteId, userId: user._id  });
        if(!note) {
            return Response.json({
                message: 'Note not found'
            }, {status: 404});
        }

        return Response.json({note}, {status: 200});
        
    } catch (error) {
        console.log("Error in Get note by id.");
        return Response.json({message: 'Internal Server Error', error: error.message}, {status: 500});
    }
}




// 2. UPDATE/EDIT NOTE
export async function PATCH(request, { params }) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;

        const { noteId } = await params;
        const requestBody = await request.json();
        const { title, body } = requestBody?.data ?? requestBody ?? {};

        if (title === undefined && body === undefined) {
            return Response.json({ message: 'Provide a title or body to update' }, { status: 400 });
        }

        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, userId: user._id },
            { $set: { title, body } },
            { new: true, runValidators: true }
        );

        if(!updatedNote) {
            return Response.json({
                message: 'Could not update note OR note not found'
            }, {status: 404});
        }

        return Response.json({updatedNote}, {status: 200});

    } catch (error) {
        console.log("Error in Update Note.");
        return Response.json({message: 'Internal Server Error', error: error.message}, {status: 500});
    }
}



// 3. DELETE NOTE
export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const { noteId } = await params;
        const deletedNote = await Note.findOneAndDelete({_id: noteId, userId: user._id});

        if (!deletedNote) {
            return Response.json({message: 'No not found to be deleted'}, {status: 404});
        }
        return Response.json({message:"Note deleted successfully"}, {status: 200});
    } catch (error) {
        console.log("Error in Delete Note.");
        return Response.json({message: 'Internal Server Error', error: error.message}, {status: 500});
    }
}