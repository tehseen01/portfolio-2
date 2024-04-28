import { HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const SectionHeader = ({ className, ...rest }: HTMLMotionProps<'div'>) => {
    return <motion.div className={cn('dot-blur dark:dot-blur-dark h-36 px-8 p-4 relative overflow-hidden flex items-center', className)} {...rest} />;
};

export const SectionTitle = ({ className, children, ...rest }: HTMLMotionProps<'h2'>) => {
    return (
        <motion.h2 className={cn('text-5xl md:text-8xl tracking-tight font-bebas', className)} {...rest}>
            {children &&
                typeof children === 'string' &&
                children.split('').map((char, index) => (
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.04 * index }}
                        viewport={{ once: true }}
                        key={index}
                        className="whitespace-pre inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
        </motion.h2>
    );
};
