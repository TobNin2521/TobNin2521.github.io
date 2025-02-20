import { capitalizeFirstLetter, parseEntries } from '../../Logic/Utility';
import './ItemCard.css';

export const ItemCard = ({item}) => {
    console.log(item);

    const parseType = () => {
        if (item.type === undefined) return "Wondrous Item";
        switch(item.type.substring(0, item.type.indexOf("|"))) {
            case "M":{
                break;
            }
            case "SC": {
                return "Scroll";
            }
            case "LA": {
                return "Leather armor";
            }
            case "HA": {
                return capitalizeFirstLetter(item.baseItem.substring(0, item.baseItem.indexOf("|")));
            }
        }
    };

    return (
        <div className="item-container">
            <div className="item-card">
                <div className="item-title">{item.name}</div>
                <div className="item-info"><strong>{capitalizeFirstLetter(item.rarity)}</strong> {parseType()}</div>
                
                <div className="item-description">
                    <p>{parseEntries(item.entries)}</p>
                </div>
            </div>
        </div>
    );
};