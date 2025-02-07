import { useEffect, useState } from "react"
import './TabControl.css';

export const TabControl = ({children}) => {
    const [currTabIndex, setCurrTabIndex] = useState(0);
    const [currTab, setCurrTab] = useState(null);

    useEffect(() => {
        if(children.length > 1) {
            setCurrTab(children[0]);
        }
        else setCurrTab(children);
    }, [children]);

    useEffect(() => {
        if(currTabIndex >= 0 && currTabIndex < children.length) {
            setCurrTab(children[currTabIndex]);
        }
    }, [currTabIndex]);

    const prevTab = () => {
        if(currTabIndex === 0) setCurrTabIndex(children.length - 1);
        else setCurrTabIndex(currTabIndex - 1);
    };

    const nextTab = () => {
        if(currTabIndex === children.length - 1) setCurrTabIndex(0);
        else setCurrTabIndex(currTabIndex + 1);
    };

    return (
        <div className="tab-control overflow-hidden">
            {children.length > 1 ? (
                <div className="tab-controls">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" onClick={prevTab}>
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" onClick={nextTab}>
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                    </svg>
                </div>
            ) : null}
            <div className="tab-content overflow-hidden">
                {currTab}
            </div>
        </div>
    )
}