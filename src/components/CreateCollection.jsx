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
        <div ref={ref} className="absolute -right-5 -top-23 w-50 min-h-0 bg-white border border-[#eadbdd] rounded-2xl p-3 shadow-[0_24px_50px_-20px_rgba(58,21,25,0.55)]">

            <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-4">
                <label className="text-sm font-medium text-[#b51026]">Title</label>
                <input value={collection.title} onChange={(e) => setCollection({...collection, title: e.target.value})} type='text' id="title" placeholder="Title" className="bg-[#f9e8ea] p-2 rounded-lg border-0 text-[#3a1519] placeholder:text-[#b08a90] outline-0 focus:ring-2 focus:ring-[#b51026]/40" />
                <label className="text-sm font-medium text-[#b51026]">Description</label>
                <textarea value={collection.description} onChange={(e) => setCollection({...collection, description: e.target.value})} id="description" placeholder="description" className="bg-[#f9e8ea] h-15 p-2 rounded-lg border-0 placeholder:text-[#b08a90] text-[#3a1519] outline-0 focus:ring-2 focus:ring-[#b51026]/40"/>    
                
                <button type="submit" disabled={status} className="p-2 border-0 bg-linear-to-b from-[#d74a5d] to-[#b51026] ring-1 ring-[#840f1e]/40 text-white font-medium text-[15px] rounded-full disabled:opacity-70">{status ? '. . .' : 'Create'}</button>
            </form>
        </div>
     );
}
 
export default CreateCollection;