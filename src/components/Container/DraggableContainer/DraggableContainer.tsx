import { ReactElement, ReactNode, } from "react";

interface Props {
    childId: string;
    children: ReactNode;
    onDragged: (id: string | undefined) => void;
    onDraggedOver: (id: string | undefined) => void;
    onDrop: () => void;
}

export const DraggableContainer: React.FC<Props> = ({
    childId,
    children,
    onDragged,
    onDraggedOver,
    onDrop
}): ReactElement => {

    const handleOnDragStart:
    React.MouseEventHandler<HTMLElement> = (event) => {
        const target = event.currentTarget as HTMLElement;
        const draggedId = target.dataset.draggableId;
        onDragged(draggedId);
    }

    const handleOnDragOver:
    React.MouseEventHandler<HTMLElement> = (event) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLElement;
        const draggedOverId = target.dataset.draggableId;
        onDraggedOver(draggedOverId);
    }

    return (
        <div draggable
            key={childId}
            data-draggable-id={childId}
            onDragStart={handleOnDragStart}
            onDragOver={handleOnDragOver}
            onDrop={onDrop}>
            {children}
        </div>
    );
}