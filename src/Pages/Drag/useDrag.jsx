import React, { useEffect, useRef, useState } from "react";

function useDrag({ data }) {
    const ref = useRef();
    let isDrag = false;
    let current = null;
    let ctx = null;
    let items = data || [];

    const init = () => {
        const { current } = ref;
        ctx = current.getContext("2d");
        draw();
    };

    //TODO : 화면 그리기
    const draw = () => {
        onClear();
        onMapItem((i) => {
            ctx.fillRect(i.x, i.y, i.w, i.h);
            ctx.fillStyle = i.fill;
            if (i.isActive) onActiveItem(i);
        });
    };

    //TODO : 캔버스 지우기
    const onClear = () => ctx.clearRect(0, 0, 1500, 500);

    //TODO : 최대,최소 위치 체크
    const onInrange = (v, min, max) => {
        if (v < min) return min;
        if (v > max) return max;
        return v;
    };

    //TODO : 캔버스 item 반복문
    const onMapItem = (fn) => items.map(fn);

    //TODO : 마우스 다운 이벤트
    const onMouseDown = (e) => onGetCurrentItem(e);

    //TODO : 마우스 무브 이벤트
    const onMouseMove = (e) => {
        if (!isDrag) return;
        document.addEventListener("mousemove", inSideMove);
        items[current].x = onInrange(
            e.clientX - ref.current.offsetLeft - items[current].w / 2,
            0,
            1500 - items[current].w
        );
        items[current].y = onInrange(
            e.clientY - ref.current.offsetTop - items[current].h / 2,
            0,
            500 - items[current].h
        );
        draw();
    };

    const onMouseUp = () => {
        if (!isDrag) return;
        document.removeEventListener("mousemove", inSideMove);
        items[current].isActive = false;
        current = null;
        isDrag = false;
    };

    //TODO : 현재 선택한 아이템 찾기
    const onGetCurrentItem = (e) => {
        const x = e.pageX;
        const y = e.pageY;
        onMapItem((i, idx) => {
            if (x >= i.x && i.x + i.w >= x && y >= i.y && i.y + i.h >= y) {
                current = idx;
                items[idx].isActive = true;
                isDrag = true;
            } else {
                items[idx].isActive = false;
            }
        });
        draw();
    };

    //TODO : 마우스 영역 캔버스 넘으면 드래그 취소
    const inSideMove = (e) => {
        if (e.pageX < 0 || e.pageX > 1500 || e.pageY > 500 || e.pageY < 0) {
            onMouseUp();
            draw();
        }
    };

    const onActiveItem = (i) => {
        const boxSize = 8;
        const helper = boxSize / 4;
        //top
        ctx.fillRect(i.x - helper, i.y - helper, boxSize, boxSize);
        ctx.fillRect(i.x + i.w / 2 - helper, i.y - helper, boxSize, boxSize);
        ctx.fillRect(i.x + i.w - helper, i.y - helper, boxSize, boxSize);

        //center
        ctx.fillRect(i.x - helper, i.y + i.h / 2 - helper, boxSize, boxSize);
        ctx.fillRect(
            i.x + i.w - helper,
            i.y + i.h / 2 - helper,
            boxSize,
            boxSize
        );

        //bottom
        ctx.fillRect(i.x - helper, i.y + i.h - helper, boxSize, boxSize);
        ctx.fillRect(
            i.x + i.w / 2 - helper,
            i.y + i.h - helper,
            boxSize,
            boxSize
        );
        ctx.fillRect(i.x + i.w - helper, i.y + i.h - helper, boxSize, boxSize);
    };

    useEffect(() => {
        if (!ref) return;
        init();
    }, [ref]);

    return {
        ref,
        onMouseDown,
        onMouseMove,
        onMouseUp,
    };
}

export default useDrag;
