import { createContext, ReactElement, useCallback, useReducer } from "react";

interface PhotoFeedState {
    active_image: number;
    prev_image: number;
    next_image: number;
    subset: string[];
    other: boolean;
}

const initState: PhotoFeedState = {
    active_image: -1,
    prev_image: -1,
    next_image: -1,
    subset: [],
    other: true,
};

enum PhotoActionKind {
    UPDATE_ACTIVE_IMAGE = "UPDATE_ACTIVE_IMAGE",
    UPDATE_PREV_IMAGE = "UPDATE_PREV_IMAGE",
    UPDATE_NEXT_IMAGE = "UPDATE_NEXT_IMAGE",
    UPDATE_SUBSET = "UPDATE_SUBSET",
}

interface PhotoFeedAction {
    type: PhotoActionKind;
    new_image?: number | null;
    new_subset?: string[] | null;
}

const photoFeedReducer = (
    state: PhotoFeedState,
    action: PhotoFeedAction
): PhotoFeedState => {
    switch (action.type) {
        case PhotoActionKind.UPDATE_ACTIVE_IMAGE:
            return {
                ...state,
                active_image: action.new_image!,
            };
        case PhotoActionKind.UPDATE_NEXT_IMAGE:
            return {
                ...state,
                next_image: action.new_image!,
            };
        case PhotoActionKind.UPDATE_PREV_IMAGE:
            return {
                ...state,
                prev_image: action.new_image!,
            };
        case PhotoActionKind.UPDATE_SUBSET:
            return {
                ...state,
                subset: action.new_subset!,
            };
        default:
            return state;
    }
};

const usePhotoFeedContext = (initState: PhotoFeedState) => {
    const [state, dispatch] = useReducer(photoFeedReducer, initState);

    const updateActiveImage = useCallback((new_image: number) => {
        dispatch({
            type: PhotoActionKind.UPDATE_ACTIVE_IMAGE,
            new_image: new_image,
        });
    }, []);

    const updatePrevImage = useCallback((new_image: number) => {
        dispatch({
            type: PhotoActionKind.UPDATE_PREV_IMAGE,
            new_image: new_image,
        });
    }, []);

    const updateNextImage = useCallback((new_image: number) => {
        dispatch({
            type: PhotoActionKind.UPDATE_NEXT_IMAGE,
            new_image: new_image,
        });
    }, []);

    const updateSubset = useCallback((new_subset: string[]) => {
        dispatch({
            type: PhotoActionKind.UPDATE_SUBSET,
            new_subset: new_subset,
        });
    }, []);

    return {
        state,
        updateActiveImage,
        updatePrevImage,
        updateNextImage,
        updateSubset,
    };
};

type UsePhotoFeedContextType = ReturnType<typeof usePhotoFeedContext>;

const initContextState: UsePhotoFeedContextType = {
    state: initState,
    updateActiveImage: () => {},
    updateNextImage: () => {},
    updatePrevImage: () => {},
    updateSubset: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const PhotoContext =
    createContext<UsePhotoFeedContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined;
};

export const PhotoContextProvider = ({
    children,
}: ChildrenType): ReactElement => {
    return (
        <PhotoContext.Provider value={usePhotoFeedContext(initState)}>
            {children}
        </PhotoContext.Provider>
    );
};
