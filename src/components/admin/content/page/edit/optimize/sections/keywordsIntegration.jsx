import { escapeRegExp } from 'lodash';
import React, { useState, useEffect, useCallback } from 'react'

const KeywordsIntegration = (props) => {

    const { tag, handleTag, handleRelatedStr, relatedStr } = props

    const [showHide, setShowHide] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [focusKeywords, setFocusKeywords] = useState([]);
    const [focusKeywordsSynonym, setFocusKeywordsSynonym] = useState([]);

    const showHideProperties = () => {
        if (showHide === true)
            setShowHide(false);
        else {
            const allWithClass = Array.from(
                document.querySelectorAll('div.property-content')
            );
            allWithClass.forEach(element => {
                element.classList.add("hidden");
            });
            setShowHide(true);

        }
    };


    const getHighlightedText = (keyword) => {
        if (!keyword) {
            return
        }
        let x = document.getElementById("right1");
        let highlightedElements = []
        document.querySelectorAll('.highlighted').forEach(node => {
            highlightedElements.push(node.outerHTML)
        })

        let myElementSet = new Set(highlightedElements)
        myElementSet = Array.from(myElementSet)
        let highlightedElement = document.querySelector('.highlighted')
        if (highlightedElement?.textContent) {
            let re = new RegExp(myElementSet.join("|"), "gi");
            let text1 = x.innerHTML.replaceAll(re, highlightedElement.textContent);
            x.innerHTML = text1;
        };
        let text = x.innerHTML.replaceAll(new RegExp(escapeRegExp(keyword), 'g'), '<span class="highlighted">' + keyword + '</span>');
        x.innerHTML = text;
    }

    return (
        <>
            <div className="relative bg-white mb-4">
                <button onClick={() => { showHideProperties() }} className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-medium">
                    <span className="ml-1 font-bold">H1 - H6 Tags</span>
                    <span className="flex">
                        <span className="text-xs inline-flex font-bold border border-yellow-300 bg-yellow-100 text-black-600 rounded-full text-center px-4 py-1 ml-3">
                            {totalCount}/{focusKeywords.length + focusKeywordsSynonym.length}
                        </span>
                        <span className="material-icons-outlined ml-3 pointer-class">{showHide ? "keyboard_arrow_down" : "keyboard_arrow_up"}</span>
                    </span>
                </button>
                <div className={`bg-white border-y border-b-0 border-neutral-200 overflow-hidden ${showHide ? "" : "hidden"}`}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                        <select value={tag} style={{ width: '100%' }} onChange={(event) => handleTag(event)}>
                            <option value={'h1'}>h1</option>
                            <option value={'h2'}>h2</option>
                            <option value={'h3'}>h3</option>
                            <option value={'h4'}>h4</option>
                            <option value={'h5'}>h5</option>
                            <option value={'h6'}>h6</option>
                        </select>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 20px 20px 20px' }} >
                        <input type="text" style={{ width: '100%' }} className="w-4\/6 px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md" id="fousss" value={relatedStr} onChange={(event) => handleRelatedStr(event)} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 20px 20px 20px' }} >
                        <button type='button' onClick={() => getHighlightedText(relatedStr)}>Search</button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default KeywordsIntegration