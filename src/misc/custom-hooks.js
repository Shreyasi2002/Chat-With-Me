import { useCallback, useEffect, useState } from 'react';

export function useModalState(defaultValue = false) {
    const [isOpen, setState] = useState(defaultValue);

    const open = useCallback(() => {
        setState(true);
    }, []);
    const close = useCallback(() => {
        setState(false);
    }, []);

    return { isOpen, open, close };
}

export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    );

    useEffect(() => {
        const queryList = window.matchMedia(query);
        setMatches(queryList.matches);

        const listener = evt => setMatches(evt.matches);

        queryList.addListener(listener);
        return () => queryList.removeListener(listener);
    }, [query]);

    return matches;
};
