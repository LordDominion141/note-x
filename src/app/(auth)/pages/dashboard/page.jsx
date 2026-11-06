'use client'

import Editor from "@/components/Editor";
import MenuBar from "@/components/MenuBar";
import TabBar from "@/components/TabBar";
import CollectionBox from "@/components/CollectionBox";
import ProfileBox from "@/components/ProfileBox";
import SettingsBox, { DEFAULT_EDITOR_SETTINGS } from "@/components/SettingsBox";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BookOpen, Menu, Plus } from "lucide-react";



const Dashboard = () => {
     const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
        // API HANDLERS
    
        // 1. LOGOUT API
        async function logoutHandler () {
          const res = await fetch('/api/logout', { method: 'POST' });
    
          if (!res.ok) {
            console.error('Logout failed');
            return;
        }
    
        router.replace('/pages/login');
        }
    
        // 2. GET NOTES API
        const [notes, setNotes] = useState([]);
        const [collections, setCollections] = useState([]);
        const [selectedCollection, setSelectedCollection] = useState(null);
        const [selectedProfile, setSelectedProfile] = useState(null);

        // EDITOR SETTINGS (font, size, spacing, colors)
        const SETTINGS_KEY = 'notex-editor-settings';
        const [editorSettings, setEditorSettings] = useState(DEFAULT_EDITOR_SETTINGS);
        const [showSettings, setShowSettings] = useState(false);

        // Load saved settings once after mount (not in useState, to avoid a hydration mismatch).
        useEffect(() => {
            const timeoutId = window.setTimeout(() => {
                try {
                    const saved = localStorage.getItem(SETTINGS_KEY);
                    if (saved) {
                        setEditorSettings({ ...DEFAULT_EDITOR_SETTINGS, ...JSON.parse(saved) });
                    }
                } catch (error) {
                    console.error('Could not load editor settings', error);
                }
            }, 0);

            return () => window.clearTimeout(timeoutId);
        }, []);

        function saveSettings(next) {
            try {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            } catch (error) {
                console.error('Could not save editor settings', error);
            }
        }

        function updateSetting(key, value) {
            const next = { ...editorSettings, [key]: value };
            setEditorSettings(next);
            saveSettings(next);
        }

        function resetSettings() {
            setEditorSettings(DEFAULT_EDITOR_SETTINGS);
            saveSettings(DEFAULT_EDITOR_SETTINGS);
        }

        function openSettings() {
            setSelectedCollection(null);
            setSelectedProfile(null);
            setShowSettings(true);
        }
    
        async function loadNotes () {
                try {
                    const res = await fetch('/api/notes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                const data = await res.json();
                
                if (!res.ok) {
                    console.error(data.message || `Getnotes failed (${res.status})`);
                    return;
                }
                setNotes(data.notes ?? []);
                console.log('Getnotes success:', data);
                } catch (error) {
                    console.error('Problem in getcollections', error)
                } 
            }
            async function loadCollections () {
                try {
                    const res = await fetch('/api/notes/collection', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                const data = await res.json();
                
                if (!res.ok) {
                    console.error(data.message || `Getcollections failed (${res.status})`);
                    return;
                }
                setCollections(data.collections ?? []);
                console.log('Getcollection success:', data);
                } catch (error) {
                    console.error('Problem in getcollections', error)
                }
            }

        async function openCollection(collectionId) {
            setSelectedProfile(null);
            setShowSettings(false);
            try {
                const res = await fetch(`/api/notes/collection/${collectionId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message || `Get collection failed (${res.status})`);
                    return;
                }
                setSelectedCollection(data.collection);
            } catch (error) {
                console.error('Problem loading collection', error);
            }
        }

        async function openProfile() {
            setSelectedCollection(null);
            setShowSettings(false);
            setSelectedProfile({ loading: true });
            try {
                const res = await fetch('/api/profile');
                const data = await res.json();
                if (!res.ok) {
                    setSelectedProfile({ error: data.message || 'Could not load profile.' });
                    return;
                }
                setSelectedProfile(data.user);
            } catch (error) {
                console.error('Problem loading profile', error);
                setSelectedProfile({ error: 'Could not load profile.' });
            }
        }

        function syncCollection(updatedCollection) {
            setSelectedCollection(updatedCollection);
            setCollections((previous) => previous.map((collection) =>
                collection._id === updatedCollection._id
                    ? { ...collection, collectionItems: updatedCollection.collectionItems }
                    : collection
            ));
        }

        async function removeCollectionNote(collectionId, noteId) {
            try {
                const res = await fetch(`/api/notes/collection/${collectionId}/${noteId}`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message || `Remove note failed (${res.status})`);
                    return false;
                }
                syncCollection(data.updatedCollection);
                return true;
            } catch (error) {
                console.error('Failure removing note from collection', error);
                return false;
            }
        }

            function setDraftStatus(id, status) {
                setDrafts((prev) => {
                    if (!prev[id]) return prev;
                    return { ...prev, [id]: { ...prev[id], status } };
                });
            }


            async function saveNote (tempId) {
                const draft = drafts[tempId];
                if (!draft || !draft.isNew) return;
                if (draft.status === 'saving') return;

                const { title, body, isNew } = draft;
                setDraftStatus(tempId, 'saving');
                try {
                    if (!isNew) return;
                    const res = await fetch('/api/notes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ title: title.trim() || 'Untitled', body }),
                    });
                    const data = await res.json();

                    if (!res.ok) {
                        console.error(data.message || `save note failed (${res.status})`);
                        setDraftStatus(tempId, 'ready');
                        return;
                    }
                    const saved = data.newNote;

                    setNotes((prev) => [{ _id: saved._id, title: saved.title }, ...prev]);
                    setOpenTab((prev) => prev.map((t) => (t === tempId ? saved._id : t)));
                    setActive((prev) => (prev === tempId ? saved._id : prev));
                    setDrafts((prev) => {
                        const current = prev[tempId];
                        if (!current) return prev;

                        const { [tempId]: removed, ...rest } = prev;

                        return {
                            ...rest,
                            [saved._id]: {
                                ...current,
                                isNew: false,
                                status: 'ready',
                                original: { title: saved.title, body: saved.body, }
                            }
                        }
                    })
                    console.log('Note saved successfully');

                } catch (error) {
                    console.error('Save note request failed:', error);
                    setDraftStatus(tempId, 'ready')

                }
            }


            async function updateNote(noteId) {
                const draft = drafts[noteId];
                if (draft.isNew) return;
                if (draft.status === 'saving') return;

                setDraftStatus(noteId, 'saving');
                try {
                    const { title, body, isNew } = draft;
                    if (isNew) return;
                    const res = await fetch(`/api/notes/${noteId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ title: title.trim() || 'Untitled', body }),
                    });
                    const data = await res.json();

                    if (!res.ok) {
                        console.error(data.message || `update note failed (${res.status})`);
                        setDraftStatus(noteId, 'ready');
                        return;
                    }
                    const updated = data.updatedNote;
                    setNotes((prev) => 
                        prev.map((note) => ( note._id === updated._id ? {...note, title: updated.title } : note))
                    );
                    
                    setDrafts((prev) => {
                            if (!prev[noteId]) return prev;
                            return {
                                ...prev,
                            [noteId]: {
                                ...prev[noteId],
                                title: updated.title, 
                                body: updated.body, 
                                status: 'ready',
                                original: { title: updated.title, body: updated.body
                                }
                            }
                        }
                    });
                    return true;
                    console.log('Note updated successfully');

                } catch (error) {
                    console.error('Update note request failed:', error);
                    setDraftStatus(noteId, 'ready');
                    return false;
                }
            }

    
           
            async function getNote(noteId) {
                try {
                    const res = await fetch(`/api/notes/${noteId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const data = await res.json();
                    if (!res.ok) {
                        console.error(data.message || `GetNote failed (${res.status})`);
                        return;
                    }
                    return data;
                } catch (error) {
                     console.error('Problem in getnotes', error)
                }
            }


            const [deletingStatus, setDeletingStatus] = useState({});
        
            async function deleteNote(noteId) {
    
            const draft = drafts[noteId];
            if (draft && deletingStatus === noteId) return;
    
            setDraftStatus(noteId, 'deleting'); 
            setDeletingStatus(noteId);
            
            try {
                const res = await fetch(`/api/notes/${noteId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                
                const data = await res.json(); 

                if (!res.ok) {
                    console.error(data.message || `delete note failed (${res.status})`);
                    setDeletingStatus(null);
                    return false;
                }

                setNotes((prev) => prev.filter((note) => note._id !== noteId));
 
                const currentIndex = openTab.indexOf(noteId);
                const newTabs = openTab.filter((t) => t !== noteId);
                setOpenTab(newTabs);

                if (noteId === active) {
                    setActive(newTabs[currentIndex] ?? newTabs[currentIndex - 1] ?? null);
                }

                setDrafts((prev) => {
                    const { [noteId]: removed, ...rest } = prev;
                    return rest;
                });

                console.log('Note deleted successfully');
                setDeletingStatus(null)
                return true;

            } catch (error) {
                console.error('Problem in delete notes', error);
                setDeletingStatus(null);
                return false;
            }
        }


        useEffect(() => {
            async function loadDashboardData() {
                await loadNotes();
                await loadCollections();
            }

            loadDashboardData();
        }, []);


        const [collectionStatus, setCollectionStatus] = useState('idle');


        // COLLECTION ROUTES.
        async function createCollection(newCollection) {
            if (collectionStatus === 'saving') return;
            setCollectionStatus('saving');
            try {
                const { title, description } = newCollection;
                const res = await fetch('/api/notes/collection', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: title.trim() || 'Untitled', description }),
                });
                const data = await res.json();

                if (!res.ok) {
                    console.error(data.message || `create collection failed (${res.status});`)
                    setCollectionStatus('failed');
                    return false;
                };
                const created = data.newCollection;
                setCollections((prev) => [{ _id: created._id, title: created.title, description: created.description }, ...prev]);
                setCollectionStatus('success');

                console.log('Collection saved successfully');
                return true;

            } catch (error) {
                console.error('Save collection request failed:', error);
                setCollectionStatus('failed');
                return false;
            }
        }

        // UPDATE COLLECTION
        const [updateCollectionStatus, setUpdateCollectionStatus] = useState('idle');

        async function updateCollection(collectionId, newBody) {
            if (updateCollectionStatus === 'updating') return false;
            setUpdateCollectionStatus('updating');
            try {
                const res = await fetch('/api/notes/collection/edit', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ collectionId, ...newBody }),
                });
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message || `update collection failed (${res.status})`);
                    setUpdateCollectionStatus('failed');
                    return false;
                }
                setCollections((previous) =>
                    previous.map((collection) =>
                        collection._id === collectionId
                            ? data.updatedCollection
                            : collection
                    )
                );
                console.log('collection successfullt updated');
                setUpdateCollectionStatus('success');
                return true;
            } catch (error) {
                console.error('failure in update collection', error);
                setUpdateCollectionStatus('failed');
                return false;
            }
        }

        // DELETE COLLECTION
        const [deleteCollectionStatus, setDeleteCollectionStatus] = useState('idle');
        async function deleteCollection(collectionId) {
            if (deleteCollectionStatus === 'deleting') return;
            setDeleteCollectionStatus('deleting');
            try {
                const res = await fetch(`/api/notes/collection/${collectionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message || `delete collection failed (${res.status})`);
                    setDeleteCollectionStatus('failed');
                    return false;
                }
                console.log('collection successfully deleted');
                setCollections((prev) => prev.filter((collection) => collection._id !== collectionId));
                setDeleteCollectionStatus('success');
                return true;

            } catch (error) {
                console.error('failure in delete collection', error);
                setDeleteCollectionStatus('failed');
                return false;
            }
        }

        // ADD NOTE TO COLLECTION
        const [addCollection, setAddCollection] = useState('idle');

        async function addToCollection(addData) {
            if (addCollection === 'adding') return false;
            setAddCollection('adding');
            try {
                const {collectionId, noteId, noteTitle} = addData;
                const res = await fetch(`/api/notes/collection/${collectionId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({noteId, noteTitle: noteTitle.trim()}),
                });
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message || `Add to collection failed (${res.status})`);
                    setAddCollection('failed');
                    return false;
                }
                console.log('Success adding note to collection');
                syncCollection(data.updatedCollection);
                setAddCollection('success');
                return true;
            } catch (error) {
                console.error('Failure adding note to collection', error);
                setAddCollection('failure');
                return false;
            }
        }






        // TABBAR
        
        const [active, setActive] = useState(null);
        const [openTab, setOpenTab] = useState([]);
         // EDITOR.
        const [drafts, setDrafts] = useState({});
        
        const newTabHandler = () => {
            const id = `new-${Date.now()}`;

            setDrafts((prev) => ({
                ...prev,
                [id]: { title:'Untitled', body: '', status: 'ready', isNew: true }
            }));
            setOpenTab((prev) => [...prev, id]);
            setActive(id);
        }
        const updateField = (id, field, value) => {
            setDrafts((prev) => ({ ...prev, [id]: {...prev[id], [field]: value}}));
        }


        const openTabHandler = async (id) => {
            setOpenTab((prev) => (prev.includes(id) ? prev: [...prev, id] ));
            setActive(id);
            if (drafts[id]) return;
            const data = await getNote(id);
            if (!data) {
                setDrafts((prev) => {
                    const { [id]: _removed, ...rest } = prev;
                    return rest;
                });
                return;
            }
            setDrafts((prev) => ({...prev, 
                [id]: {
                    title: data.note.title, body: data.note.body ?? '', status: 'ready',
                    original: { title: data.note.title, body: data.note.body ?? ''}
                }
            }));
        }

        const closeTabHandler = (id) => {
            const i = openTab.indexOf(id);
            const newTabs = openTab.filter((t) => t !== id);
            setOpenTab(newTabs);
            if (id === active) {
                setActive(newTabs[i] ?? newTabs[i - 1] ?? null);
            }
            if (drafts[id]?.isNew) {
                setDrafts((prev) => {
                    const { [id]: removed, ...rest } = prev;
                    return rest;
                });
            }
        }


        const [rename, setRename] = useState({});

    return (
    <main className="flex flex-row h-screen overflow-hidden max-md:h-dvh max-md:w-full max-md:max-w-none max-md:mx-0 overflow-x-clip">
        {mobileMenuOpen && (
            <button
                type="button"
                aria-label="Close navigation"
                className="fixed inset-0 z-40 bg-black/40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
            />
        )}
        <MenuBar 
        collections={collections} 
        notes={notes} 
        logoutHandler={logoutHandler} 
        openTabHandler={openTabHandler} 
        active={active} 
        newTabHandler={newTabHandler} 
        deleteNote={deleteNote} 
        drafts={drafts} 
        rename={rename} 
        setRename={setRename} 
        updateField={updateField} 
        updateNote={updateNote} 
        createCollection={createCollection}
        collectionStatus={collectionStatus}
        setCollectionStatus={setCollectionStatus}
        updateCollection={updateCollection}
        deleteCollection={deleteCollection}
        deleteStatus={deleteCollectionStatus}
        deletingStatus={deletingStatus}
        addToCollection={addToCollection}
        addCollection={addCollection}
        openCollection={openCollection}
        openProfile={openProfile}
        openSettings={openSettings}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)} />

        <div className="relative flex-1 min-w-0 h-full bg-[#b15561] flex flex-col max-md:min-h-0 max-md:bg-[#faf9f6]">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#eadbdd] bg-white px-3 md:hidden">
                <button
                    type="button"
                    aria-label="Open navigation"
                    className="flex h-11 w-11 items-center justify-center rounded-md text-[#b51026] border-0 hover:bg-[#f9e8ea]"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="flex min-w-0 items-center gap-2 text-[#b51026]">
                    <BookOpen className="h-5 w-5 shrink-0" />
                    <span className="truncate text-base font-semibold">Note-X</span>
                </div>
                <button
                    type="button"
                    aria-label="Create note"
                    className="flex h-11 w-11 items-center justify-center rounded-md bg-[#b51026] text-white hover:bg-[#8f1021] border-0"
                    onClick={newTabHandler}
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>

            {selectedCollection ? (
                <CollectionBox
                    collection={selectedCollection}
                    notes={notes}
                    onClose={() => setSelectedCollection(null)}
                    onAddNote={(note) => addToCollection({
                        collectionId: selectedCollection._id,
                        noteId: note._id,
                        noteTitle: note.title,
                    })}
                    onRemoveNote={(noteId) => removeCollectionNote(selectedCollection._id, noteId)}
                />
            ) : selectedProfile ? (
                <ProfileBox profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
            ) : (
                <>
                    <TabBar
                        notes={notes}
                        setActive={setActive}
                        openTab={openTab}
                        closeTabHandler={closeTabHandler}
                        active={active}
                        newTabHandler={newTabHandler}
                        drafts={drafts}
                    />
                    <Editor
                        activeId={active}
                        draft={drafts[active]}
                        updateField={updateField}
                        saveNote={saveNote}
                        updateNote={updateNote}
                        settings={editorSettings}
                    />
                </>
            )}

            {showSettings && (
                <SettingsBox
                    settings={editorSettings}
                    onChange={updateSetting}
                    onReset={resetSettings}
                    onClose={() => setShowSettings(false)}
                />
            )}
        
        </div>
        
    </main>
        
    )
}
 

export default Dashboard;