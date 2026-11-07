'use client'

import { Fragment, useEffect, useState, useRef } from "react";
import {
    Plus,
    Library,
    StickyNote,
    User,
    Settings,
    LogOut,
    ArrowLeft,
    Search,
    ChevronDown,
    BookOpen,
    MenuIcon,
    X,
    EllipsisVertical
} from 'lucide-react';
import DropDown from "./DropDown";
import Rename from "./Rename";
import CreateCollection from "./CreateCollection";


const MenuBar = ({
    collections, 
    notes, 
    logoutHandler, 
    openTabHandler, 
    newTabHandler, 
    active, 
    deleteNote, 
    drafts, 
    rename, 
    setRename, 
    updateField, 
    updateNote, 
    createCollection, 
    collectionStatus, 
    setCollectionStatus, 
    updateCollection,
    deleteCollection,
    deleteStatus,
    deletingStatus,
    addToCollection,
    addCollection,
    openCollection,
    openProfile,
    openSettings,
    mobileOpen,
    onCloseMobile }) => {

    const RenameInputRef = useRef(null);
    const CollectionInputRef = useRef(null);
        
    // TODO .1. MAKE THE DASHBOARD CAPABLE OF REDIRECTING THE USER BACK TO THE LOGIN PAGE IF THERES NO SESSION AVAILABLE.

    // menu related.
    const [open, setOpen] = useState({});
    const [openMenu, setOpenMenu] = useState({});
    const [dropDown, setDropDown] = useState(null);
    const [newCollection, setNewCollection] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeSearchIndex, setActiveSearchIndex] = useState(0);
    const searchContainerRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (rename !== null) RenameInputRef.current?.focus();
    }, [rename]);

    useEffect(() => {
        if(open) {
            const t = setTimeout(() => setHidden(false), 100);
            return () => {
                clearTimeout(t);
                setHidden(true);
            }
        };
    }, [open]);

    const toggle = (id) => {
        setOpenMenu((prev) => ({ ...prev, [id]: !prev[id] }));
    }
    
    const Menus = [
        {title: 'New', icon: Plus, btn: true},
        {title: 'Notes',
            icon: Library,
            subMenu: true,
            _id: '1',
            subMenuItems: notes,
        },
        {title: 'Collections',
            icon: StickyNote,
            subMenu: true,
            _id: '2',
            subMenuItems: collections,
        },
        {title: 'New Collection', icon: Plus, btn: true},
        {title: 'Profile', icon: User, spacing: true},
        {title: 'Setting', icon: Settings},
        {title: 'Logout', icon: LogOut, api: logoutHandler, endMargin: true}

    ]

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchingNotes = normalizedQuery
        ? notes.filter((note) =>
            note.title?.toLowerCase().includes(normalizedQuery) ||
            note.body?.toLowerCase().includes(normalizedQuery)
        )
        : [];
    const matchingCollections = normalizedQuery
        ? collections.filter((collection) =>
            collection.title?.toLowerCase().includes(normalizedQuery) ||
            collection.description?.toLowerCase().includes(normalizedQuery)
        )
        : [];
    const searchResults = [
        ...matchingNotes.map((note) => ({ type: 'note', item: note })),
        ...matchingCollections.map((collection) => ({ type: 'collection', item: collection })),
    ];

    function selectSearchResult(result) {
        setSearchOpen(false);
        setSearchQuery('');
        setActiveSearchIndex(0);
        if (result.type === 'note') {
            openTabHandler(result.item._id);
        } else {
            openCollection(result.item._id);
        }
        onCloseMobile?.();
    }

    const dropdownRef = useRef(null);
    const pickerRef = useRef(null);

    useEffect(() => {
        const handlePointerDownOutside = (event) => {
            const insideDropdown = dropdownRef.current?.contains(event.target);
            const insidePicker = pickerRef.current?.contains(event.target);
            const insideSearch = searchContainerRef.current?.contains(event.target);
            if (!insideDropdown && !insidePicker) {
                setDropDown(null);
            }
            if (!insideSearch) setSearchOpen(false);
            if (RenameInputRef.current && !RenameInputRef.current.contains(event.target)) {
                setRename(null);
            }
            if (CollectionInputRef.current && !CollectionInputRef.current.contains(event.target)) {
                setNewCollection(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDownOutside);
        return () => {

            document.removeEventListener('pointerdown', handlePointerDownOutside);
            if (collectionStatus === 'ready') {
                setNewCollection(false);
            };
        }
    }, );


    return ( 

        <div className={`relative min-h-screen shrink-0 bg-linear-to-b from-[#c4132b] via-[#b51026] to-[#7d0d1c] shadow-[8px_0_30px_-12px_rgba(78,6,17,0.6)] p-5 pt-8 text-white duration-300 ${open ? 'w-72' : 'w-20'} max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:flex max-md:h-dvh max-md:min-h-0 max-md:w-72 max-md:max-w-[85vw] max-md:flex-col max-md:overflow-y-auto max-md:pt-4 max-md:transition-transform ${mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}`}>

            <ArrowLeft className={`text-[#b51026] max-md:hidden p-2 bg-white text-lg rounded-full absolute -right-3 z-50 top-9 border border-[#b51026] cursor-pointer ${!open &&'rotate-180'} duration-200`} onClick={() => {
                if (open) {
                   setOpenMenu({});
                }
                setOpen(!open);
            }} />

            <div className="h-full overflow-y-auto overflow-x-clip scrollbar-none max-sm:pr-10 max-md:min-h-0 max-md:flex-1 max-md:pr-0">
                <div className={`flex items-center p-0 gap-20 whitespace-nowrap m-0 w-full ${open ? '' : 'justify-center'}`}>
                  <div className="flex items-center ">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 ${open ? 'mx-2' : ''}`}><BookOpen className="h-5 w-5" /></span>
                      <h1 className={`text-white  origin-left text-2xl my-0 font-medium ${!hidden ? 'ml-2' : 'hidden max-sm:block'}`}>Note-X</h1>
                  </div>
                                    <button
                                        type="button"
                                        aria-label="Close navigation"
                    className="ml-10 flex h-11 w-11 items-center justify-center rounded-md border-0 bg-transparent text-white hover:bg-[#b13f4e] focus-visible:outline-2 focus-visible:outline-white md:hidden"
                                        onClick={onCloseMobile}
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                </div>
                <div ref={searchContainerRef} className="relative z-30 mt-10 w-full max-md:mt-8">
                    <div className={`flex items-center rounded-xl bg-white/12 py-3 ring-1 ring-white/15 transition focus-within:ring-white/40 ${!open ? 'px-3' : 'px-4'}`}>
                        <Search className="m-0 ml-1 h-5 w-5 shrink-0 cursor-pointer" onClick={() => {
                            setOpen(true);
                            setSearchOpen(true);
                            searchInputRef.current?.focus();
                        }} />
                        <input
                            ref={searchInputRef}
                            type="search"
                            role="combobox"
                            aria-label="Search notes and collections"
                            aria-autocomplete="list"
                            aria-expanded={searchOpen}
                            aria-controls="sidebar-search-results"
                            aria-activedescendant={searchResults[activeSearchIndex] ? `search-result-${searchResults[activeSearchIndex].type}-${searchResults[activeSearchIndex].item._id}` : undefined}
                            value={searchQuery}
                            onFocus={() => setSearchOpen(true)}
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                                setActiveSearchIndex(0);
                                setSearchOpen(true);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'ArrowDown' && searchResults.length) {
                                    event.preventDefault();
                                    setActiveSearchIndex((index) => (index + 1) % searchResults.length);
                                } else if (event.key === 'ArrowUp' && searchResults.length) {
                                    event.preventDefault();
                                    setActiveSearchIndex((index) => (index - 1 + searchResults.length) % searchResults.length);
                                } else if (event.key === 'Enter' && searchResults[activeSearchIndex]) {
                                    event.preventDefault();
                                    selectSearchResult(searchResults[activeSearchIndex]);
                                } else if (event.key === 'Escape') {
                                    setSearchOpen(false);
                                }
                            }}
                            className={`search-clear ml-3 w-full min-w-0 border-0 bg-transparent text-base text-white placeholder:text-white focus:outline-none ${!open && 'hidden max-sm:block'}`}
                            placeholder="Search"
                        />
                    </div>
                    {searchOpen && (
                        <div id="sidebar-search-results" role="listbox" className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(60dvh,420px)] overflow-y-auto rounded-lg border border-[#eadbdd] bg-white p-2 text-gray-800 shadow-xl">
                            {!normalizedQuery ? (
                                <p className="m-0 px-3 py-3 text-sm text-gray-500">Search note titles, note text, or collections.</p>
                            ) : searchResults.length === 0 ? (
                                <p className="m-0 px-3 py-3 text-sm text-gray-500">No results for “{searchQuery.trim()}”.</p>
                            ) : (
                                <>
                                    {matchingNotes.length > 0 && (
                                        <div className="pb-1">
                                            <p className="m-0 px-3 py-2 text-xs font-semibold uppercase text-[#b51026]">Notes</p>
                                            {matchingNotes.map((note) => {
                                                const resultIndex = searchResults.findIndex((result) => result.type === 'note' && result.item._id === note._id);
                                                return (
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={activeSearchIndex === resultIndex}
                                                        id={`search-result-note-${note._id}`}
                                                        key={note._id}
                                                        className={`flex min-h-11 w-full items-center gap-3 rounded-md border-0 px-3 text-left text-sm ${activeSearchIndex === resultIndex ? 'bg-[#f9e8ea] text-[#8f1021]' : 'bg-transparent text-gray-800 hover:bg-[#f9e8ea]'}`}
                                                        onMouseEnter={() => setActiveSearchIndex(resultIndex)}
                                                        onClick={() => selectSearchResult({ type: 'note', item: note })}
                                                    >
                                                        <Library className="h-4 w-4 shrink-0 text-[#b51026]" />
                                                        <span className="min-w-0">
                                                            <span className="block truncate">{note.title}</span>
                                                            {note.body?.toLowerCase().includes(normalizedQuery) && !note.title?.toLowerCase().includes(normalizedQuery) && (
                                                                <span className="block truncate text-xs text-gray-500">{note.body}</span>
                                                            )}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {matchingCollections.length > 0 && (
                                        <div className="border-t border-[#f0e5e6] pt-1">
                                            <p className="m-0 px-3 py-2 text-xs font-semibold uppercase text-[#b51026]">Collections</p>
                                            {matchingCollections.map((collection) => {
                                                const resultIndex = searchResults.findIndex((result) => result.type === 'collection' && result.item._id === collection._id);
                                                return (
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={activeSearchIndex === resultIndex}
                                                        id={`search-result-collection-${collection._id}`}
                                                        key={collection._id}
                                                        className={`flex min-h-11 w-full items-center gap-3 rounded-md border-0 px-3 text-left text-sm ${activeSearchIndex === resultIndex ? 'bg-[#f9e8ea] text-[#8f1021]' : 'bg-transparent text-gray-800 hover:bg-[#f9e8ea]'}`}
                                                        onMouseEnter={() => setActiveSearchIndex(resultIndex)}
                                                        onClick={() => selectSearchResult({ type: 'collection', item: collection })}
                                                    >
                                                        <StickyNote className="h-4 w-4 shrink-0 text-[#b51026]" />
                                                        <span className="min-w-0">
                                                            <span className="block truncate">{collection.title}</span>
                                                            {collection.description && <span className="block truncate text-xs text-gray-500">{collection.description}</span>}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
                <ul className="pt-2 relative -left-8 max-md:left-0 max-md:m-0 max-md:list-none max-md:p-0">
                    {Menus.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Fragment key={item._id ?? item.title} >
                                <li className={`text-sm max-sm:py-3 flex justify-between items-center cursor-pointer p-3 max-sm:px-4 gap-x-2 w-full rounded-xl max-md:min-h-11 max-md:shadow-none ${item.spacing ? 'mt-9' : 'mt-2'} ${item.endMargin && 'mb-10'} ${item.btn ? 'text-[#b51026] hover:scale-102 duration-200 bg-white font-medium shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_24px_-10px_rgba(0,0,0,0.6)]' : 'text-white/80 hover:bg-white/12 hover:text-white'} ${openMenu[item._id] && 'bg-white/15 text-white'}`} onClick={() => {
                                            setOpen(true);
                                            if (item.subMenu) toggle(item._id);
                                            if (item.api) {
                                                item.api();
                                                onCloseMobile?.();
                                            }
                                            if (item.title === 'New') {
                                                newTabHandler();
                                                onCloseMobile?.();
                                            }
                                            if (item.title === 'New Collection') setNewCollection(true);
                                            if (item.title === 'Setting') {
                                                openSettings?.();
                                                onCloseMobile?.();
                                            }
                                            if (item.title === 'Profile') {
                                                openProfile();
                                                onCloseMobile?.();
                                            }
                                        }}>
                                    <div className="flex items-center">
                                        {Icon && <Icon className="ml-2 text-2xl block float-left" />}
                                        <span className={`ml-4 text-base font-medium duration-200 ${!open && 'hidden max-sm:block'}`}>{item.title}</span>
                                    </div>
                                    {item.subMenu && (
                                        <ChevronDown
                                            className={`cursor-pointer p-2 text-lg leading-none ${openMenu[item._id] && 'rotate-180'} duration-200`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggle(item._id)
                                            }}
                                            aria-label={`Toggle ${item.title}`}
                                        />
                                    )}
                                    
                                </li>

                                <div className="relative">
                                    {item.title === 'New Collection' && newCollection &&
                                        <CreateCollection ref={CollectionInputRef} createCollection={createCollection} collectionStatus={collectionStatus}
                                        setNewCollection={setNewCollection}
                                        setCollectionStatus={setCollectionStatus} />}
                                </div>

                                {item.subMenu && openMenu[item._id] && (
                                    <ul className="relative -left-4 ml-8 max-sm:w-90 w-57 mt-2 space-y-2 text-sm text-gray-200 max-md:left-0 max-md:ml-7 max-md:w-full max-md:list-none max-md:p-0">
                                        {(item.subMenuItems ?? []).map((sub) => (
                                            <li className={`group relative -left-7 list-none px-2 py-2 rounded-lg flex items-center justify-between w-full max-sm:w-[60%] h-9 transition-colors max-md:left-0 max-md:h-11 ${active === sub._id ? 'bg-white/20' : 'bg-black/15 hover:bg-white/10'}`} key={sub._id}
                                            onClick={() =>  { 
                                            if (item.title === 'Notes') {
                                                openTabHandler(sub._id);
                                                onCloseMobile?.();
                                            }
                                            if (item.title === 'Collections') {
                                                openCollection(sub._id);
                                                onCloseMobile?.();
                                            }
                                        }}
                                            >
                                                {rename === sub._id ? (
                                                    <Rename item={sub} menu={item} RenameInputRef={RenameInputRef} updateField={updateField} updateNote={updateNote} setRename={setRename} updateCollection={updateCollection} />
                                                ) : (
                                                    <div className="w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-white/90">{sub.title}</div>
                                                )}

                                                <div
                                                    ref={dropDown === sub._id ? dropdownRef : null}
                                                    className="relative"
                                                >
                                                    <button
                                                        type="button"
                                                        aria-label={`More options for ${sub.title}`}
                                                        aria-expanded={dropDown === sub._id}
                                                        className={`flex  h-8 w-8 shrink-0 items-center cursor-pointer justify-center rounded-full border-0 text-white transition-colors ${active === sub._id ? 'visible bg-white/20 hover:bg-white/30' : 'invisible group-hover:visible max-sm:visible bg-white/10 hover:bg-white/25'}`}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setDropDown((current) => current === sub._id ? null : sub._id);
                                                        }}
                                                    >
                                                    <EllipsisVertical className="h-5 w-5" />
                                                    </button>
                                                    {dropDown === sub._id && <DropDown deleteNote={deleteNote} subItem={sub} draft={drafts[sub._id]} closeDropDown={() => setDropDown(null)} setRename={setRename} item={item}
                                                    deleteCollection={deleteCollection}
                                                    deleteStatus={deleteStatus} deletingStatus={deletingStatus}
                                                    addToCollection={addToCollection}
                                                    addCollection={addCollection}
                                                    anchorRef={dropdownRef}
                                                    pickerRef={pickerRef}
                                                    collections={collections} 
                                                    notes={notes} />}
                                                     

                                                </div>

                                            </li>
                                            
                                        ))}
                                    </ul>
                                )}
                            </Fragment>
                        );
                    })}
                </ul>
                
            </div>

        </div> 
    );
     
}
 
export default MenuBar;