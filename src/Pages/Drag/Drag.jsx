import React from "react";
import { DragSection } from "./styled.Drag";
import useDrag from "./useDrag";

function Drag() {
    const { ref, onMouseDown, onMouseMove, onMouseUp } = useDrag({
        data: [
            {
                x: 10,
                y: 10,
                w: 100,
                h: 100,
                fill: "black",
            },
            {
                x: 300,
                y: 400,
                w: 100,
                h: 100,
                fill: "red",
            },
        ],
    });
    return (
        <div>
            <DragSection
                width={1500}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                height={500}
                ref={ref}
            ></DragSection>
        </div>
    );
}

export default Drag;
