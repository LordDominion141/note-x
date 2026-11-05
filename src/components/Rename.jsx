import { useState } from "react";

const Rename = ({item, menu, RenameInputRef, updateField, updateNote, setRename, updateCollection}) => {

    const [updatedCollection, setUpdatedCollection] = useState({
        title: item.title,
    });
    
    return ( 
        <div className="w-[80%] overflow-hidden whitespace-nowrap" onClick={(event) => event.stopPropagation()}>

            <input ref={RenameInputRef} value={updatedCollection.title} aria-label={`Rename ${item.title}`} className="h-full w-full border border-white m-0 p-0 bg-transparent text-white focus:outline-none" onChange={(e) => {
                    const title = e.target.value;
                    setUpdatedCollection({title});
                    if (menu.title === 'Notes') updateField(item._id, 'title', title);
                }}
                onKeyDown={async (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        if (menu.title === 'Notes') {
                            const updated = await updateNote(item._id);
                            if (updated) setRename(null);
                        }
                        if (menu.title === 'Collections') {
                            const updated = await updateCollection(item._id, updatedCollection);
                            if (updated) setRename(null);
                        }
                    }
                }} />

        </div>
     );
}
 
export default Rename;