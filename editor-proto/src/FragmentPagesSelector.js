import React, { useState, useRef, useEffect } from 'react';
import { secsToString } from "./utils";
import ImageAreaSelector from "./ImageAreaSelector";

function FragmentPagesSelector({ pages, fragmentPages, fragmentPageAreas, onFragmentPagesChanges, onFragmentPageAreasChanged }) {
    const handleOnChange = (e, pageIdx) => {
        const newFragmentPages = JSON.parse(JSON.stringify(fragmentPages));
        const page = pages[pageIdx];
        if (e.target.checked) {
            newFragmentPages[page.id] = true;
        } else {
            delete newFragmentPages[page.id];
        }
        onFragmentPagesChanges(newFragmentPages);
    }

    const handleOnNewAreaAdded = (pageId, newArea) => {
        const newFragmentPageAreas = JSON.parse(JSON.stringify(fragmentPageAreas));
        if (!newFragmentPageAreas[pageId]) {
            newFragmentPageAreas[pageId] = [newArea];
        } else {
            newFragmentPageAreas[pageId].push(newArea);
        }
        onFragmentPageAreasChanged(newFragmentPageAreas);
    }

    const handleOnDeleteArea = (pageId, areaIdx) => {
        const newFragmentPageAreas = JSON.parse(JSON.stringify(fragmentPageAreas));
        newFragmentPageAreas[pageId].splice(areaIdx, 1);
        onFragmentPageAreasChanged(newFragmentPageAreas);
    }

    return <div>
        {pages.map((p, idx) => {
            return <div>
                <input type="checkbox" checked={fragmentPages[p.id] ? true : false} onChange={((e) => handleOnChange(e, idx)).bind(this)} /> Page #{idx + 1}
            </div>
        })}


        {pages.map((p, idx) => {
            return fragmentPages[p.id] ?
                    <div>
                        Page #{idx+1}
                    <ImageAreaSelector imgUrl={p.url} width = {500} areas={fragmentPageAreas[p.id] || [] }
                                       onNewAreaAdded={((area) => handleOnNewAreaAdded(p.id, area)).bind(this)}
                                       onDeleteArea={((areaIdx) => handleOnDeleteArea(p.id, areaIdx)).bind(this)}
                    />
                    </div>
                    : '';
        })}
    </div>;
};

export default FragmentPagesSelector;
