'use client';

import { Plus, X } from "lucide-react";

const TabBar = ({ notes, openTab, drafts, active, setActive, closeTabHandler, newTabHandler,  }) => {
    const previousId = openTab[openTab.indexOf(active) - 1];

    return (
        <div className="flex items-end overflow-x-auto scrollbar-none border border-b-0 border-white/15 px-3 shrink-0 max-md:h-12 max-md:items-stretch max-md:border-b max-md:border-[#eadbdd] max-md:bg-[#b15561] max-md:px-2">
            {openTab.map((id) => {
                const tab = drafts[id] ?? notes.find((n) => n._id === id);
                if (!tab) return null; // note was deleted
                const isActive = active === id;

                return (
                    <div
                        key={id}
                        className="flex flex-row items-end group m-0 shrink-0 max-md:items-stretch"
                        onClick={() => setActive(id)}
                    >
                        <div className={`max-sm:hidden w-1.5 h-1.5 bg-[#b15561] rounded-br-2xl shadow-[4px_4px_0_4px_#faf9f6f8] border-0 m-0 ${isActive ? 'block' : 'hidden'}`}></div>

                        <button
                            className={`flex items-end border-transparent shrink-0 w-40 h-7 px-2 mt-4 overflow-hidden text-sm max-md:mt-0 max-md:h-12 max-md:min-h-11 max-md:w-36 max-md:items-center bg-tab-bg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-tab-bg max-sm:bg-white border-0 hover:bg-stone-100 rounded-t-xl max-sm:rounded-sm font-medium text-[#b51026]'
                                    : 'hover:bg-white/10 rounded-t-xl text-white font-medium bg-transparent'
                                    } ${previousId === id && 'border-none'} max-md:my-1`}>
                            <div className="ml-1 w-25 overflow-hidden whitespace-nowrap text-[12px] bg-transparent">{tab.title}</div>
                            <X
                                className={`py-1 px-2 m-0 font-extrabold rounded-md hover:bg-[#edb8c0] w-3.5 h-3.5 ml-2 ${
                                    isActive ? 'block bg-stone-100 z-40' : 'hidden group-hover:block bg-tab-bg text-[#b13f4e] max-md:block'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTabHandler(id);
                                }}
                            />
                        </button>

                        <div className={`max-sm:hidden w-1.5 h-1.5 bg-[#b15561] rounded-bl-2xl shadow-[-4px_4px_0_4px_#FAF9F6F8] m-0 border-0 ${isActive ? 'block' : 'hidden'}`}></div>
                    </div>
                );
            })}

            <button type="button" aria-label="Create note" className="bg-transparent p-1 px-1.5 rounded-full transition-colors mt-4 ml-4 mb-1 text-center flex justify-center text-md text-white hover:bg-white/20 shrink-0 max-md:hidden border-0" onClick={() => newTabHandler()}>
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
};

export default TabBar;