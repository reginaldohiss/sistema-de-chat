function addGroupModal() {
	var html = '<h1>Criar Nova Sala</h1>';

	html += '<input type="text" id="newGroupName" placeholder="Digite o nome da nova sala" />';
	html += '<br/><button id="newGroupButton">Cadastrar</button>';

	html += '<hr/>';
	html += '<button onclick="fecharModal()">Fechar Janela</button>';

	$('.modal_area').html(html);
	$('.modal_bg').show();

	$('#newGroupButton').on('click', function(){
		var newGroupName = $('#newGroupName').val();

		if(newGroupName != '') {
			chat.addNewGroup(newGroupName, function(json){
				if(json.error == '0') {
					$('.add_tab').click();
				} else {
					alert(json.errorMsg);
				}
			});
		}
	});
}
function fecharModal() {
	$('.modal_bg').hide();
}

$(function(){

	if(group_list.length > 0) {
		for(var i in group_list) {
			chat.setGroup(group_list[i].id, group_list[i].name);
		}
	}

	chat.chatActivity();
	chat.userListActivity();

	$('.add_tab').on('click', function(){

		var html = '<h1>Escolha uma sala de Bate Papo</h1>';
		html += '<div id="groupList">Carregando...</div>';
		html += '<hr/>';
		html += '<button onclick="addGroupModal()">Criar Nova Sala</button>';
		html += '<button onclick="fecharModal()">Fechar Janela</button>';

		$('.modal_area').html(html);
		$('.modal_bg').show();

		chat.loadGroupList(function(json){
			var html = '';
			for(var i in json.list) {
				html += '<button data-id="'+json.list[i].id+'">'+json.list[i].name+'</button>';
			}
			$('#groupList').html(html);

			$('#groupList').find('button').on('click', function(){
				var cid = $(this).attr('data-id');
				var cnm = $(this).text();

				chat.setGroup(cid, cnm);
				$('.modal_bg').hide();
			});


		});
	});

	$('nav ul').on('click', 'li .group_name', function(){
		var id = $(this).parent().attr('data-id');
		chat.setActiveGroup(id);
	});

	$('nav ul').on('click', 'li .group_close', function(){
		var id = $(this).parent().attr('data-id');
		chat.removeGroup(id);
	});

	$('#sender_input').on('keyup', function(e){
		if(e.keyCode == 13) {
			var msg = $(this).val();
			$(this).val('');

			chat.sendMessage(msg);
		}
	});

	$('.imgUploadBtn').on('click', function(){
		$('#sender_input_img').trigger('click');
	});

	$('#sender_input_img').on('change', function(e){
		chat.sendPhoto( e.target.files[0] );
	});

});











