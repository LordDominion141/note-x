'use client';

import Loader from "./Loader";
import { useRef, useLayoutEffect } from "react";
import { BookOpen } from "lucide-react";
import { DEFAULT_EDITOR_SETTINGS } from "./SettingsBox";


const Editor = ({
    activeId, 
    draft, 
    saveNote, 
    updateField, 
    updateNote,
    settings = DEFAULT_EDITOR_SETTINGS}) => {
        
    const textInputRef = useRef(null);
    const titleInputRef = useRef(null);

    useLayoutEffect(() => {
        const el = textInputRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }, [draft?.body, activeId, draft?.status, settings.fontSize, settings.lineHeight, settings.fontFamily]);

    if (!activeId) {
        return (
        <div className="flex-1 flex items-center justify-center text-white max-md:p-6 max-md:text-center max-md:text-2xl max-md:font-bold max-md:text-[#b13f4e]">
            <div className="flex flex-col items-center gap-4 text-center max-md:hidden">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                    <BookOpen className="h-9 w-9" />
                </div>
                <span className="text-6xl font-light tracking-tight">Open or create note</span>
                <span className="text-lg font-light text-white/75">Pick a note from the sidebar, or press New to start writing.</span>
            </div>
            <div className="hidden flex-col items-center gap-4 max-md:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4dce0] text-[#b51026]">
                    <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-xl font-semibold">No note open</span>
            </div>
        </div>
        )
    }
    if (!draft || draft.status === 'loading') {
        return (
            <div className="flex-1 flex items-center justify-center bg-tab-bg text-5xl font-bold text-[#b51026] max-md:text-3xl">
                <Loader />
            </div>
        )
    }

    const isDirty = draft && (
        draft.title !== (draft.original?.title || 'Untitled') || 
        draft.body !== (draft.original?.body || '')
    );

    const isSaving = draft?.status === 'saving';

    const fieldStyle = {
        backgroundColor: settings.bgColor,
        color: settings.textColor,
        fontFamily: settings.fontFamily,
    };
    
    
    return ( 
            <div style={{ backgroundColor: settings.bgColor }} className="relative flex flex-col flex-1 overflow-hidden min-h-0 transition-colors">
                {
                isDirty && (
                <button className="absolute px-5 py-2 rounded-full border-0 bg-linear-to-b from-[#d74a5d] to-[#b51026] ring-1 ring-[#840f1e]/40 shadow-[0_10px_20px_-8px_rgba(181,16,38,0.7)] font-medium text-white right-10 top-5 hover:scale-105 duration-200 max-md:right-4 max-md:top-3 max-md:px-4 max-md:text-sm"
                    disabled={isSaving}
                    onClick={() => (draft.isNew ? saveNote(activeId) : updateNote(activeId))} >
                    { isSaving ? '. . .' : 'Done'}
                </button>
                )}

                <div className="h-full min-w-0 overflow-y-auto overflow-x-clip [&::-webkit-scrollbar]:hidden pr-15">
                    <input value={draft.title} ref={titleInputRef} placeholder="Title" onChange={(e) => {
                        updateField(activeId, 'title', e.target.value)
                    }} style={{ ...fieldStyle, fontSize: settings.fontSize * 1.75 }} className="block w-full min-w-0 border-none outline-0 pt-16 h-20 px-10 font-medium tracking-tight placeholder:text-current placeholder:opacity-40 max-md:px-5 max-md:pt-14 max-sm:w-full"
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                        if (activeId && textInputRef.current) {
                            textInputRef.current.focus();
                            }
                        }
                    }}
                    />
                    <textarea  ref={textInputRef} value={draft.body} onChange={(e) => {
                        updateField(activeId, 'body', e.target.value);
                    }
                        } placeholder= "Start writing" style={{ ...fieldStyle, fontSize: settings.fontSize, lineHeight: settings.lineHeight, overflowWrap: 'anywhere' }} className="box-border block w-full min-w-0 max-w-full min-h-[50vh] border-0 outline-0 resize-none overflow-hidden placeholder:text-current placeholder:opacity-40 p-10 py-3 max-md:px-5"
                        onKeyDown={(event) => {
                            if (event.key === 'Backspace') {
                                if (event.target.selectionStart === 0) {
                                    event.preventDefault()
                                    if (event.target.value.length === 0) {
                                        if (activeId && titleInputRef.current) {
                                        titleInputRef.current.focus();
                                        const titleLength = titleInputRef.current.value.length;
                                        titleInputRef.current.setSelectionRange(titleLength, titleLength);
                    
                                        }
                                    }
                                }
                            }
                        }}
                        />
                </div>
            </div>
     );
}
 
export default Editor;