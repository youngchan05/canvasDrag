import React from "react";
import { DragSection, DragWrapper, SectionItem } from "./styled.Drag";
import useDrag from "./useDrag";

function Drag() {
    const { data, addHandler, current, ref, state, onMouseDown } = useDrag();
    const addItem = addHandler();

    const test = (clickEvent, idx) => {};
    return (
        <DragWrapper>
            <ul className="itemList">
                {data.map((i, idx) => (
                    <li
                        onClick={() => addItem.onClick(idx)}
                        className={current === idx ? "active" : ""}
                        style={{
                            width: i.width,
                            height: i.height,
                        }}
                    >
                        <button>
                            <img src={i.img} />
                        </button>
                    </li>
                ))}
            </ul>
            <DragSection ref={ref} onClick={addItem.onAdd}>
                {state.map((i, idx) => (
                    <SectionItem
                        {...i}
                        key={idx}
                        onMouseDown={(e) => onMouseDown(e, idx)}
                    >
                        <span
                            onMouseDown={(e) => onMouseDown(e, idx, "size")}
                        ></span>
                    </SectionItem>
                ))}
            </DragSection>
        </DragWrapper>
    );
}

export default Drag;
