export const moveRow = (source, destination, dragIndex, hoverIndex) => {
    const dragRow = source[dragIndex];
    destination.splice(hoverIndex, 0, dragRow);
    return destination.filter((_, idx) => idx !== dragIndex);
  };
  