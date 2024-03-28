import React from "react";
import WishListModal from "./modal/wishListModal/WishListModal";

const Toolbar = ({ property, uid, no }) => {
    return (
        <div className="absolute -top-8 -left-0.5 z-30 flex flex-wrap -space-x-px">
            <button
                type="button"
                title="Edit"
                onClick={() => property.setTabNumber(3)}
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent"
            >
                <span className="material-icons-outlined text-sm">mode_edit</span>{" "}
            </button>
            <button
                type="button"
                title="Copy"
                onClick={() => property.cloneComponent(uid)}
                href="javascipt:void(0);"
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent"
            >
                <span className="material-icons-outlined text-sm">content_copy</span>{" "}
            </button>
            <button
                type="button"
                title="Delete"
                onClick={() => property.deleteComponent(uid)}
                href="javascipt:void(0);"
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent"
            >
                <span className="material-icons-outlined text-sm">delete</span>
            </button>
            <button
                type="button"
                title="Visibility"
                onClick={() => property.changeVisibility(uid)}
                href="javascipt:void(0);"
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent"
            >
                <span className="material-icons-outlined text-sm">visibility</span>
            </button>
            <button
                type="button"
                title="Save"
                onClick={() => property.singleSaveData(uid, no)}
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent"
            >
                <span className="material-icons-outlined text-sm">save</span>{" "}
            </button>
            <WishListModal allFunctions={property} />
        </div>
    );
};

export default Toolbar;
