import './StatBlock.css';
import { getSave, getSize, getType, getType2, parseAC, parseEntries, parseLairAction, getAlignment, getMod, capitalizeFirstLetter, getCR, replaceDndTags } from '../../Logic/Utility';

export const StatBlock = ({monster}) => {
    console.log(monster);

    return (
        <div className="stat-container">
            <div className="stat-block">
                <div className="title">
                    <h1>{monster.name}</h1>
                    <h2>{getSize(monster)} {getType(monster)}, {getAlignment(monster)}</h2>
                </div>
                <div className="divider"></div>
                <div className="stats">
                    <p><strong>Armor Class</strong> {monster.ac[0].ac} ({parseAC(monster)})</p>
                    <p><strong>Hit Points</strong> {monster.hp.average} ({monster.hp.formula})</p>
                    <p><strong>Speed</strong> {Object.keys(monster.speed).map(item => item + " " + monster.speed[item] + " ft.").join(", ")}</p>
                </div>
                <div className="divider"></div>
                <table className="abilities">
                    <thead>
                        <tr>
                            <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.str}</td><td>{monster.dex}</td><td>{monster.con}</td><td>{monster.int}</td><td>{monster.wis}</td><td>{monster.cha}</td>
                        </tr>
                        <tr>
                            <td>{getMod("ST", monster)}</td><td>{getMod("DE", monster)}</td><td>{getMod("CO", monster)}</td><td>{getMod("IN", monster)}</td><td>{getMod("WI", monster)}</td><td>{getMod("CH", monster)}</td>
                        </tr>
                        <tr>
                            <td>{getSave("ST", monster)}</td><td>{getSave("DE", monster)}</td><td>{getSave("CO", monster)}</td><td>{getSave("IN", monster)}</td><td>{getSave("WI", monster)}</td><td>{getSave("CH", monster)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="stats">
                    {monster.skill !== undefined ? <p><strong>Skills</strong> {Object.keys(monster.skill).map(item => capitalizeFirstLetter(item) + " " + monster.skill[item]).join(", ")}</p> : null}
                    {monster.immune !== undefined ? <p><strong>Immunities</strong> {monster.immune.join(', ')}</p> : null}
                    {monster.senses !== undefined ? <p><strong>Senses</strong> {monster.senses.join(', ')}</p> : null}
                    {monster.languages !== undefined ? <p><strong>Languages</strong> {monster.languages.join(', ')}</p> : null}
                    {monster.ac !== undefined ? <p><strong>CR</strong> {getCR(monster)}</p> : null}
                </div>
                <div className="divider"></div>
                <div className="traits">
                    {monster.trait.map((item, index) => {
                        return (
                            <p key={index}><strong>{replaceDndTags(item.name)}.</strong> {parseEntries(item.entries)}</p>
                        )
                    })}
                </div>
                <div className="divider"></div>
                <div className="actions">
                    <h2>Actions</h2>
                    {monster.action.map((item, index) => {
                        return (
                            <p key={index}><strong>{replaceDndTags(item.name)}.</strong> {parseEntries(item.entries)}</p>
                        )
                    })}
                </div>
                {monster.legendary !== undefined ? (<>
                    <div className="divider"></div>
                    <div className="legendary-actions">
                        <h2>Legendary Actions</h2>
                        <p>The {getType2(monster)} can take {monster.legendaryActions ?? 3} legendary actions, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. The {getType2(monster)} regains spent legendary actions at the start of its turn.</p>
                        {monster.legendary.map((item, index) => {
                            return (
                                <p key={index}><strong>{replaceDndTags(item.name)}.</strong> {parseEntries(item.entries)}</p>
                            )
                        })}
                    </div>
                </>) : null}
                {monster.lairActions !== undefined ? (<>
                    <div className="divider"></div>
                    <div className="lair-actions">
                        <h2>Lair Actions</h2>
                        {monster.lairActions.map((item, index) => {
                            return parseLairAction(item, index)
                        })}
                    </div>
                </>) : null}
                {monster.regionalEffects !== undefined ? (<>
                    <div className="divider"></div>
                    <div className="lair-actions">
                        <h2>Regional Effects</h2>
                        {monster.regionalEffects.map((item, index) => {
                            return parseLairAction(item, index)
                        })}
                    </div>
                </>) : null}
            </div>
        </div>
    );
};