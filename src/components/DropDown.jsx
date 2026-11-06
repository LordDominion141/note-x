'use client';
import {
    FoldersIcon,
    Edit2Icon,
    Trash,
    NotepadText
} from 'lucide-react';

import { useState } from 'react';
import Picker from './Picker';

const DropDown = ({
    deleteNote, 
    subItem, 
    closeDropDown, 
    setRename,
    deleteCollection,
    deleteStatus,
    item,
    deletingStatus,
    addToCollection,
    addCollection,
    anchorRef,
    pickerRef,
    collections,
    notes  }) => {

    const isDeleting = item.title === 'Notes' ? deletingStatus === subItem._id : deleteStatus === 'deleting';
    const isAdding = addCollection === 'adding';

    const [picker, setPicker] = useState([]);
    const [view, setView] = useState('actions');

    function openPicker() {
        setPicker((item.title === 'Notes' ? collections : notes) ?? []);
        setView('picker');
    }



    return view === 'actions' ? (
            <div className="absolute right-0 top-full min-w-max px-2 py-2 text-md rounded-xl bg-white border flex flex-col gap-1 border-[#eadbdd] z-50 shadow-[0_20px_40px_-16px_rgba(58,21,25,0.5)]">
                <button type="button" className="flex items-center border-0 bg-transparent text-gray-700 p-2 rounded-lg hover:bg-[#f9e8ea]" onClick={(event) => {
                    event.stopPropagation();
                    setRename(subItem._id);
                    if (closeDropDown) closeDropDown();
                }}>
                    <Edit2Icon className='w-4 h-4 mr-3 ml-1' />
                    Rename
                </button>
                <button type="button" onClick={(event) => {
                    event.stopPropagation();
                    openPicker();
                }} className="flex items-center border-0 bg-transparent text-left text-gray-700 p-2 rounded-lg hover:bg-[#f9e8ea]">
                    {item.title === 'Notes' ? <FoldersIcon className='w-4 h-4 mr-3 ml-1'/> : <NotepadText className='w-4 h-4 mr-3 ml-1'/>}
                    {item.title === 'Notes' ? 'Add to collection' : 'Add new note'}
            
                </button>
                <div className="text-red-600 p-2 rounded-lg hover:bg-[#f9e8ea] cursor-pointer"
                onClick={async (e) =>{
                    e.stopPropagation();
                    if (isDeleting) return;
                    if (item.title === 'Notes') {
                        const deleted = await deleteNote(subItem._id);
                        if (closeDropDown && deleted) closeDropDown();
                    }
                    if (item.title === 'Collections') {
                        const deleted = await deleteCollection(subItem._id);
                        if (closeDropDown && deleted) closeDropDown();
                    }
                }}
                >
                    <Trash className='w-4 h-4 mr-3 ml-1'/>
                    { isDeleting ? '. . .' : 'Delete'}
                    </div>
            </div>
     ): (
         <Picker
             anchorRef={anchorRef}
             pickerRef={pickerRef}
             items={picker}
             emptyMessage={item.title === 'Notes' ? 'No collections available' : 'No notes available'}
             isAdding={isAdding}
             addToCollection={addToCollection}
             closeDropDown={closeDropDown}
             subItem={subItem}
             item={item}
         />
     )
}
 
export default DropDown;

/*
onClick={
    async (e) => {
        e.stopPropagation();
        if (item.title === 'Notes') {
            setAddData({
                collectionId: 
            });
        }
    }
}
*/