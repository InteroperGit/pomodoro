import * as React from 'react';
import ReactDOM from 'react-dom';

type DropDownProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
};

export const DropDown: React.FC<DropDownProps> = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [coords, setCoords] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                buttonRef.current &&
                menuRef.current &&
                !buttonRef.current.contains(target) &&
                !menuRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    React.useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        }
    }, [isOpen]);

    return (
        <>
            <div ref={buttonRef} onClick={() => setIsOpen((p) => !p)} style={{ display: 'inline-block' }}>
                {trigger}
            </div>
            {isOpen &&
                ReactDOM.createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            position: 'absolute',
                            top: coords.top,
                            left: coords.left,
                            zIndex: 9999,
                        }}
                        className="mt-2 w-40 rounded-lg shadow-lg border border-gray-200 bg-white"
                        onClick={e => e.stopPropagation()} // чтобы клики внутри меню не закрывали его
                    >
                        {children}
                    </div>,
                    document.body
                )}
        </>
    );
};
