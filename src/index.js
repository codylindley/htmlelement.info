(function(win){

	//fill... for old ES3
	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	var global = win;
	var doc = global.document;

	//setup scrollUp
	$.scrollUp();

	//code from pure.io template, non-jquery

    var layout   = doc.getElementById('layout'),
        menu     = doc.getElementById('menu'),
        menuLink = doc.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';
        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

    //setup scroll spy and animated scroll when clicking on menu item
    var $menu = $('.pure-menu a');

    $('#elementsGrid,#categoriesGrid,#attributesGrid,#eventsGrid,#byVersionGrid').on('scrollSpy:enter', function() {
	    $('#menu').find('a[href="#'+$(this).prev('h2').attr('id')+'"]').closest('li').addClass('pure-menu-selected');
	});

	$('#elementsGrid,#categoriesGrid,#attributesGrid,#eventsGrid,#byVersionGrid').on('scrollSpy:exit', function() {
	    $('#menu').find('a[href="#'+$(this).prev('h2').attr('id')+'"]').closest('li').removeClass('pure-menu-selected');
	});

	$('#elementsGrid,#categoriesGrid,#attributesGrid,#eventsGrid,#byVersionGrid').scrollSpy();

    $menu.on('click',function(e){
    	$('html, body').animate({
        	scrollTop: $($(e.target).attr('href')).offset().top
    	}, 2000);

    	return false;
    });

    $('#scrollUp').click(function(){
    	$menu.closest('li').removeClass('pure-menu-selected');
    });

    //correct links in whatwg tables
    $('table').bind('mousedown','a',function(e){
    	var $this = $(e.target);
    	var oldHref = $this.attr('href');
    	$this
    		.attr('href','http://www.whatwg.org/specs/web-apps/current-work/multipage/'+oldHref)
    		.attr('target', '_blank');
    	e.preventDefault();
    });

    $('table').bind('mouseup','a',function(e){
    	var $this = $(e.target).trigger('click');
    	e.preventDefault();
    });

    //create grids
    
	$('#categoriesGrid table, #attributesGrid table, #eventsGrid table, #byVersionGrid table').kendoGrid({
		 sortable: true,
         filterable: true,
         columnMenu: {
			sortable: false,
			filterable: true
		},
         resizable: true,
         reorderable: true,
         mobile: true
	});

	var compareFunc = function (field, a, b){

		var argA = a[field];
		var argB = b[field];

		argA = argA.replace(/(\r\n|\n|\r)/gm,'').replace(/<(.|\n)*?>/g,'').trim();
		argB = argB.replace(/(\r\n|\n|\r)/gm,'').replace(/<(.|\n)*?>/g,'').trim();

		return argA > argB ? 1 : (argA < argB ? -1 : 0);
	};

	$('#elementsGrid table').kendoGrid({
		columns:[
			{
				field:'element',
				sortable:{compare:function (a,b){return compareFunc('element',a,b);}}
			},
			{
				field:'description',
				sortable:{compare:function (a,b){return compareFunc('description',a,b);}}
			},
			{
				field:'categories',
				sortable:{compare:function (a,b){return compareFunc('categories',a,b);}}
			},
			{
				field:'parents',
				sortable:{compare:function (a,b){return compareFunc('parents',a,b);}}
			},
			{
				field:'children',
				sortable:{compare:function (a,b){return compareFunc('children',a,b);}}
			},
			{
				field:'attributes',
				sortable:{compare:function (a,b){return compareFunc('attributes',a,b);}}
			},
			{
				field:'interface',
				sortable:{compare:function (a,b){return compareFunc('interface',a,b);}}
			},
		],
		sortable:true,
		filterable: true,
		columnMenu: {
			sortable: false,
			filterable: true
		},
		resizable: true,
		reorderable: true,
		mobile: true,
		dataBound: function(e) {
			this.hideColumn(3);
			this.hideColumn(4);
		}
	});
	


})(window);