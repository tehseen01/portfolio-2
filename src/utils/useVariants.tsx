import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type TVariants = 'DEFAULT' | 'PROJECT' | 'CLOSE' | 'TEXT' | 'NEXT' | 'PREV';

interface ContextProps {
    variant: TVariants;
    setVariant: Dispatch<SetStateAction<TVariants>>;
}

const Context = createContext<ContextProps>({
    variant: 'DEFAULT',
    setVariant: () => {},
});

const VariantProvider = ({ children }: { children: ReactNode }) => {
    const [variant, setVariant] = useState<TVariants>('DEFAULT');

    return <Context.Provider value={{ variant, setVariant }}>{children}</Context.Provider>;
};

const useVariants = () => {
    const { setVariant, variant } = useContext(Context);

    return { variant, setVariant };
};

export { useVariants, VariantProvider };
