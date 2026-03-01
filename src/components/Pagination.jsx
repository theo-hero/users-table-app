import "../styles/pagination.css"
import { useMemo, useRef, useState, useEffect } from "react";

const getPages = (current, total, delta) => {
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l > 2) {
                rangeWithDots.push("dots");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
};
export default function ({ currentPage, totalPages, onChange }) {

    const containerRef = useRef(null);
    const [delta, setDelta] = useState(1);

    useEffect(() => {
        const updateDelta = () => {
            const width = window.innerWidth;

            let newDelta;

            if (width > 1400) newDelta = 5;
            else if (width > 1200) newDelta = 4;
            else if (width > 992) newDelta = 3;
            else if (width > 768) newDelta = 2;
            else newDelta = 1;

            setDelta(newDelta);
        };

        updateDelta();
        window.addEventListener("resize", updateDelta);
        return () => window.removeEventListener("resize", updateDelta);
    }, []);

    const pages = useMemo(
        () => getPages(currentPage, totalPages, delta),
        [currentPage, totalPages, delta]
    );


    return (
        <div className="pagination-container">
            <nav className="pagination" aria-label="Pagination">
                <button
                    className="page-btn"
                    onClick={() => onChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>

                {pages.map((page, index) =>
                    page.toString().includes("dots") ? (
                        <span key={index} className="dots">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`page-btn ${currentPage === page ? "active" : ""
                                }`}
                            onClick={() => onChange(page)}
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="page-btn"
                    onClick={() => onChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    ›
                </button>
            </nav>
        </div>
    );
}