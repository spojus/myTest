	//define
	var editor = ace.edit("editor");

	//data
	var menuData = [
		{
			text: 'File',
			//title: 'show title',
			//handler: null,
			menu:[
				{
					text: 'JS1111111',
					title: '',
					handler: function(el){alert('js')},
					menu: [
					{
						text: 'JS33',
						title: '',
						handler: function(el){alert('js3')},
						menu: []
					},{
						text: 'JS44',
						title: '',
						handler: function(el){alert('js3')},
						menu: []
					}
					]
				},{
					text: 'JS3',
					title: '',
					handler: function(el){alert('js3')},
					menu: []
				}
			]
		},{
			text: 'Language',
			title: 'Select language',
			menu: [
				{
					text: 'PHP',
					title: '',
					handler: function(el){alert('js2')},
					menu: []
				},{
					text: 'JS2333',
					title: '',
					handler: function(el){alert('js2')},
					menu: []
				},{
					text: 'JS24544',
					title: '',
					handler: function(el){alert('js2')},
					menu: []
				}
			]
		}
	];

	
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
	
	
	//init
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/php");
	editor.getSession().setUseSoftTabs(false);
	editor.setValue("<"+"?php\n\n\n\n\n\n\n"); 
	//pure text out put: Header("Content-type: text/plain");
	editor.gotoLine(2);
	editor.focus();
	
	initMenu();
	
	
	//bind
	editor.commands.addCommand({
		name: 'submitCode',
		bindKey: {win: 'Ctrl-S',  mac: 'Ctrl-S'},
		exec: function(editor) {
			submitCode();
		},
		readOnly: true
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
	});
	
	$('.smallIcon').on('mouseup mouseleave',function(e){
		$(this).removeClass('mouseDown');
	});

	
