import { ReactElement, ReactNode, } from "react";

interface Props {
    childId: string;
    children: ReactNode;
    className?: string;
    onDragged: (id: string | undefined) => void;
    onDraggedOver: (id: string | undefined) => void;
    onDrop: () => void;
}

export const DraggableContainer: React.FC<Props> = ({
    childId,
    children,
    className,
    onDragged,
    onDraggedOver,
    onDrop
}): ReactElement => {
    const derivedClassName = className ? className : "";

    const handleOnDragStart:
    React.MouseEventHandler<HTMLElement> = (event) => {
        (event.target as HTMLElement).classList.add(derivedClassName);
        const draggedId = event.currentTarget.dataset.draggableId;
        onDragged(draggedId);
    }

    const handleOnDragOver:
    React.MouseEventHandler<HTMLElement> = (event) => {
        event.preventDefault();
        const draggedOverId = event.currentTarget.dataset.draggableId;
        onDraggedOver(draggedOverId);
    }

    const handleOnDragEnd:
    React.DragEventHandler<HTMLDivElement> = (event) => {
        (event.target as HTMLElement).classList.remove(derivedClassName);
    }

    return (
        <div draggable
            key={childId}
            data-draggable-id={childId}
            onDragStart={handleOnDragStart}
            onDragOver={handleOnDragOver}
            onDragEnd={handleOnDragEnd}
            onDrop={onDrop}>
            {children}
        </div>
    );
}
