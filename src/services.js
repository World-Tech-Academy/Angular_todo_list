(function(){
	angular.module('ToDo')
	.factory('Item', item);

	function item($http){
		var ref = "http://secret-escarpment-99471.herokuapp.com/item";

		var service = {
			list: list,
			add: add,
			update: update,
			remove: remove
		};
		return service;

		function list(){
			return $http.get(ref).success(function(data){
				return data;
			});
		}

		function add(item){
			return $http.post(ref,item).success(function(data){
				return data;
			});
		}

		function update(item){
			return $http.put(ref + '/' + item.id, item).success(function(data){
				return data;
			});
		}

		function remove(id){
			return $http.delete(ref + '/' + id).success(function(data){
				return data;
			});
		}
	}
})();
