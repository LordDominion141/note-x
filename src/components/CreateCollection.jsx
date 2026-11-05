import { useState } from "react";

const CreateCollection = ({
    ref, 
    createCollection, 
    collectionStatus, 
    setNewCollection }) => {
    

    const [collection, setCollection] = useState({
        title: '',
        description: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const succeeded = await createCollection(collection);
        if (succeeded) {
            setNewCollection(false);
        }
    }
    const status = collectionStatus === 'saving';
    return ( 
        <div ref={ref} className="absolute -right-5 -top-23 w-50 min-h-0 bg-white border border-[#b51026] rounded-sm p-3">

            <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-4">
                <label className="text-[#b51026]">Title</label>
                <input value={collection.title} onChange={(e) => setCollection({...collection, title: e.target.value})} type='text' id="title" placeholder="Title" className="bg-[#f19fa8] p-2 rounded-md border-0 text-black placeholder:text-stone-800 outline-0" />
                <label className="text-[#b51026]">Description</label>
                <textarea value={collection.description} onChange={(e) => setCollection({...collection, description: e.target.value})} id="description" placeholder="description" className="bg-[#f19fa8] h-15 p-2 rounded-md border-0 placeholder:text-stone-800 text-black outline-0"/>    
                
                <button type="submit" disabled={status} className="p-2 border-0 bg-[#b51026] text-white font-bold text-[15px] rounded-sm">{status ? '. . .' : 'Create'}</button>
            </form>
        </div>
     );
}
 
export default CreateCollection;