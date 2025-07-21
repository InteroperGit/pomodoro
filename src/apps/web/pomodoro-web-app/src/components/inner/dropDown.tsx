import * as React from 'react';
import ReactDOM from 'react-dom';

type DropDownProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
};

/**
 * DropDown — базовый компонент выпадающего меню с использованием React Portal.
 *
 * Назначение:
 * - Отображает меню рядом с элементом-триггером (кнопкой или любым другим элементом).
 * - Автоматически позиционирует меню под триггером с абсолютным позиционированием.
 * - Закрывается при клике вне области меню и триггера.
 *
 * Пропсы:
 * @param {React.ReactNode} trigger — элемент, по клику на который открывается или закрывается меню.
 * @param {React.ReactNode} children — содержимое выпадающего меню (например, список кнопок).
 *
 * Логика работы:
 * - Состояние `isOpen` управляет отображением меню.
 * - `buttonRef` — ссылка на триггер, необходимая для расчёта позиции и проверки кликов вне элемента.
 * - `menuRef` — ссылка на само меню для корректной работы закрытия по клику вне меню.
 * - При открытии меню через `useEffect` рассчитывается координаты положения меню (`coords`), чтобы разместить его строго под триггером.
 * - Второй `useEffect` следит за кликами по документу: если клик вне триггера и меню — меню закрывается.
 * - Меню рендерится через `ReactDOM.createPortal()` в `document.body` для избежания проблем с overflow/clip родительских контейнеров.
 *
 * Поведение:
 * - Меню автоматически появляется под элементом-триггером.
 * - Закрытие меню при клике вне его области.
 * - Клик внутри меню не закрывает меню (`stopPropagation()` предотвращает всплытие событий).
 *
 * Визуальные особенности:
 * - Стилизация через Tailwind CSS: скруглённые углы, тень, светлый фон, фиксированная ширина.
 * - Координаты обновляются динамически при открытии.
 * - Высокий z-index для поверхностного отображения.
 *
 * Подходит для:
 * - Простых выпадающих меню с любым содержимым.
 * - Меню действий, контекстных меню, списков выбора и т.п.
 *
 * Ограничения:
 * - Отсутствует автоматическая обработка положения в случае выхода за границы viewport.
 * - Отсутствует анимация появления/скрытия (можно добавить по необходимости).
 */
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
                        className="mt-2 w-40 rounded-lg shadow-lg border border-gray-200 bg-white
                            transform transition-all duration-200 ease-out
                            opacity-0 scale-95
                            animate-dropdown"
                        onClick={e => e.stopPropagation()} // чтобы клики внутри меню не закрывали его
                    >
                        {children}
                    </div>,
                    document.body
                )}
        </>
    );
};
