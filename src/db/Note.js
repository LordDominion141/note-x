import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true});

NoteSchema.index({
    userId: 1,
    _id: 1,
}, {unique: true});

const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;