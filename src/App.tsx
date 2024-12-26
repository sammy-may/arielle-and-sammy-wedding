import "./App.css";
import PhotoMenu from "./PhotoMenu";
import { GiLipstick } from "react-icons/gi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaMusic } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
import PhotoFeed from "./PhotoFeed";
import { useContext, useEffect } from "react";

import { PhotoContext } from "./context/PhotoFeedContext";
import { MdOutlineCancel } from "react-icons/md";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function App() {
    const {
        state: { active_image, subset },
        updateActiveImage,
    } = useContext(PhotoContext);

    const prev_hidden =
        active_image !== undefined ? (active_image === 0 ? "hidden" : "") : "";
    const next_hidden =
        active_image !== undefined
            ? active_image === subset.length - 1
                ? "hidden"
                : ""
            : "";

    useEffect(() => {
        // Define the keydown event handler
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault(); // Prevent the default action of the `/` key (e.g., typing it in)
                updateActiveImage(-1);
            }
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [updateActiveImage]);

    const Focus = () => {
        if (active_image >= 0) {
            return (
                <div className="absolute top-0 flex flex-col items-center bg-gray-900 border border-gray-700 rounded-lg">
                    <div className="flex items-center place-content-between w-full">
                        <div className="flex items-center place-content-center text-sm bg-gray-900 text-gray-200 font-semibold rounded-lg px-3 py-1.5">
                            Press{" "}
                            <kbd className="mx-1 px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-600 text-gray-100 border-gray-500">
                                Esc
                            </kbd>
                            to exit full-screen mode.
                        </div>
                        <div></div>
                        <div
                            className="z-50 text-xl text-white px-2 hover:cursor-pointer"
                            onClick={() => {
                                updateActiveImage(-1);
                            }}
                        >
                            <MdOutlineCancel />
                        </div>
                    </div>
                    <div
                        className={`absolute top-1 flex items-center text-white text-3xl`}
                    >
                        <div
                            onClick={() => {
                                updateActiveImage(
                                    active_image >= 0 ? active_image - 1 : 0
                                );
                            }}
                            className={`flex items-center hover:cursor-pointer border border-gray-900 hover:border-white rounded-lg px-2 ${prev_hidden}`}
                        >
                            <MdNavigateBefore />
                            <span className="text-base px-2">Prev</span>
                        </div>
                        <div
                            onClick={() => {
                                updateActiveImage(
                                    active_image >= subset.length - 1
                                        ? subset.length - 1
                                        : active_image + 1
                                );
                            }}
                            className={`flex items-center hover:cursor-pointer border border-gray-900 hover:border-white rounded-lg px-2 ${next_hidden}`}
                        >
                            <span className="text-base px-2">Next</span>
                            <MdNavigateNext />
                        </div>
                    </div>
                    <div className=" pb-2">
                        <img
                            src={subset[active_image]}
                            alt=""
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                </div>
            );
        }
        return <></>;
    };

    return (
        <div className="bg-white flex flex-col relative">
            {Focus()}
            <h1 className="text-3xl font-semibold italic text-gray-900">
                Arielle and Sammy's Wedding
            </h1>
            <div className="border w-full px-2 my-2 border-gray-900"></div>
            <div className="h-[40vh] border w-full">Video placeholder</div>
            <PhotoMenu
                buttons={[
                    {
                        icon: <FaPhotoVideo />,
                        text: "All",
                        content: <PhotoFeed category="all" key="all" />,
                    },
                    {
                        icon: <GiLipstick />,
                        text: "Getting Ready",
                        content: <div>Doin our makeup so nice</div>,
                    },
                    {
                        icon: <GiForkKnifeSpoon />,
                        text: "Dinner",
                        content: <div>Dinner was coo</div>,
                    },
                    {
                        icon: <FaMusic />,
                        text: "Dancing",
                        content: <div>Imma young money millionaire</div>,
                    },
                    {
                        icon: <FaCat />,
                        text: "Cats",
                        content: <PhotoFeed category="cats" key="cats" />,
                    },
                ]}
            />
        </div>
    );
}

export default App;
