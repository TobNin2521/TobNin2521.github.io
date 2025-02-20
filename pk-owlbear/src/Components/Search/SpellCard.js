import { capitalizeFirstLetter, parseEntries } from '../../Logic/Utility';
import './SpellCard.css'

export const SpellCard = ({spell}) => {
    console.log(spell);

    const parseSchool = () => {
        switch(spell.school) {
            case "A": return "Abjuration";
            case "C": return "Conjuration";
            case "D": return "Divination";
            case "E": return "Enchantment";
            case "V": return "Evocation";
            case "I": return "Illusion";
            case "N": return "Necromancy";
            case "T": return "Transmutation";
        }
    };

    const parseCS = () => {
        return spell.time.map((item, index) => {
            return item.number + " " + capitalizeFirstLetter(item.unit);
        }).join(", ");
    };

    const parseDist = () => {
        return spell.range.distance.amount + " " + spell.range.distance.type;
    };

    const parseDuration = () => {

    };

    return (
        <div className="spell-container">
            <div className="spell-card">
                <div className="spell-title">{spell.name}</div>
                <div className="spell-info"><strong>Level:</strong> {spell.level}</div>
                <div className="spell-info"><strong>School:</strong> {parseSchool()}</div>
                <div className="spell-info"><strong>Casting Time:</strong> {parseCS()}</div>
                <div className="spell-info"><strong>Range:</strong> {parseDist()}</div>
                <div className="spell-info"><strong>Components:</strong> {Object.keys(spell.components).map(i => capitalizeFirstLetter(i)).join(", ")}</div>
                <div className="spell-info"><strong>Duration:</strong> {spell.duration.map(it => capitalizeFirstLetter(it.type)).join(", ")}</div>
                <div className="spell-description">
                    <p>{parseEntries(spell.entries)}</p>
                    {spell.entriesHigherLevel !== undefined ? spell.entriesHigherLevel.map((item, index) => {
                        return (
                            <>
                                <strong>{item.name}</strong>
                                <p>{parseEntries(item.entries)}</p>
                            </>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    );
};