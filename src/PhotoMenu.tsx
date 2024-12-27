import { useContext, useEffect, useState } from "react";
import { PhotoContext } from "./context/PhotoFeedContext";

interface MenuButtonProps {
    icon: JSX.Element;
    text: string;
    content: JSX.Element;
}

interface MenuButtonOnlyProps {
    icon: JSX.Element;
    text: string;
}

interface FullMenuProps {
    buttons: MenuButtonProps[];
}

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

const cat_photos = [
    "images/cats/IMG_0439.jpeg",
    "images/cats/IMG_0443.jpeg",
    "images/cats/IMG_0709.jpeg",
    "images/cats/IMG_0359.jpeg",
    "images/cats/IMG_0387.jpeg",
    "images/cats/IMG_0386.jpeg",
];

const getting_ready = ["images/cats/IMG_0443.jpeg"];

const dinner = ["images/climbing/IMG_9125.jpeg"];

const dancing = ["images/climbing/IMG_9154.jpeg"];

const climbing_photos = [
    "images/climbing/IMG_9125.jpeg",
    "images/climbing/IMG_9154.jpeg",
    "images/climbing/IMG_9167.jpeg",
];

const map = new Map();
map.set("cats", cat_photos);
map.set("getting-ready", getting_ready);
map.set("dinner", dinner);
map.set("dancing", dancing);
map.set("climbing", climbing_photos);
map.set("all", cat_photos.concat(climbing_photos));

const PhotoMenu = ({ buttons }: FullMenuProps) => {
    const { updateSubset } = useContext(PhotoContext);

    const MenuButton = ({ icon, text }: MenuButtonOnlyProps) => {
        const id = slugify(text);
        const active = id === visibleId;
        const bg_color: string = active
            ? "bg-blue-200 border-blue-400 text-blue-900 hover:border-blue-300 hover:bg-blue-100"
            : "bg-white border-gray-400 text-gray-900 hover:border-blue-400 hover:bg-blue-200 hover:text-blue-900";
        return (
            <a
                id={id}
                href={`#${id}`}
                key={"a" + id}
                onClick={() => {
                    //updateSubset(map.get(slugify(text)));
                }}
                className={`group flex flex-col items-start hover:cursor-pointer py-1 border rounded-lg mb-1 ${bg_color}`}
            >
                <div
                    className="flex items-center whitespace-nowrap space-x-2 px-2"
                    key={"div1" + id}
                >
                    <div key={"icon" + id}>{icon}</div>
                    <div className="text-sm font-semibold" key={"text" + id}>
                        {text}
                    </div>
                </div>
            </a>
        );
    };

    /*     const MenuCat = ({ title, buttons }: MenuCatProps) => {
        return (
            <div className="space-y-1 pb-2">
                <div className="px-4 text-sm font-semibold text-gray-400">
                    {title}
                </div>
                <div className="flex flex-col items-start w-72">
                    {buttons.map((butt) => {
                        return (
                            <MenuButton
                                icon={butt.icon}
                                text={butt.text}
                                content={butt.content}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }; */

    const [visibleId, setVisibleId] = useState<string | null>("all");

    useEffect(() => {
        const handleHashChange = () => {
            let currentHash = window.location.hash.replace("#", "");
            if (!currentHash) currentHash = "all";
            setVisibleId(currentHash);
        };

        // Set initial hash on page load
        handleHashChange();

        // Listen for hash changes
        window.addEventListener("hashchange", handleHashChange);

        // Cleanup event listener
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    useEffect(() => {
        updateSubset(map.get(visibleId));
    }, [visibleId, updateSubset]);

    const contents = () => {
        const conts: { id: string; content: JSX.Element }[] = [];
        buttons.forEach((butt) => {
            const id = slugify(butt.text);
            conts.push({
                id: id,
                content: butt.content,
            });
        });
        return conts;
    };

    return (
        <div className="flex flex-col items-center px-6 max-w-screen-2xl border border-gray-900 rounded-xl pb-2">
            <div className="flex items-center flex-wrap space-x-2 pt-2 pb-1 border-b border-x rounded-b-xl px-2 border-gray-900 bg-gray-100">
                {buttons.map((butt) => {
                    return <MenuButton icon={butt.icon} text={butt.text} />;
                })}
            </div>
            <div className="">
                {contents().map((cont) => {
                    const visible = cont.id === visibleId;
                    if (visible) {
                        return <div>{cont.content}</div>;
                    } else {
                        return <div className="hidden">{cont.content}</div>;
                    }
                })}
            </div>
        </div>
    );
};

export default PhotoMenu;
