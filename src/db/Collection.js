import mongoose from "mongoose";

// DEFINE SUB-SCHEMA
const collectionItemSchema = new mongoose.Schema({
    noteId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Note'
    },
    noteTitle: {
        type: String,
        required: [true, 'There is no title for this note in this collection'],
        trim: true
    }
}, {timestamps: true});


// DEFINE MAIN SCHEMA
const CollectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title of collection is required'],
        trim: true,
        minlength: [3, 'Title cannot be less than 3 characters']
    },
    description: {
        type: String,
        trim: true,
        minlength: [3, 'Description cannot be less than 3 characters']
    },

    collectionItems: [collectionItemSchema],

}, {timestamps: true});

const Collection = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);

export default Collection;