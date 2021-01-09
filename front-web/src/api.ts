import axios from 'axios';

const localURL = "http://localhost:8080"
const mapboxToken =  process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;
export function fetchProducts(){

    return axios(`${localURL}/products`);

}


export function fetchLocalMapBox(local:String){

    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`);

}