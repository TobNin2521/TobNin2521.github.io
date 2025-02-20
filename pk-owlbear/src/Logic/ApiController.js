import { Get } from "./Network";

let spells = [];
let monsters = [];
let items = [];

const PullMonsters = () => {
    monsters = [];
    const sources = require("../Data/Monsters/index.json");
    let mDict = {};
    for(let source in sources){
        let m = require("../Data/Monsters/" + sources[source]);
        for(let i = 0; i < m.monster.length; i++) {
            if(mDict[m.monster[i].name] === undefined) {
                m.monster[i].T = "m";
                monsters.push(m.monster[i]);
                mDict[m.monster[i].name] = m.monster[i];
            }
        }
    }
    monsters.sort((a, b) => a.name > b.name ? 1 : -1);
    for(let i = 0; i < monsters.length; i++) {
        if(monsters[i]._copy !== undefined) {
            let fromM = mDict[monsters[i]._copy.name];
            for(let key in fromM) {
                if(monsters[i][key] === undefined) monsters[i][key] = fromM[key];
            }
        }
    }
    const group = require("../Data/Monsters/legendarygroups.json").legendaryGroup;    
    let gDict = {};    
    for(let i = 0; i < group.length; i++){
        if (gDict[group[i].name] === undefined) gDict[group[i].name] = group[i];
    }
    for(let i = 0; i < monsters.length; i++) {
        if(gDict[monsters[i].name] !== undefined) {
            let fromM = gDict[monsters[i].name];
            for(let key in fromM) {
                if(monsters[i][key] === undefined) monsters[i][key] = fromM[key];
            }
        }
        if (monsters[i].legendaryGroup !== undefined) {
            if(gDict[monsters[i].legendaryGroup.name] !== undefined) {
                let fromM = gDict[monsters[i].legendaryGroup.name];
                for (let key in fromM) {
                    if (monsters[i][key] === undefined) monsters[i][key] = fromM[key];
                }
            }
        }
    }
    return monsters;
};
const PullItems = () => {
    items = [];
    const temp = require("../Data/Items/items.json");
    items = temp.item;
    for(let i = 0; i < items.length; i++) {
        items[i].T = "i";
    }
    console.log(items);
    return items;
};
const PullSpells = () => {
    spells = [];
    const sources = require("../Data/Spells/index.json");
    let sDict = {};
    for(let source in sources){
        let m = require("../Data/Spells/" + sources[source]);
        for(let i = 0; i < m.spell.length; i++) {
            if(sDict[m.spell[i].name] === undefined) {
                m.spell[i].T = "s";
                spells.push(m.spell[i]);
                sDict[m.spell[i].name] = m.spell[i];
            }
        }
    }
    spells.sort((a, b) => a.name > b.name ? 1 : -1);
    for(let i = 0; i < spells.length; i++) {
        if(spells[i]._copy !== undefined) {
            let fromS = sDict[spells[i]._copy.name];
            for(let key in fromS) {
                if(spells[i][key] === undefined) spells[i][key] = fromS[key];
            }
        }
    }
    return spells;
};

const SearchApi = (val) => {
    let tempRes = [];
    tempRes = [...tempRes, ...monsters.filter(f => f.name.indexOf(val) >= 0)];
    tempRes = [...tempRes, ...spells.filter(f => f.name.indexOf(val) >= 0)];
    tempRes = [...tempRes, ...items.filter(f => f.name.indexOf(val) >= 0)];
    tempRes.sort((a, b) => a.name > b.name ? 1 : -1);
    return tempRes;
};


export {PullItems, PullSpells, PullMonsters, SearchApi};