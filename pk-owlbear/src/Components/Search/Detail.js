import { useEffect, useState } from "react";
import './Detail.css';
import { StatBlock } from "./StatBlock";
import { SpellCard } from "./SpellCard";
import { ItemCard } from "./ItemCard";

export const Detail = ({result, onHide}) => {
    const [name, setName] = useState("");
    const [detail, setDetail] = useState(null);

    useEffect(() => {        
        setName("");
        setDetail(null);
        if(result !== null) {
        }
    }, [result]);
    
    const getDetailInfo = () => {
        if(result !== null) {
            switch(result.T) {
                case 's':
                    return <SpellCard spell={result} />
                case 'm':
                    return <StatBlock monster={result} />
                case 'i':
                    return <ItemCard item={result} />
                default:
                    return null;
            }
        }
    };

    return (
        <div className={result !== null ? "detail shown" : "detail overflow-auto"}>
            <div className="detail-top-bar">
                <div className="detail-title"><b>{name}</b></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={onHide}>
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </div>
            {getDetailInfo()}
        </div>
    )
};