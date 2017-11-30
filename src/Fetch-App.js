/* String, [JSON -> X], Array-of-String -> Promise 
	fetches JSON at a given URL and extracts specified data from the response */
export const FetchApp = ({ url, fn, path }) => {
	/* Object, Array-of-String -> Object */
    function recurPath(obj, arr, lastKey=''){		
		return arr.length === 0 ?
			{ [lastKey]: obj }
			:
			recurPath(obj[arr[0]], arr.slice(1), arr[0]);
    }
    
	/* JSON, [JSON -> X] -> Promise */
	function getData(json, get){
		return new Promise((success, failure) => {
			const data = path ? 
				Object.values(recurPath(json, path))[0] 
				: 
				json;
    
			return success(get(data));
		});
	}
	
	return fetch(url, { mode: 'cors' })
		.then(res => res.json())
		.then(json => getData(json, fn))
		.catch(console.log);
}