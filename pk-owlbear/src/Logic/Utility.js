
const parseTextToHtml = (text) => {
    let s = text.split('**');
    let open = true;
    let retHtml = "";
    if(s.length > 1) {
        retHtml += s[0];
        for (let i = 1; i < s.length; i++) {
            retHtml += (open === true ? "<br/><b>" : "</b><br/>") + s[i];
            open = !open;
        }
    }
    else retHtml = text;
    return "<p>" + retHtml + "</p>";
}; 
const getSize = (monster) => {
    switch (monster.size) {
        case "S": return "Small";
        case "M": return "Meduim";
        case "L": return "Large";
        case "H": return "Huge";
        case "G": return "Gargantuan";
    }
};

const getType = (monster) => {
    if (typeof (monster.type) === "string") return capitalizeFirstLetter(monster.type);
    return capitalizeFirstLetter(monster.type.type) + " (" + monster.type.tags.join(", ") + ")";
};

const getType2 = (monster) => {
    if (typeof (monster.type) === "string") return monster.type;
    return monster.type.type;
};

const getAlignment = (monster) => {
    const alignmentMap = {
        'L': 'Lawful',
        'N': 'Neutral',
        'C': 'Chaotic',
        'G': 'Good',
        'E': 'Evil'
    };

    return monster.alignment.map(letter => alignmentMap[letter] || '').join(' ');
};

const getMod = (t, monster) => {
    switch (t) {
        case "ST": return ("+" + Math.floor((monster.str - 10) / 2).toFixed(0));
        case "DE": return ("+" + Math.floor((monster.dex - 10) / 2).toFixed(0));
        case "CO": return ("+" + Math.floor((monster.con - 10) / 2).toFixed(0));
        case "IN": return ("+" + Math.floor((monster.int - 10) / 2).toFixed(0));
        case "WI": return ("+" + Math.floor((monster.wis - 10) / 2).toFixed(0));
        case "CH": return ("+" + Math.floor((monster.cha - 10) / 2).toFixed(0));
    }
};

const getSave = (t, monster) => {
    switch (t) {
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
    for (let i = 0; i < entries.length; i++) {
        if (typeof (entries[i]) === "string") p.push(<span key={i}>{replaceDndTags(entries[i])}</span>);
        else if (entries[i].entries !== undefined) {
            p.push([...parseEntries(entries[i].entries)]);
        }
        else {
            for (let j = 0; j < entries[i].items.length; j++) {
                if (typeof (entries[i].items[j]) === "string") p.push(<div key={j + "j3"}>{replaceDndTags(entries[i].items[j])}</div>);
                else {
                    p.push(<div key={j + "-j1"}><i>{replaceDndTags(entries[i].items[j].name)}</i></div>);
                    p.push(<div key={j + "-j2"}>{replaceDndTags(entries[i].items[j].entry)}</div>);
                }
            }
        }
    }
    return p;
};
const replaceDndTags = (inputString) => {
    return inputString.replace(/\{@(damage|dc|condition|dice|hit|recharge|skill|status|creature|variantrule|scaledamage|spell) ([^}]+)\}/g, '$2').replaceAll("{@h}", "").replaceAll("{@atk mw}", "").replaceAll("{@atk mw,rw}", "");
}
const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const getCR = (monster) => {
    if (typeof (monster.cr) === "string") return monster.cr;
    return monster.cr.cr;
};

const parseLairAction = (la, index) => {
    if (typeof (la) === "string") return <p key={index}>{la}</p>;
    else if (la.entries !== undefined) {
        return <p key={index}><strong>{replaceDndTags(la.name)}.</strong> {parseEntries(la.entries)}</p>
    }
    return la.items.map((ite, inde) => {
        return typeof (ite) === "string" ? <p key={inde}>{replaceDndTags(ite)}</p> : <p key={inde}><strong>{replaceDndTags(ite.name)}.</strong> {parseEntries(ite.entries)}</p>
    })
};
const parseAC = (monster) => {
    let acFrom = [];
    for (let i = 0; i < monster.ac[0].from.length; i++) {
        let f = monster.ac[0].from[i];
        if (f.indexOf("{") >= 0) {
            f = f.substring(f.lastIndexOf("|") + 1, f.length - 1);
        }
        acFrom.push(f);
    }
    return acFrom.join(",");
};



export {parseTextToHtml, getSave, getSize, getType, getType2, parseAC, parseEntries, parseLairAction, getAlignment, getMod, capitalizeFirstLetter, getCR, replaceDndTags};