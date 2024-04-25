import { HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const SectionHeader = ({ className, ...rest }: HTMLMotionProps<'div'>) => {
    return <motion.div className={cn('dot-blur h-36 px-8 p-4 relative overflow-hidden flex items-center', className)} {...rest} />;
};

export const SectionTitle = ({ className, ...rest }: HTMLMotionProps<'h2'>) => {
    return <motion.h2 className={cn('text-5xl md:text-8xl tracking-tight font-bebas', className)} {...rest} />;
};
