	//init
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/php");
	editor.getSession().setUseSoftTabs(false);
	editor.setValue("<"+"?php\n\n\n\n\n\n\n"); 
	//pure text out put: Header("Content-type: text/plain");
	editor.gotoLine(2);
	editor.focus();
	
	//bind event
	editor.commands.addCommand({
		name: 'submitCode',
		bindKey: {win: 'Ctrl-S',  mac: 'Ctrl-S'},
		exec: function(editor) {
			submitCode();
		},
		readOnly: true // false if this command should not apply in readOnly mode
	});
	
	$('#btnSubmit').on('click', function(){
		submitCode();
	});
	
	$('#readLastCode').on('click', function(){
		readLastCode();
	});
	
	$('.button').on('click', function(){
		$(this).addClass('selected');
	});
	
	$('.switch').on('click',function(e){
		$(this).toggleClass('selected');
	});

	$('.smallIcon').on('mousedown',function(e){
		$(this).addClass('mouseDown');
	})
	
	$('.smallIcon').on('mouseup mouseleave',function(e){
		$(this).removeClass('mouseDown');
	})

	
	//function
	var showMsg = function(msg){
		alert(msg);
	}
	
	var dataUrl = function(str){
		var arr = str.split('/');
		return 'data.php?C=' + arr[0] + '&A=' + arr[1] ;
	}
	
	var submitCode = function(){
		$('#codeInput').val(editor.getValue());
		$('#postForm').submit();
	}
	
	var readLastCode = function(){
		$.ajax({
			url: dataUrl('Code/readLastCode'),
			success: function(result){
				if(result.code == 0){
					editor.setValue(result.data);
				}else{
					showMsg(result.message);
				}
			},
			error: function(){
				showMsg('error!');
			},
			dataType: 'json'
		});
	}

	
	var menuData = [
		{
			text: 'PHP', 
			title: 'Select mode', 
			handler: null,
			menu:[
				{
					text: 'JS', 
					title: '',
					handler: function(el){alert('js')},
					menu: []
				},{
					text: 'JS3', 
					title: '',
					handler: function(el){alert('js3')},
					menu: []
				}
			]
		},{
			text: 'PHP2', 
			title: 'Select mode2', 
			handler: null,
			menu: [
				{
					text: 'JS2', 
					title: '',
					handler: function(el){alert('js2')},
					menu: []
				}
			]		
		}
	];
	/*
		<div class="button">PHP</div>
		<ul class="menu hide">
			<li title="title">test12311111111223123</li>
	*/
	var initMenu = function(){
		var menuBox = $('#btnBoxCommon');
		menuBox.html(buildMenu(menuData, 0));
		
	}
	
	var buildMenu = function(data, level){
		var html = '';
		var len = data ? data.length : 0;
		if(!len){
			return '';
		}
		var btnClass = '';
		if(level === 0){
			btnClass = ' class="button"';
		}else{
			html += '<ul class="menu">'
		}
		var i,titleAttr,title;
		for(i = 0; i < len; i++){
			title = data[i].title;
			titleAttr = '';
			if(typeof(title) !== "undefined" && title.length){
				titleAttr = ' title="' + title + '"';
			}
			html += '<li' + btnClass + titleAttr + '>' + data[i].text + '</li>';
			html += buildMenu(data[i].menu, level + 1);
		}
		if(level !== 0){
			html += '</ul>';
		}
		return html;
	}
