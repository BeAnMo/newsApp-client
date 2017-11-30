export default function Observable(){
	return {
		observers: [],
	
		subscribe(subscriber){
			return this.observers.push(subscriber);
		},
		
		unsubscribe(subscriber){
			return this.observers.filter(sub => sub !== subscriber);
		},
		
		notify(data){
			return this.observers.forEach(sub => sub(data));
		}
	}
}


