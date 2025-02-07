import { Get } from "./Network";

const SearchApi = (value, cb) => {
    Get("https://api.open5e.com/v1/search/?limit=250&text=" + encodeURIComponent(value), (res) => {
        res.results.sort((a, b) => a.name > b.name ? 1 : -1);
        cb(res.results);
    });
};
const SearchRoute = (route, value, cb) => {
    Get("https://api.open5e.com/v1/" + route + "/?limit=250&search=" + encodeURIComponent(value), (res) => {
        for(let i = 0; i < res.results.length; i++) {
            res.results[i].route = route + "/";
        }
        res.results.sort((a, b) => a.name > b.name ? 1 : -1);
        cb(res.results);
    });
};
const SearchRouteAndField = (route, field, value, cb) => {
    Get("https://api.open5e.com/v1/" + route + "/?limit=250&" + field + "=" + encodeURIComponent(value), (res) => {
        for(let i = 0; i < res.results.length; i++) {
            res.results[i].route = route + "/";
        }
        res.results.sort((a, b) => a.name > b.name ? 1 : -1);
        cb(res.results);
    });
};

export {SearchApi, SearchRoute, SearchRouteAndField};