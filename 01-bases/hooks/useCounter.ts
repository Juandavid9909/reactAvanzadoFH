import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const useCounter = ({ maxCount = 1 }) => {
    const [counter, setCounter] = useState<number>(5);
    const elementToAnimate = useRef<HTMLHeadingElement>(null);

    const tl = useRef<gsap.core.Timeline>(gsap.timeline());

    useLayoutEffect(() => {
        if(!elementToAnimate.current) return;

        tl.current.to(elementToAnimate.current, { y: -10, duration: 0.2, ease: "ease.out" })
            .to(elementToAnimate.current, { y: 0, duration: 1, ease: "bounce.out" })
            .pause();
    }, []);

    useEffect(() => {
        tl.current.play(0);
    }, [counter]);

    const handleClick = () => {
        setCounter((prev) => Math.min(prev + 1, maxCount));
    };

    return {
        counter,
        elementToAnimate,
        handleClick
    };
};