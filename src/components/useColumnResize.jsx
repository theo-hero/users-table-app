import { useEffect } from "react";

export function useColumnResize(tableRef) {
    useEffect(() => {
        const table = tableRef.current;
        if (!table) return;

        const ths = table.querySelectorAll("th");

        ths.forEach((th) => {
            const handle = th.querySelector(".resize-handle");
            if (!handle) return;

            let startX, startWidth;

            const onMouseMove = (e) => {
                const newWidth = startWidth + (e.clientX - startX);
                const min = 80;
                const constrainedWidth = Math.max(newWidth, min);
                th.style.width = `${constrainedWidth}px`;
            };

            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            handle.addEventListener("mousedown", (e) => {
                startX = e.clientX;
                startWidth = th.offsetWidth;
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            });
        });
    }, [tableRef]);
};