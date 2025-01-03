import { useContext } from "react";
import { PhotoContext } from "./context/PhotoFeedContext";

interface PhotoFeedProps {
    category: string;
}

const PhotoFeed = ({ category }: PhotoFeedProps) => {
    const {
        state: { subset },
        updateActiveImage,
    } = useContext(PhotoContext);

    const FullPhotos = subset.map((photo, index) => {
        return (
            <div
                className="flex items-start"
                key={"div" + photo}
                onClick={() => {
                    updateActiveImage(index);
                }}
            >
                <img
                    src={`${photo}`}
                    key={"img" + photo}
                    alt=""
                    className="rounded-lg hover:border-blue-500 border-2 border-white hover:cursor-pointer fade-in"
                />
            </div>
        );
    });

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2 h-[80vh] overflow-y-scroll"
            key={"feed" + category}
        >
            {FullPhotos}
        </div>
    );
};

export default PhotoFeed;
