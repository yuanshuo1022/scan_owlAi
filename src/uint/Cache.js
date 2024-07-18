export default new class {
	Local = new class {
		get Length(){
			return App.Length(window.localStorage);
		}
		Has(Original){
			let Boolean = false;
			App.Each.Loop(0 , this.Length).Add(Index => {
				if(!Boolean && App.Verify.Confirm(window.localStorage.key(Index) , Original)) Boolean = true;
				return (Boolean ? false : true);
			});
			return Boolean;
		}
		Get(Original , Default , Cypher){
			if(!this.Has(Original)) return App.Check(Default , 'String' , '');
			const Data = App.String.Json(window.localStorage.getItem(Original));
			if(App.Verify.Gt(Data.Expire , 0) && App.Verify.Gt(App.Date.Time() , Data.Expire)) return App.Check(Default , 'String' , '');
			if(!App.Check(Cypher , 'Boolean' , false)) return Data.Value;
			return App.Cypher.Des.Decode(Data.Value , Original).then(Value => {
				try{
					return App.String.Json(Value);
				}catch{
					return Value;
				}
			});
		}
		Set(Original , Value , Expire , Cypher){
			Expire = App.Check(Expire , 'PositiveInteger' , 0);
			const String = App.Object.Json({
				Value : Value ,
				Expire : (App.Verify.Eq(Expire , 0) ? 0 : App.Calculate.Add(App.Date.Time() , Expire)) ,
			});
			if(!App.Check(Cypher , 'Boolean' , false)) return window.localStorage.setItem(Original , String);
			return App.Cypher.Des.Encode(String , Original).then(Data => {
				return window.localStorage.setItem(Original , Data);
			});
		}
		Delete(Original){
			return window.localStorage.removeItem(Original);
		}
	}
	Session = new class {
		get Length(){
			return App.Length(window.sessionStorage);
		}
		Has(Original){
			let Boolean = false;
			App.Each.Loop(0 , this.Length).Add(Index => {
				if(!Boolean && App.Verify.Confirm(window.sessionStorage.key(Index) , Original)) Boolean = true;
				return (Boolean ? false : true);
			});
			return Boolean;
		}
		Get(Original , Default , Cypher){
			if(!this.Has(Original)) return App.Check(Default , 'String' , '');
			const Data = App.String.Json(window.sessionStorage.getItem(Original));
			if(App.Verify.Gt(Data.Expire , 0) && App.Verify.Gt(App.Date.Time() , Data.Expire)) return App.Check(Default , 'String' , '');
			if(!App.Check(Cypher , 'Boolean' , false)) return Data.Value;
			return App.Cypher.Des.Decode(Data.Value , Original).then(Value => {
				try{
					return App.String.Json(Value);
				}catch{
					return Value;
				}
			});
		}
		Set(Original , Value , Expire , Cypher){
			Expire = App.Check(Expire , 'PositiveInteger' , 0);
			const String = App.Object.Json({
				Value : Value ,
				Expire : (App.Verify.Eq(Expire , 0) ? 0 : App.Calculate.Add(App.Date.Time() , Expire)) ,
			});
			if(!App.Check(Cypher , 'Boolean' , false)) return window.sessionStorage.setItem(Original , String);
			return App.Cypher.Des.Encode(String , Original).then(Data => {
				return window.sessionStorage.setItem(Original , Data);
			});
		}
		Delete(Original){
			return window.sessionStorage.removeItem(Original);
		}
	}
	Cookie = new class {
		get Length(){
			return App.Length(App.String.Split(document.cookie , ';'));
		}
		Has(Original){
			let Boolean = false;
			App.Each.Of(App.String.Split(document.cookie , ';') , Item => {
				if(!Boolean && App.Verify.Eq(App.String.Find.Start(App.String.Trim.Start(Item) , App.String.Concat(Original , '=')) , 0))  Boolean = true;
				return (Boolean ? false : true);
			});
			return Boolean;
		}
		Get(Original , Default , Cypher){
			if(!this.Has(Original)) return App.Check(Default , 'String' , '');
			let String = '';
			App.Each.Of(App.String.Split(document.cookie , ';') , Item => {
				if(!App.Verify.Eq(App.String.Find.Start(App.String.Trim.Start(Item) , App.String.Concat(Original , '=')) , 0)) return true;
				String = App.String.Replace(App.String.Trim.Both(Item) , App.String.Concat(Original , '=') , '');
				return false;
			});
			if(App.Check(Cypher , 'Boolean' , false)) return String;
			return App.Cypher.Des.Decode(String , Original);
		}
		Set(Original , Value , Expire , Cypher){
			Expire = App.Check(Expire , 'PositiveInteger' , App.Calculate.Mul(3600 , 24 , 30 , 12));
			if(App.Check(Cypher , 'Boolean' , false)){
				document.cookie = App.String.Concat(Original , '=' , Value , ';expires=' , App.Date.Get(App.Calculate.Add(App.Date.Time() , Expire)).toGMTString());
				return true;
			}
			return App.Cypher.Des.Encode(Value , Original).then(Data => {
				document.cookie = App.String.Concat(Original , '=' , Data , ';expires=' , App.Date.Get(App.Calculate.Add(App.Date.Time() , Expire)).toGMTString());
				return true;
			});
		}
		Delete(Original){
			return this.Set(Original , '' , 0);
		}
	}
}