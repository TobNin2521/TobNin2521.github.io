import './StatBlock.css';

export const StatBlock = ({monster}) => {
    console.log(monster);
    const getSize = () => {
        switch(monster.size) {
            case "S": return "Small";
            case "M": return "Meduim";
            case "L": return "Large";
            case "H": return "Huge";
            case "G": return "Gargantuan";
        }
    };

    const getType = () => {
        if(typeof(monster.type) === "string") return capitalizeFirstLetter(monster.type);
        return capitalizeFirstLetter(monster.type.type) + " (" + monster.type.tags.join(", ") + ")";
    };

    const getType2 = () => {
        if(typeof(monster.type) === "string") return monster.type;
        return monster.type.type;
    };

    const getAlignment = () => {
        const alignmentMap = {
            'L': 'Lawful',
            'N': 'Neutral',
            'C': 'Chaotic',
            'G': 'Good',
            'E': 'Evil'
        };
        
        return monster.alignment.map(letter => alignmentMap[letter] || '').join(' ');
    };

    const getMod = (t) => {
        switch(t) {
            case "ST": return ("+" + Math.floor((monster.str - 10) / 2).toFixed(0));
            case "DE": return ("+" + Math.floor((monster.dex - 10) / 2).toFixed(0));
            case "CO": return ("+" + Math.floor((monster.con - 10) / 2).toFixed(0));
            case "IN": return ("+" + Math.floor((monster.int - 10) / 2).toFixed(0));
            case "WI": return ("+" + Math.floor((monster.wis - 10) / 2).toFixed(0));
            case "CH": return ("+" + Math.floor((monster.cha - 10) / 2).toFixed(0));
        }
    };

    const getSave = (t) => {
        switch(t) {
            case "ST": return monster.save !== undefined && monster.save.str !== undefined ? monster.save.str : ("+" + Math.floor((monster.str - 10) / 2).toFixed(0));
            case "DE": return monster.save !== undefined && monster.save.dex !== undefined ? monster.save.dex : ("+" + Math.floor((monster.dex - 10) / 2).toFixed(0));
            case "CO": return monster.save !== undefined && monster.save.con !== undefined ? monster.save.con : ("+" + Math.floor((monster.con - 10) / 2).toFixed(0));
            case "IN": return monster.save !== undefined && monster.save.int !== undefined ? monster.save.int : ("+" + Math.floor((monster.int - 10) / 2).toFixed(0));
            case "WI": return monster.save !== undefined && monster.save.wis !== undefined ? monster.save.wis : ("+" + Math.floor((monster.wis - 10) / 2).toFixed(0));
            case "CH": return monster.save !== undefined && monster.save.cha !== undefined ? monster.save.cha : ("+" + Math.floor((monster.cha - 10) / 2).toFixed(0));
        }
    };

    const parseEntries = (entries) => {
        let p = [];
        for(let i = 0; i < entries.length; i++) {
            if(typeof(entries[i]) === "string") p.push(<span key={i}>{replaceDndTags(entries[i])}</span>);
            else {
                for(let j = 0; j < entries[i].items.length; j++) {
                    p.push(<div key={i + "-1"}><i>{replaceDndTags(entries[i].items[j].name)}</i></div>);
                    p.push(<div key={i + "-2"}>{replaceDndTags(entries[i].items[j].entry)}</div>);
                }
            }
        }
        return p;
    };
    const replaceDndTags = (inputString) => {
        return inputString.replace(/\{@(damage|dc|condition|hit|recharge|skill|status) ([^}]+)\}/g, '$2').replaceAll("{@h}", "").replaceAll("{@atk mw}", "").replaceAll("{@atk mw,rw}", "");
    }
    const capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const getCR = () => {
        if(typeof(monster.cr) === "string") return monster.cr;
        return monster.cr.cr;
    };

    const parseLairAction = (la, index) => {
        if(typeof(la) === "string") return <p key={index}>{la}</p>;
        else if(la.entries !== undefined) {
            return <p key={index}><strong>{replaceDndTags(la.name)}.</strong> {parseEntries(la.entries)}</p>
        }
        return la.items.map((ite, inde) => {
            return <p key={inde}><strong>{replaceDndTags(ite.name)}.</strong> {parseEntries(ite.entries)}</p>
        })
    };
    const parseAC = () => {
        let acFrom = [];
        for(let i = 0; i < monster.ac[0].from.length; i++) {
            let f = monster.ac[0].from[i];
            if(f.indexOf("{") >= 0) {
                f = f.substring(f.lastIndexOf("|") + 1, f.length - 1);
            }
            acFrom.push(f);
        }
        return acFrom.join(",");
    };

    return (
        <div className="stat-container">
            <div className="stat-block">
                <div className="title">
                    <h1>{monster.name}</h1>
                    <h2>{getSize()} {getType()}, {getAlignment()}</h2>
                </div>
                <div className="divider"></div>
                <div className="stats">
                    <p><strong>Armor Class</strong> {monster.ac[0].ac} ({parseAC()})</p>
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
                            <td>{getMod("ST")}</td><td>{getMod("DE")}</td><td>{getMod("CO")}</td><td>{getMod("IN")}</td><td>{getMod("WI")}</td><td>{getMod("CH")}</td>
                        </tr>
                        <tr>
                            <td>{getSave("ST")}</td><td>{getSave("DE")}</td><td>{getSave("CO")}</td><td>{getSave("IN")}</td><td>{getSave("WI")}</td><td>{getSave("CH")}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="stats">
                    {monster.skill !== undefined ? <p><strong>Skills</strong> {Object.keys(monster.skill).map(item => capitalizeFirstLetter(item) + " " + monster.skill[item]).join(", ")}</p> : null}
                    {monster.immune !== undefined ? <p><strong>Immunities</strong> {monster.immune.join(', ')}</p> : null}
                    {monster.senses !== undefined ? <p><strong>Senses</strong> {monster.senses.join(', ')}</p> : null}
                    {monster.languages !== undefined ? <p><strong>Languages</strong> {monster.languages.join(', ')}</p> : null}
                    {monster.ac !== undefined ? <p><strong>CR</strong> {getCR()}</p> : null}
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
                        <p>The {getType2()} can take {monster.legendaryActions} legendary actions, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. The {getType2()} regains spent legendary actions at the start of its turn.</p>
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
            </div>
        </div>
    );
};