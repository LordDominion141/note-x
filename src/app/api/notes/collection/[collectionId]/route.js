import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";
import Collection from "@/db/Collection";


// 1. GET COLLECTION BY ID
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const { collectionId } = await params;
        const collection = await Collection.findOne({ _id: collectionId, userId: user._id  });
        if(!collection) {
            return Response.json({
                message: 'Note not found'
            }, {status: 404});
        }
        return Response.json({collection}, {status: 200});
    } catch (error) {
        console.log("Error in Get collection by id.");
        return Response.json({message: 'Internal Server Error', error: error.message}, {status: 500});
    }
}


// 2. SAVE NOTE TO COLLECTION
export async function PATCH(request, { params }) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const body = await request.json();
        const { collectionId } = await params;
        const { noteId, noteTitle } = body;
        if (!collectionId || !noteId || !noteTitle) {
            return Response.json({
                message: 'collectionId, noteId, and noteTitle are all required'
            }, {status: 404});
        }
        
        const updatedCollection = await Collection.findOneAndUpdate(
            { _id: collectionId, userId: user._id }, 
            { $push: { collectionItems: { noteId, noteTitle } } }, 
            {new: true, runValidators: true}
        );

        return Response.json({updatedCollection}, {status: 200});

    } catch (error) {
        console.log('Error in save note to collection');
        return Response.json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}





// 3. DELETE COLLECTION
export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const { collectionId } = await params;
        if (!collectionId) {
            return Response.json({
                message: 'CollectionId required'
            }, {status: 404});
        }

        const deletedCollection = await Collection.findOneAndDelete({_id: collectionId, userId: user._id});
        if (!deletedCollection) {
            return Response.json({
                message: 'COLLECTION NOT FOUND TO BE DELETED'
            }, {status: 404});
        }
        return Response.json({
            message: "Collection deleted successfully"
        }, {status: 200});

    } catch (error) {
        console.log("Error in delete collection");
        return Response.json({message: 'Internal Server Error', error: error.message}, {status: 500});
    }
}