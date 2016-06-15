/**
 * Created by lenovo on 2015/8/13.
 */
 //js类型的data 文件
$(function() {
    var s_s = [];
    var level_1_id = "";
    var level_2_id = "";

    //请传入s_1 这种带#号的ID；
    var init_area = function(s_1, s_2, s_3) {
        s_s = [s_1, s_2, s_3];
        var init_level_1 = dsy.Items["0"];
        for (var i = 0; i < init_level_1.length; i++) {
            var li_pro = '<li class="fake_option level_1" code="0">' + init_level_1[i] + '</li>';
            $(s_1).append(li_pro);
        }
    };
    //初始化选框
    init_area("#s_level_1", "#s_level_2", "#s_level_3");
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
        var _index = fake_option_events(that);
        /* Act on the event */
        level_1_id = '0_' + _index;
        $(s_s[1]).empty();
        $(s_s[2]).empty();
        $(s_s[1]).parents('.select_wrap_box').find('.select_text_area').text('请选择');
        $(s_s[2]).parents('.select_wrap_box').find('.select_text_area').text('请选择');
        var _leve_2_content = dsy.Items[level_1_id];
        for (i = 0; i < _leve_2_content.length; i++) {
            $(s_s[1]).append('<li class="fake_option level_2" code=' + level_1_id + '>' + _leve_2_content[i] + '</li>');
        }
    });
    $(s_s[1]).on('click', 'li.level_2', function(event) {
        var that = event.target;
        var _index = fake_option_events(that);
        /* Act on the event */
        $(s_s[2]).empty();
        $(s_s[2]).parents('.select_wrap_box').find('.select_text_area').text('请选择');
        level_1_id = $(that).attr('code');
        level_2_id = level_1_id + '_' + _index;
        var _leve_3_content = dsy.Items[level_2_id];
        for (i = 0; i < _leve_3_content.length; i++) {
            $(s_s[2]).append('<li class="fake_option level_3" code=' + level_2_id + '>' + _leve_3_content[i] + '</li>');
        }
    });
    $(s_s[2]).on('click', 'li.level_3', function(event) {
        var that = event.target;
        var _index = fake_option_events(that);
    });
});


