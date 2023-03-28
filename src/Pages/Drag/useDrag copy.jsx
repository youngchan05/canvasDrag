import React, { useRef, useState } from "react";

function useDrag() {
    const ref = useRef();
    const [state, setState] = useState([]);
    const [current, setCurrent] = useState(null);
    const BORDER = 4;
    const onInrange = (v, min, max) => {
        if (v < min) return min;
        if (v > max) return max;
        return v;
    };

    const onSetState = (idx, data) =>
        setState(() =>
            state.map((i, index) => {
                return index === idx
                    ? {
                          ...i,
                          ...data,
                      }
                    : i;
            })
        );

    const setPos = (x, y) => {
        const { width, height } = ref.current.getBoundingClientRect();
        return {
            left: onInrange(x, 0, width - data[current].width - BORDER * 2),
            top: onInrange(y, 0, height - data[current].height - BORDER * 2),
        };
    };
    const addHandler = () => {
        const onClick = (idx) => setCurrent(idx === current ? null : idx);
        const onAdd = (e) => {
            const { current: box } = ref;
            const { width, height } = box.getBoundingClientRect();
            if (e.target === box && current !== null) {
                const diffX =
                    e.clientX - box.offsetLeft - data[current].width / 2;
                const diffY =
                    e.clientY - box.offsetTop - data[current].height / 2;
                setState([
                    ...state,
                    {
                        ...data[current],
                        left: onInrange(
                            diffX,
                            0,
                            width - data[current].width - BORDER * 2
                        ),
                        top: onInrange(
                            diffY,
                            0,
                            height - data[current].height - BORDER * 2
                        ),
                    },
                ]);
            }
        };
        return {
            onClick,
            onAdd,
        };
    };

    const onMouseDown = (clickEvent, idx, type) => {
        const mouseMoveHandler = (moveEvent) => {
            const deltaX = moveEvent.screenX - clickEvent.screenX;
            const deltaY = moveEvent.screenY - clickEvent.screenY;

            if (type === "size") {
                moveEvent.stopImmediatePropagation();
            } else {
                onSetState(
                    idx,
                    setPos(data[idx].left + deltaX, data[idx].top + deltaY)
                );
            }
        };

        const mouseUpHandler = () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler, { once: true });
    };

    const data = [
        {
            width: 100,
            height: 100,
            img: "./asset/images/img_home1.png",
        },
        {
            width: 100,
            height: 100,
            img: "./asset/images/img_home2.png",
        },
        {
            width: 100,
            height: 100,
            img: "./asset/images/img_home3.png",
        },
        {
            width: 100,
            height: 100,
            img: "./asset/images/img_home4.png",
        },
    ];
    return {
        data,
        state,
        current,
        addHandler,
        onMouseDown,
        ref,
    };
}

export default useDrag;
