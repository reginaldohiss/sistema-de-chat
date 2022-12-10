var chat = {

	groups:[],
	activeGroup:0,
	lastTime:'',
	msgRequest:null,
	userRequest:null,

	setGroup:function(id, name) {
		var found = false;

		for(var i in this.groups) {
			if(this.groups[i].id == id) {
				found = true;
			}
		}

		if(found == false) {
			this.groups.push({
				id:id,
				name:name,
				messages:[],
				users:[]
			});
		}

		if(this.groups.length == 1) {
			this.setActiveGroup(id);
		}

		this.updateGroupView();

		if(this.msgRequest != null) {
			this.msgRequest.abort();
		}
	},

	removeGroup:function(id) {
		for(var i in this.groups) {
			if(this.groups[i].id == id) {
				this.groups.splice(i, 1);
			}
		}

		if(this.activeGroup == id) {
			if(this.groups.length > 0) {
				this.setActiveGroup( this.groups[0].id );
			} else {
				this.activeGroup = 0;
			}
		}

		this.updateGroupView();

		if(this.msgRequest != null) {
			this.msgRequest.abort();
		}
	},

	getGroups:function() {
		return this.groups;
	},

	loadGroupList:function(ajaxCallback){

		$.ajax({
			url:BASE_URL+'ajax/get_groups',
			type:'GET',
			dataType:'json',
			success:function(json) {
				if(json.status == '1') {
					ajaxCallback(json);
				} else {
					window.location.href = BASE_URL+'login';
				}
			}
		});

	},

	addNewGroup:function(groupName, ajaxCallback){
		$.ajax({
			url:BASE_URL+'ajax/add_group',
			type:'POST',
			data:{name:groupName},
			dataType:'json',
			success:function(json) {
				if(json.status == '1') {
					ajaxCallback(json);
				} else {
					window.location.href = BASE_URL+'login';
				}
			}
		});
	},

	updateGroupView:function(){
		var html = '';

		for(var i in this.groups) {
			html += '<li data-id="'+this.groups[i].id+'">';
			html += '<div class="group_close">X</div>';
			html += '<div class="group_name">'+this.groups[i].name+'</div>';
			html += '</li>';
		}

		$('nav ul').html(html);

		this.loadConversation();
	},

	setActiveGroup:function(id){
		this.activeGroup = id;
		this.loadConversation();
	},

	getActiveGroup:function(){
		return this.activeGroup;
	},

	loadConversation:function(){
		if(this.activeGroup != 0) {
			$('nav ul').find('.active_group').removeClass('active_group');
			$('nav ul').find('li[data-id='+this.activeGroup+']').addClass('active_group');
		}

		this.showMessages();
		this.showUserList();
	},

	showUserList:function(){
		if(this.activeGroup != 0) {
			var users = [];

			for(var i in this.groups) {
				if(this.groups[i].id == this.activeGroup) {
					users = this.groups[i].users;
				}
			}

			var html = '';
			for(var i in users) {
				html += '<li>'+users[i]+'</li>';
			}

			$('.user_list ul').html(html);
		} else {
			$('.user_list ul').html('');
		}
	},

	showMessages:function() {
		$('.messages').html('');

		if(this.activeGroup != 0) {

			var msgs = [];

			for(var i in this.groups) {
				if(this.groups[i].id == this.activeGroup) {
					msgs = this.groups[i].messages;
				}
			}

			for(var i in msgs) {

				var html = '<div class="message">';
				html += '<div class="m_info">';
				html += '<span class="m_sender">'+msgs[i].sender_name+'</span>';
				html += '<span class="m_date">'+msgs[i].sender_date+'</span>';
				html += '</div>';
				html += '<div class="m_body">';

				if(msgs[i].msg_type == 'text') {
					html += msgs[i].msg;
				} else if(msgs[i].msg_type == 'img') {
					html += '<img src="'+BASE_URL+'media/images/'+msgs[i].msg+'" />';
				}

				html += '</div>';
				html += '</div>';

				$('.messages').append(html);

			}

		}

	},

	sendMessage:function(msg){
		if(msg.length > 0 && this.activeGroup != 0) {

			$.ajax({
				url:BASE_URL+'ajax/add_message',
				type:'POST',
				data:{id_group:this.activeGroup, msg:msg},
				dataType:'json',
				success:function(json) {
					if(json.status == '1') {
						if(json.error == '1') {
							alert(json.errorMsg);
						}
					} else {
						window.location.href = BASE_URL+'login';
					}
				}
			});

		}
	},

	sendPhoto:function(img) {
		if(this.activeGroup != 0) {
			var formData = new FormData();
			formData.append('img', img);
			formData.append('id_group', this.activeGroup);

			$.ajax({
				url:BASE_URL+'ajax/add_photo',
				type:'POST',
				dataType:'json',
				data:formData,
				contentType:false,
				processData:false,
				success:function(json) {
					if(json.status == '1') {
						if(json.error == '1') {
							alert(json.errorMsg);
						}
					} else {
						window.location.href = BASE_URL+'login';
					}
				},
				xhr:function() {
					var xhrPadrao = $.ajaxSettings.xhr();

					if(xhrPadrao.upload) {
						xhrPadrao.upload.addEventListener('progress', function(p) {
							var total = p.total;
							var loaded = p.loaded;
							var pct = (total/loaded) * 100;

							if(pct > 0) {
								$('.progressbar').css('width', pct+'%');
								$('.progress').show();
							}

							if(pct >= 100) {
								$('.progressbar').css('width', '0%');
								$('.progress').hide();
							}

						}, false);
					}

					return xhrPadrao;
				}
			});


		}
	},

	updateLastTime:function(last_time) {
		this.lastTime = last_time;
	},

	updateUserList:function(list, id_group){
		for(var i in this.groups) {
			if(this.groups[i].id == id_group) {
				this.groups[i].users = list;
			}
		}
	},

	insertMessage:function(item) {

		for(var i in this.groups) {
			if(this.groups[i].id == item.id_group) {

				var date_msg = item.date_msg.split(' ');
				date_msg = date_msg[1];

				this.groups[i].messages.push({
					id:item.id,
					sender_id:item.id_user,
					sender_name:item.username,
					sender_date:date_msg,
					msg:item.msg,
					msg_type:item.msg_type
				});

			}
		}

	},

	chatActivity:function() {

		var gs = this.getGroups();
		var groups = [];

		for(var i in gs) {
			groups.push( gs[i].id );
		}

		if(groups.length > 0) {
			this.msgRequest = $.ajax({
				url:BASE_URL+'ajax/get_messages',
				type:'GET',
				data:{last_time:this.lastTime, groups:groups},
				dataType:'json',
				success:function(json) {
					if(json.status == '1') {
						chat.updateLastTime( json.last_time );

						for(var i in json.msgs) {
							chat.insertMessage(json.msgs[i]);
						}

						chat.showMessages();
					} else {
						window.location.href = BASE_URL+'login';
					}
				},
				complete:function(){
					chat.chatActivity();
				}
			});
		} else {
			setTimeout(function(){
				chat.chatActivity();
			}, 1000);
		}

	},

	userListActivity:function(){

		var gs = this.getGroups();
		var groups = [];

		for(var i in gs) {
			groups.push( gs[i].id );
		}

		if(groups.length > 0) {
			this.userRequest = $.ajax({
				url:BASE_URL+'ajax/get_userlist',
				type:'GET',
				data:{groups:groups},
				dataType:'json',
				success:function(json) {
					if(json.status == '1') {

						for(var i in json.users) {
							chat.updateUserList(json.users[i], i);
						}

						chat.showUserList();
					} else {
						window.location.href = BASE_URL+'login';
					}
				},
				complete:function(){
					setTimeout(function(){
						chat.userListActivity();
					}, 5000);
				}
			});
		} else {
			setTimeout(function(){
				chat.userListActivity();
			}, 1000);	
		}
	}

};







