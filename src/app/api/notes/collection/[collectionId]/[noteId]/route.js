import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";
import Collection from "@/db/Collection";

// 1. DELETE COLLECTION ITEM
export async function DELETE(request, {params}) {
    try {
        await dbConnect();
        const { user, response } = await protectRoute(request);
        if (response) return response;
        const { collectionId, noteId } = await params;
        if (!collectionId || !noteId) {
            return Response.json({message: 'collectionid and noteid required'}, {status: 404});
        }
        const updatedCollection = await Collection.findOneAndUpdate(
            {_id: collectionId, userId: user._id},
            { $pull: { collectionItems: {noteId} } },
            {new: true}
        );
        if (!updatedCollection) {
            return Response.json({message: 'Could not delete collection item, maybe it does not exist'}, {status: 404});
        }
        return Response.json({updatedCollection}, {status: 200});
    } catch (error) {
        console.error("Error in delete collection item", error);
        return Response.json({
            message: "Internal Server Error",
            error: error.message
        }, {status: 500})
    }
}