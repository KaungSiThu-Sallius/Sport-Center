/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useArticlesDispatch, useArticlesState } from "../../context/articles/context";

import { ArticleData } from "../../context/articles/types";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";




const ArticleDetails = () => {

    const articleState = useArticlesState();
    const articleDispatch = useArticlesDispatch();

    let [isOpen, setIsOpen] = useState(true);
    const { pathname } = useLocation();
    const previousUrl = pathname;

    const match = previousUrl.match(/\/(\d+)/);
    const trimmedUrl = match ? `/${match[1]}` : "/";

    console.log(trimmedUrl)


    let { articleID } = useParams();
    let navigate = useNavigate();


    const selectedArticle = articleState?.articlesDataList.filter(
        (article) => `${article.id}` === articleID
    )[0];

    // const selectedArticle = articleState.articlesDataList[articleID ?? ""];

    // console.log(selectedArticle);


    if (!selectedArticle) {
        return <>No such Article!</>;
    }

    function closeModal() {
        setIsOpen(false);
        navigate(`/${selectedArticle.sport.id}`);
    }



    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-3xl font-medium leading-6 text-gray-900 mb-5"
                                    >
                                        Task Details
                                    </Dialog.Title>
                                    <div>
                                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                            {/* Image */}
                                            <img src={selectedArticle.thumbnail} alt="Article Thumbnail" className="w-full h-48 object-cover" />

                                            {/* Content */}
                                            <div className="p-4">
                                                <h2 className="text-xl font-semibold mb-5">{selectedArticle.title}</h2>
                                                <p className="text-sm">{selectedArticle.summary}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </>
    );
};

export default ArticleDetails;