import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'ITEM';

const DraggableRow = ({ item, index, moveItem, listType }) => {
    const [{ isDragging }, ref] = useDrag({
        type: ItemType,
        item: { index, item, listType },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (draggedItem) => {
            if (draggedItem.listType !== listType) {
                moveItem(draggedItem.index, index, draggedItem.item, draggedItem.listType, listType);
            }
        },
    });

    return (
        <tr ref={(node) => ref(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <td>{item}</td>
        </tr>
    );
};

const DragDropTable = () => {
    const [leftItems, setLeftItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [rightItems, setRightItems] = useState([]);

    const moveItem = (fromIndex, toIndex, item, sourceListType, targetListType) => {
        let sourceList, setSourceList, targetList, setTargetList;

        if (sourceListType === 'left') {
            sourceList = leftItems;
            setSourceList = setLeftItems;
        } else {
            sourceList = rightItems;
            setSourceList = setRightItems;
        }

        if (targetListType === 'left') {
            targetList = leftItems;
            setTargetList = setLeftItems;
        } else {
            targetList = rightItems;
            setTargetList = setRightItems;
        }

        const updatedSourceList = [...sourceList];
        updatedSourceList.splice(fromIndex, 1);
        setSourceList(updatedSourceList);

        const updatedTargetList = [...targetList];
        updatedTargetList.splice(toIndex, 0, item);
        setTargetList(updatedTargetList);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Left Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leftItems.map((item, index) => (
                            <DraggableRow
                                key={index}
                                item={item}
                                index={index}
                                moveItem={moveItem}
                                listType="left"
                            />
                        ))}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th>Right Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rightItems.map((item, index) => (
                            <DraggableRow
                                key={index}
                                item={item}
                                index={index}
                                moveItem={moveItem}
                                listType="right"
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </DndProvider>
    );
};

export default DragDropTable;
