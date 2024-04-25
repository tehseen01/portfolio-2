import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, children, ...rest }: ButtonProps) => {
    return (
        <button
            className={cn('flex items-center justify-center size-10 bg-black text-white rounded-full group overflow-hidden relative', className)}
            {...rest}
        >
            <span className="absolute inset-0 bg-primary w-full h-full rounded-full z-0 translate-y-full group-hover:translate-y-0 transition-transform" />
            {children}
        </button>
    );
};

export default Button;
