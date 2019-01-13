
export const chinaRailway='/chinaRailway';
export function fetchData(url,params){
    return fetch(chinaRailway+url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params||{})
    }).then((response)=>{
        return response.json()
    }).catch(e=>{
        console.log(e);
    })
}