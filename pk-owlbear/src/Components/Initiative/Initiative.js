import { useEffect, useState } from 'react';
import './Initiative.css';
import OBR from "@owlbear-rodeo/sdk";

export const Initiative = () => {
    const [players, setPlayers] = useState([]);
    const [initiative, setInitiative] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");

    useEffect(() => {
        let p = localStorage.getItem("pk-init-players");
        if(p !== undefined && p !== null) setPlayers(JSON.parse(p));
        console.log(OBR.isAvailable);
    }, []);

    useEffect(() => {
        if(players.length !== initiative.length) {
            let init = players.map((item, index) => "");
            setInitiative(init);
        }
        localStorage.setItem("pk-init-players", JSON.stringify(players));
    }, [players]);

    const changeInit = (index, e) => {
        let init = [...initiative];
        init[index] = e.target.value;
        setInitiative(init);
    };

    const deleteInit = (index) => {
        let p = [...players];
        p.splice(index, 1);
        setPlayers(p);
    };

    const addNewPlayer = () => {
        setPlayers([...players, newPlayer]);
        setNewPlayer("");
    };

    const startCombat = () => {
        if(OBR.isAvailable === true) {

        }
    };

    return (
        <div className='initiative'>
            {players.length === initiative.length ? players.map((item, index) => {
                return (
                    <div key={index} className='initiative-row'>
                        <span>{item}</span>
                        <input value={initiative[index]} onChange={(e) => changeInit(index, e)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onChange={() => deleteInit(index)}>
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </div>
                )
            }) : null}
            <div className='add-player'>
                <input value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={addNewPlayer}>
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg>
            </div>     
            <div className='start-combat' onClick={startCombat}>
                Start
            </div>         
        </div>
    )
};