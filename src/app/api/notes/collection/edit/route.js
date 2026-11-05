import mongoose from "mongoose";
import dbConnect from "@/libs/dbConnect";
import { protectRoute } from "@/middleware/protectRoute";
import Collection from "@/db/Collection";

export async function PATCH(request) {
	try {
		await dbConnect();
		const { user, response } = await protectRoute(request);
		if (response) return response;

		const { collectionId, title, description } = await request.json();
		if (!mongoose.Types.ObjectId.isValid(collectionId)) {
			return Response.json({ message: 'A valid collectionId is required' }, { status: 400 });
		}

		const setFields = {};
		const unsetFields = {};

		if (title !== undefined) {
			if (typeof title !== 'string' || title.trim().length < 3) {
				return Response.json({ message: 'Title must be at least 3 characters' }, { status: 400 });
			}
			setFields.title = title.trim();
		}

		if (description !== undefined) {
			if (typeof description !== 'string') {
				return Response.json({ message: 'Description must be a string' }, { status: 400 });
			}

			const trimmedDescription = description.trim();
			if (trimmedDescription && trimmedDescription.length < 3) {
				return Response.json({ message: 'Description must be at least 3 characters' }, { status: 400 });
			}

			if (trimmedDescription) {
				setFields.description = trimmedDescription;
			} else {
				unsetFields.description = 1;
			}
		}

		if (!Object.keys(setFields).length && !Object.keys(unsetFields).length) {
			return Response.json({ message: 'Provide a title or description to update' }, { status: 400 });
		}

		const update = {};
		if (Object.keys(setFields).length) update.$set = setFields;
		if (Object.keys(unsetFields).length) update.$unset = unsetFields;

		const updatedCollection = await Collection.findOneAndUpdate(
			{ _id: collectionId, userId: user._id },
			update,
			{ new: true, runValidators: true }
		);

		if (!updatedCollection) {
			return Response.json({ message: 'Collection not found' }, { status: 404 });
		}

		return Response.json({ updatedCollection }, { status: 200 });
	} catch (error) {
		console.error('Error editing collection:', error);
		return Response.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
	}
}
