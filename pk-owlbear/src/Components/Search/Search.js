import './Search.css';
import {useEffect, useState} from 'react';
import { PullItems, PullMonsters, PullSpells, SearchApi } from '../../Logic/ApiController';
import { SearchResult } from './SearchResult';
import OBR from "@owlbear-rodeo/sdk";
import { Detail } from './Detail';
import { StatBlock } from './StatBlock';

export const Search = () => {
    const [searchVal, setSearchVal] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        PullSpells();
        PullItems();
        PullMonsters();
    }, []);

    const onInputKeyUp = (e) => {
        if(e.key === 'Enter') {
            setSearchResults(SearchApi(searchVal));
        }
    };
    
    const doSearch = () => {
        setSearchResults(SearchApi(searchVal));
    };

    const onResultClick = (result) => {
        setSelectedResult(result);
    };

    return (
        <div className='search overflow-hidden'>
            <div className='search-box'>
                <input type='text' placeholder='Search' value={searchVal} onChange={(e) => setSearchVal(e.target.value)} onKeyUp={onInputKeyUp} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={doSearch}>
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </div>
            <div className='search-results overflow-y-auto'>
                {searchResults.map((item, index) => {
                    return <SearchResult key={index} result={item} onClick={onResultClick} />
                })}
            </div>  
            <Detail result={selectedResult} onHide={() => setSelectedResult(null)} />
        </div>
    )
};