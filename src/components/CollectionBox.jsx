'use client';

import { useState } from 'react';
import { Plus, X, Trash2, BookOpen } from 'lucide-react';

const CollectionBox = ({ collection, notes, onClose, onAddNote, onRemoveNote }) => {
    const [showNotePicker, setShowNotePicker] = useState(false);
    const [addingNoteId, setAddingNoteId] = useState(null);
    const [removingNoteId, setRemovingNoteId] = useState(null);
    const collectionItems = collection.collectionItems ?? [];
    const existingNoteIds = new Set(collectionItems.map((item) => String(item.noteId)));
    const availableNotes = notes.filter((note) => !existingNoteIds.has(String(note._id)));

    async function addNote(note) {
        setAddingNoteId(note._id);
        const succeeded = await onAddNote(note);
        if (succeeded) {
            setShowNotePicker(false);
        }
        setAddingNoteId(null);
    }

    async function removeNote(noteId) {
        setRemovingNoteId(noteId);
        await onRemoveNote(noteId);
        setRemovingNoteId(null);
    }

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#4e0611]/45 backdrop-blur-sm p-6 max-md:p-0" onClick={onClose}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="collection-title"
                className="flex max-h-[min(82dvh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#eadbdd] bg-[#faf9f6] shadow-[0_40px_90px_-30px_rgba(78,6,17,0.7)] max-md:h-full max-md:max-h-none max-md:max-w-none max-md:rounded-none max-md:border-0"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#eadbdd] bg-linear-to-br from-[#fbe6e9] via-[#f9e8ea] to-white px-6 py-5 max-md:px-5 max-md:py-4">
                    <div className="min-w-0">
                        <p className="mb-2 inline-block rounded-full bg-[#b51026]/10 px-3 py-1 text-xs font-medium text-[#b51026]">Collection</p>
                        <h2 id="collection-title" className="m-0 truncate text-2xl font-medium tracking-tight text-[#3a1519] max-md:text-xl">{collection.title}</h2>
                        <p className="mb-0 mt-2 max-w-xl whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-600">
                            {collection.description || 'No description'}
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close collection"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-0 mr-10 bg-transparent text-gray-600 hover:bg-[#f9e8ea] hover:text-[#b51026]"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </header>

                <div className="flex min-h-0 flex-1 flex-col px-6 py-5 max-md:px-5 max-md:py-4">
                    <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
                        <div>
                            <h3 className="m-0 text-base font-semibold text-[#292929]">Notes</h3>
                            <p className="m-0 mt-1 text-sm text-gray-500">{collectionItems.length} {collectionItems.length === 1 ? 'note' : 'notes'}</p>
                        </div>
                        <button
                            type="button"
                            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full border-0 bg-linear-to-b from-[#d74a5d] to-[#b51026] px-5 text-sm font-medium text-white ring-1 ring-[#840f1e]/40 shadow-[0_10px_20px_-8px_rgba(181,16,38,0.7)] transition hover:-translate-y-0.5"
                            onClick={() => setShowNotePicker((current) => !current)}
                        >
                            <Plus className="h-4 w-4" />
                            Add a note
                        </button>
                    </div>

                    {showNotePicker && (
                        <div className="mb-4 max-h-40 shrink-0 overflow-y-auto rounded-2xl border border-[#eadbdd] bg-white p-1">
                            {availableNotes.length ? availableNotes.map((note) => (
                                <button
                                    type="button"
                                    key={note._id}
                                    disabled={addingNoteId !== null}
                                    className="flex min-h-11 w-full items-center justify-between gap-3 rounded-sm border-0 bg-transparent px-3 text-left text-sm text-gray-700 hover:bg-[#f9e8ea] disabled:opacity-60"
                                    onClick={() => addNote(note)}
                                >
                                    <span className="truncate">{note.title}</span>
                                    <span className="shrink-0 text-[#b51026]">{addingNoteId === note._id ? '. . .' : 'Add'}</span>
                                </button>
                            )) : (
                                <p className="m-0 px-3 py-3 text-sm text-gray-500">No notes available to add.</p>
                            )}
                        </div>
                    )}

                    <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-[#eadbdd] bg-white shadow-[0_20px_40px_-30px_rgba(181,16,38,0.5)]">
                        {collectionItems.length ? (
                            <ul className="m-0 list-none divide-y divide-[#f0e5e6] p-0">
                                {collectionItems.map((item) => (
                                    <li key={item._id ?? item.noteId} className="flex min-h-14 items-center justify-between gap-3 px-4 py-2 transition-colors hover:bg-[#fdf5f6]">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f9e8ea] text-[#b51026]"><BookOpen className="h-4 w-4" /></span>
                                            <span className="truncate text-sm font-medium text-gray-800">{item.noteTitle}</span>
                                        </div>
                                        <button
                                            type="button"
                                            aria-label={`Remove ${item.noteTitle} from collection`}
                                            disabled={removingNoteId === String(item.noteId)}
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-0 bg-transparent text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                                            onClick={() => removeNote(String(item.noteId))}
                                        >
                                            {removingNoteId === String(item.noteId) ? <span className="text-xs">. . .</span> : <Trash2 className="h-4 w-4" />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex min-h-40 flex-col items-center justify-center px-6 py-8 text-center">
                                <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#f9e8ea] to-[#f4dce0] text-[#b51026]"><BookOpen className="h-6 w-6" /></span>
                                <p className="m-0 text-sm font-medium text-gray-700">No notes in this collection yet</p>
                                <p className="mb-0 mt-1 text-sm text-gray-500">Add a note to start building it.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CollectionBox;