import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navBtnVariants } from '../utils/animate';
import { ArrowUpRight, Bag, HeadSet, Home, Moon, Sun, User } from './Icons';
import { LineWrapper } from './ui/Animations';
import useTheme from '../utils/ThemeContext';
import DialogWrapper from './ui/DialogWrapper';

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const [btnHover, setBtnHover] = useState(false);

    const { toggleTheme, theme } = useTheme();
    const { pathname, hash } = useLocation();

    const MotionLink = motion(Link);

    useEffect(() => {
        if (openNav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [openNav]);

    return (
        <header className="border-b bg-white/30 dark:bg-background border-border z-20 h-14 sticky top-0">
            <nav className="flex items-center justify-between md:grid grid-cols-[calc(100%-4rem)_4rem] divide-x divide-border relative z-10 h-full">
                <div className="flex items-center justify-between max-md:flex-1">
                    <h1 className="text-2xl tracking-tighter self-center pl-4">ThePortfolyo</h1>
                    <button className="mr-2 md:mr-4 hover:bg-black/20 dark:hover:bg-black p-2 rounded-xl" onClick={toggleTheme}>
                        <span className="z-10">{theme === 'dark' ? <Moon /> : <Sun />}</span>
                    </button>
                </div>
                <div className="px-1 grid place-items-center self-center h-full">
                    <motion.div
                        className="size-12 flex items-center justify-center relative cursor-pointer aspect-square"
                        onMouseEnter={() => setBtnHover(true)}
                        onMouseLeave={() => setBtnHover(false)}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        <motion.span
                            variants={navBtnVariants.span1(btnHover, openNav)}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                            className="absolute top-1/2 left-1/2 rounded-full size-2 bg-foreground "
                        />
                        <motion.span
                            variants={navBtnVariants.span2(btnHover, openNav)}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                            className="absolute top-1/2 left-1/2 rounded-full size-2 bg-foreground"
                        />
                        <motion.span
                            variants={navBtnVariants.span3(btnHover, openNav)}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                            className="absolute top-1/2 left-1/2 rounded-full size-2 bg-foreground"
                        />
                        <motion.span
                            variants={navBtnVariants.span4(btnHover, openNav)}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                            className="absolute top-1/2 left-1/2 rounded-full size-2 bg-foreground"
                        />
                        <motion.span initial={{ x: '-50%', y: '-70%' }} className="absolute top-1/2 left-1/2 rounded-full size-2 bg-background" />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={btnHover || openNav ? { opacity: 100 } : { opacity: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs"
                        >
                            {openNav ? 'close' : 'menu'}
                        </motion.span>
                    </motion.div>
                </div>
            </nav>
            <AnimatePresence>
                {openNav && (
                    <DialogWrapper open={openNav} setOpen={setOpenNav}>
                        <div className="flex items-center justify-end">
                            {hash.includes('#contact') ? (
                                <ArrowUpRight className="size-20" />
                            ) : hash.includes('#service') ? (
                                <HeadSet className="size-20" />
                            ) : hash.includes('#work') ? (
                                <Bag className="size-20" />
                            ) : hash.includes('#about') ? (
                                <User className="size-20" />
                            ) : (
                                <Home />
                            )}
                        </div>
                        <ul className="">
                            {navLinks.map((link, index) => (
                                <LineWrapper key={index}>
                                    <MotionLink
                                        to={link.path}
                                        whileHover="hover"
                                        animate="animate"
                                        initial="initial"
                                        exit="exit"
                                        className="relative cursor-pointer flex items-center justify-between py-3"
                                        onClick={() => setOpenNav(false)}
                                    >
                                        <motion.span
                                            variants={{
                                                initial: { opacity: 0.5 },
                                                hover: { opacity: 1 },
                                                animate: link.path.includes(hash || pathname) ? { opacity: 1 } : { opacity: 0.5 },
                                            }}
                                            className="block text-2xl tracking-tight"
                                        >
                                            {link.label}
                                        </motion.span>
                                        <motion.div
                                            variants={{
                                                initial: { rotate: 45, scale: 0.3, filter: 'grayscale(1)' },
                                                hover: { rotate: 0, scale: 1, filter: 'grayscale(0)' },
                                                animate: link.path.includes(hash || pathname)
                                                    ? { rotate: 0, scale: 1, filter: 'grayscale(0)' }
                                                    : { rotate: 45, scale: 0.3, filter: 'grayscale(1)' },
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="grid grid-cols-2 gap-px"
                                        >
                                            {Array.from({ length: 4 }).map((_, index) => (
                                                <div key={index} className="size-1.5 rounded-full bg-white" />
                                            ))}
                                        </motion.div>
                                    </MotionLink>
                                </LineWrapper>
                            ))}
                        </ul>
                        <div>
                            <span className="text-sm tracking-tighter dark:text-background text-white/50 block">Contact us</span>
                            <LineWrapper className="inline-block">
                                <p className="text-3xl font-semibold tracking-tighter dark:text-background text-white/40 hover:text-white transition-colors duration-500 relative">
                                    email@gmail.com
                                </p>
                            </LineWrapper>
                        </div>
                    </DialogWrapper>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

const navLinks = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'About',
        path: '#about',
    },
    {
        label: 'Work',
        path: '#work',
    },
    {
        label: 'Services',
        path: '#services',
    },
    {
        label: 'Contact',
        path: '#contact',
    },
];
