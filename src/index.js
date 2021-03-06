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

    $menu.on('click',function(e){
    	$('html, body').animate({
        	scrollTop: $($(e.target).attr('href')).offset().top
    	}, 300);

    	return false;
    });

    $('#scrollUp').click(function(){
    	$menu.closest('li').removeClass('pure-menu-selected');
    });

    //correct links in whatwg tables
    $('table.whatwg').bind('mousedown','a',function(e){

    	var $this = $(e.target);
    	var oldHref = $this.attr('href');
    	$this
    		.attr('href','http://www.whatwg.org/specs/web-apps/current-work/multipage/'+oldHref)
    		.attr('target', '_blank');
    	e.preventDefault();
    });

    $('table.whatwg').bind('mouseup','a',function(e){
    	var $this = $(e.target).trigger('click');
    	e.preventDefault();
    });

    $('table.w3c a').each(function(){
    	$(this).attr('target','_blank');
    });

    //create grids

	var compareFunc = function (field, a, b){

		var argA = a[field];
		var argB = b[field];

		argA = argA.replace(/(\r\n|\n|\r)/gm,'').replace(/<(.|\n)*?>/g,'').trim();
		argB = argB.replace(/(\r\n|\n|\r)/gm,'').replace(/<(.|\n)*?>/g,'').trim();

		return argA > argB ? 1 : (argA < argB ? -1 : 0);
	};

	$('#categoriesGrid table').kendoGrid({
		columns:[
			{
				field:'category',
				sortable:{compare:function (a,b){return compareFunc('category',a,b);}}
			},
			{
				field:'elements',
				sortable:{compare:function (a,b){return compareFunc('elements',a,b);}}
			},
			{
				field:'exceptions',
				sortable:{compare:function (a,b){return compareFunc('exceptions',a,b);}}
			}
		],
		 sortable: true,
 
         columnMenu: {
			sortable: false,
			filterable: false
		},
         resizable: true,
         reorderable: true,
         mobile: true
	});

	$('#attributesGrid table').kendoGrid({
		columns:[
			{
				field:'attribute',
				sortable:{compare:function (a,b){return compareFunc('attribute',a,b);}}
			},
			{
				field:'elements',
				sortable:{compare:function (a,b){return compareFunc('elements',a,b);}}
			},
			{
				field:'description',
				sortable:{compare:function (a,b){return compareFunc('description',a,b);}}
			},
			{
				field:'value',
				sortable:{compare:function (a,b){return compareFunc('value',a,b);}}
			}
		],
		 sortable: true,
         columnMenu: {
			sortable: false,
			filterable: false
		},
         resizable: true,
         reorderable: true,
         mobile: true
	});

	$('#eventsGrid table').kendoGrid({
		columns:[
			{
				field:'event',
				sortable:{compare:function (a,b){return compareFunc('event',a,b);}}
			},
			{
				field:'interface',
				sortable:{compare:function (a,b){return compareFunc('interface',a,b);}}
			},
			{
				field:'targets',
				sortable:{compare:function (a,b){return compareFunc('targets',a,b);}}
			},
			{
				field:'description',
				sortable:{compare:function (a,b){return compareFunc('description',a,b);}}
			}
		],
		 sortable: true,
         columnMenu: {
			sortable: false,
			filterable: false
		},
         resizable: true,
         reorderable: true,
         mobile: true
	});

	$('#byVersionGrid table').kendoGrid({
		 sortable: false,
         columnMenu: {
			sortable: false,
			filterable: false
		},
         resizable: true,
         reorderable: true,
         mobile: true,
         dataBound: function(e) {
			this.hideColumn(4);
			this.hideColumn(5);
		}
	});

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
			}
		],
		sortable:true,
		columnMenu: {
			sortable: false,
			filterable: false
		},
		resizable: true,
		reorderable: true,
		mobile: true,
		dataBound: function(e) {
			this.hideColumn(2);
			this.hideColumn(3);
			this.hideColumn(4);
			$('#elementsGrid,#categoriesGrid,#attributesGrid,#eventsGrid,#byVersionGrid').scrollSpy();
			$('.spinner').remove();
			$('.content').show();
		}
	});
	


})(window);