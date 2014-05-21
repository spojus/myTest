	//define
	var editor = ace.edit("editor");
	var Mt = {
		//Element id for myTest
		id : 1000,
		//Generate unique ID for element
		genId : function(){
			Mt.id ++;
			return 'Mt-'+Mt.id;
		},
		//Store to here waitting for elements create finished. {id:handler}
		bindList : {},
		processBindList : function(){
			for(var x in Mt.bindList){
				if(Mt.bindList.hasOwnProperty(x)){
					Mt.bind('#'+x, Mt.bindList[x]);
				}
			}
			//Empty bindList
			Mt.bindList = {};
		},
		//Bind for each item
		bind : function(selector, handler){
			var ev, x;
			if(typeof(handler) !== "object"){
				return false;
			}
			for(x in handler){
				if(handler.hasOwnProperty(x) && $.isFunction(handler[x])) {
					$(selector).on(x, handler[x]);
				}
			}
		}
	};
		
	
	//data
	var menuData = [
		{
			text: 'File',
			//title: 'show title',
			handler: {'click':function(el){console.log('1');}},
			menu:[
				{
					text: 'JS1111111',
					title: '',
					handler: {
						'click':function(el){console.log('js')},
						'mouseover':function(el){console.log('mojs111')}
					},
					menu: [
					{
						text: 'JS33',
						title: '',
						handler: {
							'click':function(el){console.log('js3')},
							'mouseover':function(el){console.log('mojs3333')}
						},
						menu: []
					},{
						text: 'JS44',
						title: '',
						handler: {'click':function(el){console.log('js3')}},
						menu: []
					}
					]
				},{
					text: 'JS3',
					title: '',
					handler: {'click':function(el){console.log('js3')}},
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
					handler: {'click':function(el){console.log('js24')}},
					menu: []
				},{
					text: 'JS2333',
					title: '',
					handler: {'click':function(el){console.log('js25')}},
					menu: []
				},{
					text: 'JS24544',
					title: '',
					handler: {'click':function(el){console.log('js26')}},
					menu: []
				}
			]
		}
	];

	//function for common
	function strRepeat(str, num){
		if(!isDefined(num)) {
			return str;
		}
		var ret = '';
		for(var i=num; i--;){
			ret += str;
		}
		return ret;
	}
	
	function isDefined(value){return typeof value !== 'undefined';}
	function intval(str) {return parseInt(str, 10);}
	
	//function for editor
	var showMsg = function(msg){
		alert(msg);
	}

	var dataUrl = function(str){
		var arr = str.split('/');
		return 'data.php?C=' + arr[0] + '&A=' + arr[1] ;
	}

	var initMenu = function(){
		var menuBox = $('#btnBoxCommon');
		menuBox.html(buildMenu(menuData, 0));
		Mt.processBindList();
	}

	var bindMenuId = function(handler){
		var id = Mt.genId();
		if(isDefined(handler)){
			Mt.bindList[id] = handler;
		}
		return ' id="' + id + '"';
	}
	
	var buildMenu = function(data, level){
		var len = data ? data.length : 0;
		if(!len){
			return '';
		}
		var idData = '',
		html = '',
		btnClass = '';
		
		if(level === 0){
			btnClass = ' class="button"';
		}else{
			idData = bindMenuId(data.handler);
			html += '<ul' + idData + '" class="menu hide">';
		}
		var i, titleAttr, title;
		for(i = 0; i < len; i++){
			title = data[i].title;
			titleAttr = '';
			if(isDefined(title) && title.length){
				titleAttr = ' title="' + title + '"';
			}
			idData = bindMenuId(data[i].handler);
			html += '<li' + idData + btnClass + titleAttr + '>' + data[i].text + '</li>';
			html += buildMenu(data[i].menu, level + 1);
		}
		if(level !== 0){
			html += '</ul>';
		}
		return html;
	}
	
	//function for use
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
	
	
	//init
	initMenu();
	
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/php");
	editor.getSession().setUseSoftTabs(false);
	editor.setValue("<"+"?php\n\n\n\n\n\n\n"); 
	//pure text out put: Header("Content-type: text/plain");
	editor.gotoLine(2);
	editor.focus();
	
	
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

	
