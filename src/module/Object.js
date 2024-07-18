export default new class {
	Key(Original){
		return Object.keys(Original);
	}
	Value(Original){
		return Object.values(Original);
	}
	Assign(...Additional){
		return Object.assign({} , ...Additional);
	}
	Json(Original){
		return JSON.stringify(Original);
	}
	Url(Original , Cypher){
		Option = {};
		Option.Cypher = App.Check(Cypher , 'Boolean' , false);
		Option.Finally = [];
		App.Each.In(Original , (Item , Index) => {
			if(!App.Verify.String(Item)) Item = this.Json(Item);
			if(Option.Cypher) Item = encodeURIComponent(Item);
			App.Array.Push(Option.Finally , App.String.Concat(Index , '=' , Item));
			return true;
		});
		return App.Array.Join(Option.Finally , '&');
	}
}