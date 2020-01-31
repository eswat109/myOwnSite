/* node - v1.0.0 - 2020-02-01 */

$("#formBtn").click(function(){var r=$("#orderForm").serialize();$.ajax({type:"post",url:"/order",data:r,success:function(r){$("#form").hide(),$("body").append(r)}})});