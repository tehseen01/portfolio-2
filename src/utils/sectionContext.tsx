import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface IContext {
    sectionId: string;
    setSectionId: Dispatch<SetStateAction<string>>;
}

const SectionContext = createContext<IContext>({
    sectionId: '',
    setSectionId: () => {},
});

const SectionProvider = ({ children }: { children: ReactNode }) => {
    const [sectionId, setSectionId] = useState('');

    return <SectionContext.Provider value={{ sectionId, setSectionId }}>{children}</SectionContext.Provider>;
};

const useSectionId = () => {
    const { sectionId, setSectionId } = useContext(SectionContext);

    return { sectionId, setSectionId };
};

export { SectionProvider, useSectionId };
