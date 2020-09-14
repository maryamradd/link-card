import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";
import DraggableLinkItem from "./DraggableLinkItem";

const DraggableUserLinks = (props) => {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {props.links.map((link, index) => (
            <Draggable key={index} draggableId={"" + link._id} index={index}>
              {(draggableProvided) => (
                <DraggableLinkItem
                  draggable={draggableProvided}
                  link={link}
                  index={index}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DraggableUserLinks;
