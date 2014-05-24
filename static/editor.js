	//define
	var editor = ace.edit("editor");
	var Mt = {
		//Element id for myTest
		id: 1000,
		//Generate unique ID for element
		genId: function(){
			Mt.id ++;
			return 'Mt-'+Mt.id;
		},
		//Store to here waitting for elements create finished. {id: handler}
		bindList: {},
		processBindList: function(){
			for(var x in Mt.bindList){
				if(Mt.bindList.hasOwnProperty(x)){
					Mt.bind('#'+x, Mt.bindList[x]);
				}
			}
			//Empty bindList
			Mt.bindList = {};
		},
		//Bind events for each item
		bind: function(selector, handler){
			var ev, x;
			if(typeof(handler) !== "object"){
				return false;
			}
			for(x in handler){
				if(handler.hasOwnProperty(x) && $.isFunction(handler[x])){
					$(selector).on(x, handler[x]);
				}
			}
		},
		//[{key: bindKey,func: function}]
		bindKeyList: [],
		processBindKeyList: function(){
			var length = Mt.bindKeyList.length;
			for(var i=0; i < length; i ++){
				Mt.bindKey(Mt.bindKeyList[i].key, Mt.bindKeyList[i].func);
			}
			//Empty bindKeyList
			Mt.bindKeyList = [];
		},
		bindKey: function(key, handler){
			console.log('bindKey');
			editor.commands.addCommand({
				bindKey: key,
				exec: function(el){
					console.log(el);
					handler(el);
				}
			});
		}
	};


	//data
	var menuData = [
		{
			text: 'File',
			//title: 'show title',
			handler: {'click': function(el){console.log(el);}},
			menu: [
				{
					text: 'Open file...',
					title: '',
					handler: {
						'click': function(el){console.log('open')}
					},
					menu: [
					{
						text: 'JS3344444444',
						title: '',
						handler: {
							'click': function(el){console.log(el)},
							'mouseover': function(el){console.log(el);}
						},
						menu: []
					},{
						text: 'JS44',
						title: '',
						handler: {'click': function(el){console.log('js3')}},
						menu: []
					}
					]
				},{
					text: 'JS3',
					title: '',
					handler: {'click': function(el){console.log('js3')}},
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
					handler: {'click': function(el){console.log(el)}},
					bindKey: {win:'Ctrl-Q'},
					menu: []
				},{
					text: 'Javascript',
					title: '',
					handler: {'click': function(el){console.log('javascript')}},
					menu: []
				},{
					text: 'HTML',
					title: '',
					handler: {'click': function(el){console.log('html')}},
				},{
					text: 'Python',
					title: '',
					handler: {'click': function(el){console.log('python')}},
				}
			]
		}
	];

	//function for common
	function strRepeat(str, num){
		if(!isDefined(num)){
			return str;
		}
		var ret = '';
		for(var i=num; i--;){
			ret += str;
		}
		return ret;
	}

	function isDefined(value){return typeof value !== 'undefined';}
	function intval(str){return parseInt(str, 10);}

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
		$('#mainBar').removeClass('hide');
	}

	//Process menu common events
	var commonMenuHandler = function(el){
		console.log(el);
		showChildMenu($(el.target));
	}

	var showChildMenu = function(currentEl){
		//var currentEl = $('#'+id);
		var el = currentEl.next();
		if(el.length && el[0].tagName === 'UL'){
			var width = currentEl.outerWidth();
			var leftMove = currentEl.hasClass('button') ? 0 : 3;
			var left = width - leftMove;
			el.css('left', left);
			//Hide children's children and siblings
			el.children('ul').addClass('hide');
			currentEl.siblings('ul').addClass('hide');
			//show
			el.removeClass('hide');
		}
	}

	var bindMenuId = function(data, isUl){
		var id = Mt.genId();
		var idStr = ' id="' + id + '"';
		if(isUl){
			return idStr;
		}
		var handler = data.handler;
		var eventStr = 'click mouseover';
		var eventStr2 = 'mouseover click';
		Mt.bindList[id] = {};
		if(isDefined(handler)){
			//bind shortcut key
			menuBindKey(data.bindKey, handler.click);
			//bind common func
			if(isDefined(handler[eventStr])){
				handler[eventStr2] = commonMenuHandler;
			}else{
				handler[eventStr] = commonMenuHandler;
			}
			Mt.bindList[id] = handler;
		}else{
			Mt.bindList[id][eventStr] = commonMenuHandler;
		}
		return idStr;
	}

	//add to bindKeyList
	var menuBindKey = function(bindKey, callFunc){
		if(!isDefined(bindKey) || !isDefined(callFunc)){
			return '';
		}
		var pair = {key: bindKey, func: callFunc};
		Mt.bindKeyList.push(pair);
		return bindKey;
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
			idData = bindMenuId(data, true);
			//Add <UL> before create <li> except button
			html += '<ul' + idData + '" class="menu hide">';
		}
		var i, titleAttr, title;
		for(i = 0; i < len; i++){
			title = data[i].title;
			titleAttr = '';
			if(isDefined(title) && title.length){
				titleAttr = ' title="' + title + '"';
			}
			idData = bindMenuId(data[i], false);
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
		//name: 'submitCode',
		bindKey: {win: 'Ctrl-S',  mac: 'Ctrl-S'},
		exec: function(editor) {
			submitCode();
		},
		readOnly: true
	});

	Mt.processBindKeyList();

	Mt.processBindList();

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


