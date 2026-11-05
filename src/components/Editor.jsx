'use client';

import Loader from "./Loader";
import { useRef, useLayoutEffect } from "react";
import { BookOpen } from "lucide-react";


const Editor = ({
    activeId, 
    draft, 
    saveNote, 
    updateField, 
    updateNote}) => {
        
    const textInputRef = useRef(null);
    const titleInputRef = useRef(null);

    useLayoutEffect(() => {
        const el = textInputRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }, [draft?.body, activeId, draft?.status]);

    if (!activeId) {
        return (
        <div className="flex-1 flex items-center justify-center text-6xl font-extrabold text-white max-md:p-6 max-md:text-center max-md:text-2xl max-md:font-bold max-md:text-[#b13f4e]">
            <span className="max-md:hidden">Open or create note</span>
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
    
    
    return ( 
            <div className="relative flex flex-col flex-1 overflow-hidden min-h-0 bg-tab-bg ">
                {
                isDirty && (
                <button className="absolute px-4 py-2 rounded-lg border-0 bg-[#b13f4e] text-white right-10 top-5 hover:scale-105 duration-200 hover:font-bold max-md:right-4 max-md:top-3 max-md:rounded-md max-md:px-3 max-md:text-sm"
                    disabled={isSaving}
                    onClick={() => (draft.isNew ? saveNote(activeId) : updateNote(activeId))} >
                    { isSaving ? '. . .' : 'Done'}
                </button>
                )}

                <div className="h-full overflow-y-auto overflow-x-clip [&::-webkit-scrollbar]:hidden">
                    <input value={draft.title} ref={titleInputRef} placeholder="Title" onChange={(e) => {
                        updateField(activeId, 'title', e.target.value)
                    }} className="block w-full min-w-0 bg-tab-bg border-none outline-0 text-3xl pt-16 h-20 px-10 font-bold max-md:px-5 max-md:pt-14 max-md:text-2xl max-sm:w-full"
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
                        } placeholder= "Start writing" className="block w-full min-h-[50vh] bg-tab-bg border-none outline-0 resize-none overflow-hidden text-[#292929] text-[17px] p-10 py-3 max-md:px-5"
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