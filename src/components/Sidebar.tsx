import { useScroll, motion, useTransform } from 'framer-motion';
import { SocialHandle } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { useSectionId } from '../utils/sectionContext';

interface SidebarProp {
    socialHandle: SocialHandle[];
}

const Sidebar = ({ socialHandle }: SidebarProp) => {
    const { scrollYProgress } = useScroll();
    const { sectionId } = useSectionId();

    const y = useTransform(scrollYProgress, [0, 1], ['0px', '160px']);

    return (
        <aside className="max-md:hidden relative h-full">
            <div className="sticky top-16 h-[calc(100dvh_-_4rem)] flex items-center justify-between flex-col">
                <div className="rotate-90 mt-8 flex items-center justify-center">
                    <p>{sectionId || 'home'}</p>
                </div>
                <div className="relative">
                    <motion.div
                        style={{ y, x: '-50%' }}
                        className="absolute top-0 left-1/2 bg-background size-4 rounded-full border border-border"
                    ></motion.div>
                    <div className="h-40 w-px bg-black" />
                </div>
                <ul className="pb-4 space-y-2">
                    {socialHandle.map((social) => (
                        <li key={social._id}>
                            <Link to={social.url} target="_blank">
                                <img
                                    src={social.image.url}
                                    alt={social.platform}
                                    width={30}
                                    height={30}
                                    loading="lazy"
                                    className="grayscale-0 hover:scale-110 transition-transform"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
