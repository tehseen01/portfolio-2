export const navBtnVariants = {
    span1: (hover: boolean, openNav: boolean) => ({
        initial: { x: '-112.5%', y: '-112.5%' },
        animate:
            hover && !openNav
                ? { scale: 0.3, y: '0%', top: 0, x: '-50%' }
                : openNav
                ? {
                      y: '0%',
                      x: '0%',
                      top: 0,
                      left: 'auto',
                      right: 0,
                      scale: 0.3,
                  }
                : { x: '-112.5%', y: '-112.5%' },
    }),
    span2: (hover: boolean, openNav: boolean) => ({
        initial: { x: '12.5%', y: '-112.5%' },
        animate:
            hover && !openNav
                ? { scale: 0.3, y: '-50%', x: '50%', left: '80%' }
                : openNav
                ? { y: '0%', x: '0%', top: 'auto', bottom: 0, left: 'auto', right: 0, scale: 0.3 }
                : { x: '12.5%', y: '-112.5%' },
    }),
    span3: (hover: boolean, openNav: boolean) => ({
        initial: { x: '12.5%', y: '12.5%' },
        animate:
            hover && !openNav
                ? { scale: 0.3, y: '50%', x: '-50%', top: '70%' }
                : openNav
                ? { scale: 0.3, top: 'auto', bottom: 0, left: 0, x: '0%', y: '0%' }
                : { x: '12.5%', y: '12.5%' },
    }),
    span4: (hover: boolean, openNav: boolean) => ({
        initial: { x: '-112.5%', y: '12.5%' },
        animate:
            hover && !openNav
                ? { scale: 0.3, y: '-50%', x: '-50%', left: 0 }
                : openNav
                ? { top: 0, scale: 0.3, y: '0%', x: '0%', left: 0 }
                : { x: '-112.5%', y: '12.5%' },
    }),
};

export const menuBoxes = (openNav: boolean) => ({
    initial: { clipPath: `inset(0% 100% 100% 0% round 12px)` },
    animate: openNav ? { clipPath: `inset(0% 0% 0% 0% round 12px)` } : { clipPath: `inset(0% 100% 100% 0% round 12px)` },
    exit: { clipPath: `inset(100% 0% 0% 100% round 12px)` },
});
