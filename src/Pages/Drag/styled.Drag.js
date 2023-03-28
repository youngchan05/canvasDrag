import styled, { css } from "styled-components";

export const DragWrapper = styled.div`
    display: flex;
    margin: 100px 40px 0 40px;
    .itemList {
        li {
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            &.active {
                img {
                    opacity: 0.3;
                }
                &::after {
                    display: block;
                    content: "";
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                }
            }
        }
    }
`;

export const DragSection = styled.canvas`
    position: relative;
    border: 4px solid #000;
`;

export const SectionItem = styled.div`
    ${({ left, top, width, height, img }) => css`
        position: absolute;
        left: ${left}px;
        top: ${top}px;
        width: ${width}px;
        height: ${height}px;
        background: url(${img}) no-repeat center / 100%;
    `}
    span {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        background-color: red;
        border: 1px solid #eee;
        cursor: s-resize;
    }
`;
