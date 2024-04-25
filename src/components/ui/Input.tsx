import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
    return <input ref={ref} className={cn('focus:outline-none bg-transparent p-2 w-full', className)} {...rest} />;
});

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...rest }, ref) => (
    <textarea ref={ref} className={cn('focus:outline-none bg-transparent p-2 w-full', className)} {...rest} />
));
Textarea.displayName = 'Textarea';

export { Input, Textarea };
