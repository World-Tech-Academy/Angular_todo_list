(function(){
	angular.module('ToDo')
	.controller('ToDo', toDoCtrl);

	function toDoCtrl(Item){
		var self = this;

		// bound functions
		self.addItem = addItem;
		self.remove = remove;
		self.update = update;
		self.startEdit = startEdit;

		// bound variables
		self.loading = false;
		self.items = [];
		Item.list().then(function(response){
			self.items = response.data;
		});
		self.editMode = '';
		self.newItem = {
			title : '',
			description : ''
		};

		// bound function implementations
		function addItem(){
			if(self.newItem.title == null || self.newItem.description == null){
				return;
			}
			Item.add({
				title: self.newItem.title,
				description: self.newItem.description
			}).then(function(response){
				self.newItem.id = response.data;
				self.items.push(self.newItem);
				self.newItem = {
					title : '',
					description : ''
				};
			});
		}

		function remove(id){
			Item.remove(id).then(function(response){
				for(var i = 0; i < self.items.length; i++){
					if(self.items[i].id === id){
						self.items.splice(i,1);
						break;
					}
				}
			});
		}

		function update(item){
			item.title = self.currentItem.title;
			item.description = self.currentItem.description;
			Item.update(item).then(function(response){
				for(var i = 0; i < self.items.length; i++){
					if(self.items[i].id === response.data){
						self.items[i] = response.data;
						break;
					}
				}
				self.editMode = '';
			});
		}

		function startEdit(item){
			self.currentItem = item;
			self.editMode = item.id;
		}
	}
})();
