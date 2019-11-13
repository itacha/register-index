//登录弹出框
$(document).ready(function() {
    $(".login-btn").click(function() {
        // alert("hello");  
        $(".tan-background").fadeIn(100);
        $(".tan-foreground").slideDown(200);
    });
    $(".close-btn").click(function() {
        $(".tan-foreground").fadeOut(100);
        $(".tan-background").hide(100);
    })
});
//提示信息隐藏
$(function() {
    $(".pass_username").focus(function() {
            $(".pass_username").next(".hidden_username").css({
                visibility: 'visible'
            });
            $(".pass-error-user").hide()
        })
        // $(".pass_username").blur(function() {
        //     $(".pass_username").next(".hidden_username").css({
        //         visibility: 'hidden'
        //     });
        // });

    $(".pass_phone").focus(function() {
        $(".pass_phone").next(".hidden_phone").css({
            visibility: 'visible'
        });
        $(".pass-error-phone").hide()
    })
    $(".pass_phone").blur(function() {
        $(".pass_phone").next(".hidden_phone").css({
            visibility: 'hidden'
        });
    });

    $(".pass_password").focus(function() {
            $(".msg_pwd").css({
                visibility: 'visible'
            });
            $(".pass-error-pwd").hide()
        })
        // $(".pass_password").blur(function() {
        //     $(".msg_pwd").css({
        //         visibility: 'hidden'
        //     });
        // });
})

// 验证表单
// 验证用户名
$(function() {
        var regusername = /^[a-zA-Z\u4e00-\u9fa5]{1,14}$/;
        var regtel = /^1[3|4|5|7|8]\d{9}$/;
        var regpwd = /^[a-zA-Z0-9_-]{8,14}$/;
        var regyzm = /^\d{6}$/;
        $(".regsiter").click(function(evt) {
            if (!regusername.test($("#jd_username").val())) {
                $(".pass-error-user").text("用户名仅支持中英文、数字和下划线,且不能为纯数字");
                $(".pass-error-user").show();
                evt.preventDefault();
            };
            if ($("#jd_username").val() === '') {
                $(".pass-error-user").text("请输入用户名");
                $(".pass-item-error").show();
                evt.preventDefault();
            };
            if (!regtel.test($("#jd_phone").val())) {
                $(".pass-error-phone").text("手机号码格式不正确");
                $(".pass-error-phone").show();
                evt.preventDefault();
            };
            if ($("#jd_phone").val() === '') {
                $(".pass-error-phone").text("请输入手机号");
                $(".pass-error-phone").show();
                evt.preventDefault();
            };
            if ($("#demo_input").val() === '') {
                $(".pass-error-pwd").text("请输入密码");
                $(".pass-error-pwd").show();
                evt.preventDefault();
            };
            // 验证第二次密码
            if ($("#jd_repwd").val() === '') {
                $(".pass-error-repwd").text("请输入密码");
                $(".pass-error-repwd").show();
                evt.preventDefault();
            };
            if ($("#jd_repwd").val() !== $("#demo_input").val()) {
                $(".pass-error-repwd").text("两次输入密码不一致");
                $(".pass-error-repwd").show();
                evt.preventDefault();
            };
            // 验证验证码
            if ($("#jd_yzm").val() === '') {
                $(".pass-error-yzm").show();
                $(".img_yzm").hide();
                evt.preventDefault();
            };
            //验证协议
            if ($("#agree").prop("checked") == false) {
                $(".pass-xy").show();
                evt.preventDefault();
            };
            test();
        });
        $("#jd_repwd").focus(function() {
            $(".pass-error-repwd").hide();
        });
        $("#jd_yzm").focus(function() {
            $(".pass-error-yzm").hide();
        });
        $("#demo_input").on("input propertychange", function() {
            $(".hidden_password").show();
            test();
        });
        $("#demo_input").blur(function() {
            $(".hidden_password").show();
            test();
        });
        //验证用户名是否重复
        $("#jd_username").on("blur", function() {
            var name = $this.val();
            $.ajax({
                type: "get",
                url: "../server/validateUsername.php",
                data: { "username": name },
                success: function(response) {
                    console.log(response);
                    console.log(123);
                }
            });
        });
        // 获取短信验证码
        $(".pass-btn-verifyCodeSend").on("click", function() {
                let flag = true;
                if ($("#jd_phone").val() === '') {
                    $(".pass-error-phone").text("请输入手机号");
                    $(".pass-error-phone").show();
                    flag = false;
                    return;
                };
                if (!regtel.test($("#jd_phone").val())) {
                    $(".pass-error-phone").text("手机号码格式不正确");
                    $(".pass-error-phone").show();
                    flag = false;
                    return;
                };
                if (flag) {
                    $(this).attr("disabled", true);
                    var time = 60;
                    var timer = setInterval(() => {
                        if (time === 0) {
                            clearInterval(timer);
                            $(this).attr("disabled", false);
                            $(this).removeClass("pass-btn-verifyCodeSend-disabled");
                            $(this).val("获取短信验证码");
                        } else {
                            $(this).addClass("pass-btn-verifyCodeSend-disabled");
                            $(this).val(time + "秒后重新获取激活码");
                            time--;
                        }
                    }, 1000)
                }
            })
            //检测密码条件
        function test() {
            if ($("#demo_input").val().length < 8 || $("#demo_input").val().length > 14) {
                $(".pwd-checklist-len").addClass("pwd-checklist-item-error");
            } else {
                $(".pwd-checklist-len").removeClass("pwd-checklist-item-error");
            }
            if (/[\s]/.test($("#demo_input").val())) {
                $(".pwd-checklist-spa").addClass("pwd-checklist-item-error");
            } else {
                $(".pwd-checklist-spa").removeClass("pwd-checklist-item-error");
            }
        };
        // 清空输入框数据
        $(".pass-input-text").on("input propertychange", function() {
            if ($(this).val() !== '') {
                $(this).siblings("span").show();
            } else {
                $(this).siblings("span").hide();
            }
        });
        $(".bdys").on("input propertychange", function() {
            if ($(this).val() !== '') {
                $(this).siblings(".pass-clearbtn").show();
            } else {
                $(this).siblings(".pass-clearbtn").hide();
            }
        });
        $(".pass-clearbtn").on("click", function() {
            $(this).siblings("input").val("");
        })


    })
    //弹出框随鼠标移动
jQuery(document).ready(function() {
    var self = $('#moveid');
    var flag = true;
    self.mousedown(function(e) {
        flag = true;
        var x1 = self.offset();
        var offsetLeft = x1.left;
        var offsetTop = x1.top;
        var x = e.pageX - offsetLeft;
        var y = e.pageY - offsetTop;

        self.mousemove(function move(e) {
            if (flag) {
                var x2 = e.pageX - x;
                var maxX = document.body.clientWidth - self.outerWidth();
                x2 = (x2 < 0 ? 0 : x2) > maxX ? maxX : (x2 < 0 ? 0 : x2);
                var nowLeft = x2 + 'px';
                var y2 = e.pageY - y;
                var maxY = document.body.clientHeight - offsetTop;
                y2 = (y2 < 0 ? 0 : y2) > maxY ? maxY : (y2 < 0 ? 0 : y2);
                var nowTop = y2 + 'px';
                self.css({ left: nowLeft, top: nowTop });
            }
        })
        self.mouseup(function() {
            flag = false;
        })
    })
})