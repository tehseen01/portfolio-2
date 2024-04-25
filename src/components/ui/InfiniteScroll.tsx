import { ReactNode, useEffect, useRef } from 'react';

interface InfiniteProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: 'slow' | 'normal' | 'fast';
}
const InfiniteScroll = ({ children, direction, speed }: InfiniteProps) => {
    const scrollerRef = useRef<HTMLUListElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        const scroller = scrollerRef.current;
        if (scroller) {
            const scrollContent = Array.from(scroller.children);

            scrollContent.forEach((elem) => {
                const duplicateItem = elem.cloneNode(true);
                scroller.appendChild(duplicateItem);
            });
        }
    };

    const getDirection = () => {
        const container = containerRef.current;

        if (container) {
            if (direction === 'left') {
                container.style.setProperty('--animation-direction', 'forwards');
            } else {
                container.style.setProperty('--animation-direction', 'reverse');
            }
        }
    };

    const getSpeed = () => {
        const container = containerRef.current;

        if (container) {
            if (speed === 'fast') {
                container.style.setProperty('--animation-duration', '20s');
            } else if (speed === 'normal') {
                container.style.setProperty('--animation-duration', '80s');
            } else {
                container.style.setProperty('--animation-duration', '100s');
            }
        }
    };

    useEffect(() => {
        getDirection();
        getSpeed();
        handleScroll();
    }, []);

    return (
        <div className="overflow-hidden w-full" ref={containerRef}>
            <ul className="flex items-center justify-center gap-3 flex-nowrap shrink-0 w-max animate-scroll" ref={scrollerRef}>
                {children}
            </ul>
        </div>
    );
};

export default InfiniteScroll;
