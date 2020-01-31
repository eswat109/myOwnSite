$('#formBtn').click(() => {
    //console.log('sas');
    /*
    $('#myForm').find ('input').each(function() {
        $data[this.name] = $(this).val();
    });

     */
    var data  = $('#orderForm').serialize();
    /*
    $.each(data,function(){
        console.log(this.name+'='+this.value);
    });

     */
    $.ajax({
        type: 'post',
        url: '/order',
        data: data,
        success: function(data){
            //$('.results').html(data);
            $('#form').hide();
            //var footer = $("");
            $('body').append(data);
        }
    })
    //console.log(data);
});

