import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Picker = ({items, emptyMessage, anchorRef, pickerRef, isAdding, addToCollection, closeDropDown, subItem, item}) => {

    const panelRef = useRef(null);
    const [position, setPosition] = useState(null);
    const [addingItemId, setAddingItemId] = useState(null);

    async function addItem(selectedItem) {
        if (isAdding) return;

        setAddingItemId(selectedItem._id);
        const requestData = item.title === 'Notes'
            ? {
                collectionId: selectedItem._id,
                noteId: subItem._id,
                noteTitle: subItem.title,
            }
            : {
                collectionId: subItem._id,
                noteId: selectedItem._id,
                noteTitle: selectedItem.title,
            };

        const succeeded = await addToCollection(requestData);
        if (succeeded) {
            closeDropDown();
        } else {
            setAddingItemId(null);
        }
    }

    useEffect(() => {
        const updatePosition = () => {
            const anchor = anchorRef.current?.getBoundingClientRect();
            const panel = panelRef.current?.getBoundingClientRect();
            if (!anchor || !panel) return;

            const padding = 8;
            const gap = 6;
            const belowTop = anchor.bottom + gap;
            const fitsBelow = belowTop + panel.height <= window.innerHeight - padding;
            const top = fitsBelow
                ? belowTop
                : Math.max(padding, anchor.top - panel.height - gap);
            const maxLeft = window.innerWidth - panel.width - padding;
            const left = Math.max(padding, Math.min(anchor.right - panel.width, maxLeft));

            setPosition({top, left});
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [anchorRef, items.length]);

    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            ref={(node) => {
                panelRef.current = node;
                pickerRef.current = node;
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            style={{
                position: 'fixed',
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                visibility: position ? 'visible' : 'hidden',
            }}
            className="z-60 w-56 max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-[#b51026] bg-white text-gray-800 shadow-xl"
        >
            {items.length === 0 ? (
                <p className="m-0 px-3 py-3 text-sm text-gray-500">{emptyMessage}</p>
            ) : (
                <ul className="m-0 max-h-64 list-none overflow-y-auto p-1.5">
                    {items.map((sub) => (
                        <li key={sub._id} className="list-none">
                            <button
                                type="button"
                                disabled={isAdding}
                                aria-busy={addingItemId === sub._id}
                                className="flex min-h-10 w-full items-center rounded-sm border-0 bg-transparent px-3 py-2 text-left text-sm leading-5 wrap-break hover:bg-[#f9e8ea] disabled:cursor-wait disabled:opacity-70"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    addItem(sub);
                                }}
                            >
                                {addingItemId === sub._id ? '. . .' : sub.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>,
        document.body
    );
}

export default Picker;