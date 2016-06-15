$(function() {

    //json 格式data
    var http_request = false;
    var json_doc={};

    function makeRequest(url) {
        http_request = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        http_request.onreadystatechange = alertContents;
        http_request.open('GET', url, true);
        http_request.send(null);
    }
    //接受到数据后
    function alertContents() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {

                //接受 xml 数据
                // alert(http_request.responseText);
                // var xml_doc = http_request.responseXML;
                // var root_node = xml_doc.getElementsByTagName('root').item(0);
                // console.log(root_node.firstChild.data);
                // console.log(root_node);
                // handle_xml(xml_doc);

                //接受 json 数据()
                 json_doc = JSON.parse(http_request.responseText);
                //console.log(json_doc);
                handle_json(json_doc);
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    //处理数据
    function handle_xml(xml_data) {

    }

    function handle_json(json_data) {
        for (var key in json_data) {
            //json_data.key不能正确访问，只能用json_data[key]
            $(s_s[0]).append('<li class="fake_option level_1" from="中国">' + key + '</li>');
        }
    }

    //发起数据请求
    $('#get_xml').on('click', function() {
        // body...
        makeRequest('/data/location.xml')
    });
    $('#get_json').on('click', function() {
        // body...
        makeRequest('/data/location.json')
    });

    var s_s = ["#s_level_1", "#s_level_2", "#s_level_3"];

    //模拟选框点击
    $('.fake_select').click(function() {
        var $options = $(this).next('ul');
        var $arrow = $(this).find('.fake_arrow');
        var _level = $(this).attr('level');
        //阻止选框同时展开
        var $sulings = $(this).parents('.multi_level_select_box').find('.fake_select');
        for (var i = $sulings.length - 1; i >= 0; i--) {
            if ($($sulings[i]).attr('level') !== _level && $($sulings[i]).find('.fake_arrow').hasClass('flipx')) {
                $($sulings[i]).next('ul').hide();
                $($sulings[i]).find('.fake_arrow').removeClass('flipx');
            }
        }
        /* Act on the event */
        if (!$(this).find('.fake_arrow').hasClass('flipx')) {
            $options.show();
            $arrow.addClass('flipx');
        } else {
            $options.hide();
            $arrow.removeClass('flipx');
        }
    });
    //模拟点击选中选项
    function fake_option_events(option_target) {
        /* Act on the event */
        var $options = $(option_target).parent('ul');
        var $arrow = $(option_target).parent('ul').prev('.fake_select').find('.fake_arrow');
        var _option_value = $(option_target).text();
        var $selected_value = $(option_target).parent('ul').prev('.fake_select').find('.select_text_area');
        var _index = $(option_target).parent('ul').children('li').index($(option_target)[0]);
        $options.hide();
        $arrow.removeClass('flipx');
        $selected_value.text(_option_value);
        return _index;
    }
    $(s_s[0]).on('click', 'li.level_1', function(event) {
        var that = event.target;
        var _key=$(that).text();
        var _index = fake_option_events(that);
        /* Act on the event */
        $(s_s[1]).empty();
        $(s_s[2]).empty();
        $(s_s[1]).parents('.select_wrap_box').find('.select_text_area').text('请选择');
        $(s_s[2]).parents('.select_wrap_box').find('.select_text_area').text('请选择');
        var _leve_2_content = json_doc[_key];
        for (var key in _leve_2_content) {
            $(s_s[1]).append('<li class="fake_option level_2" from=' + _key + '>' +key + '</li>');
        }
    });
    $(s_s[1]).on('click', 'li.level_2', function(event) {
        var that = event.target;
        var _key=$(that).text();
        var up_key=$(that).attr('from');
        var _index = fake_option_events(that);
        /* Act on the event */
        $(s_s[2]).empty();
        $(s_s[2]).parents('.select_wrap_box').find('.select_text_area').text('请选择');
        var _leve_3_content =json_doc[up_key][_key];
        for (i = 0; i < _leve_3_content.length; i++) {
            $(s_s[2]).append('<li class="fake_option level_3" from=' + _key + '>' + _leve_3_content[i] + '</li>');
        }
    });
    $(s_s[2]).on('click', 'li.level_3', function(event) {
        var that = event.target;
        var _index = fake_option_events(that);
    });



});
