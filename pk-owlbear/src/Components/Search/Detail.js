import { useEffect, useState } from "react";
import './Detail.css';
import { useSearchParams } from "react-router-dom";
import { Monster } from "./Details/Monster";
import { Spell } from "./Details/Spell";
import { Item } from "./Details/Item";
import { Class } from "./Details/Class";
import { Section } from "./Details/Section";
import { Condition } from "./Details/Condition";

export const Detail = ({result, onHide}) => {
    const [name, setName] = useState("");
    const [detail, setDetail] = useState(null);

    useEffect(() => {        
        setName("");
        setDetail(null);
        if(result !== null) {
            fetch("https://api.open5e.com/v1/" + result.route + "?slug=" + result.slug).then(res => res.json()).then((res) => {
                if(res !== undefined && res !== null && res.results !== null && res.results !== undefined && res.results.length > 0) {
                    setName(res.results[0].name)
                    setDetail(res.results[0]);
                }
            })
        }
    }, [result]);
    
    const getDetailInfo = () => {
        if(result !== null) {
            switch(result.route) {
                case 'classes/':
                    return <Class detail={detail} />
                case 'spells/':
                    return <Spell detail={detail} />
                case 'monsters/':
                    return <Monster detail={detail} />
                case 'magicitems/':
                    return <Item detail={detail} />
                case 'sections/':
                    return <Section detail={detail} />
                case 'conditions/':
                    return <Condition detail={detail} />
                default:
                    return <Condition detail={detail} />;
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