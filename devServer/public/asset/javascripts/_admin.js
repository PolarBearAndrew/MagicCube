$(document).ready( function(){

  $('html, body').on('click', '#build', function(){

    var $animate = $('#loader');
    var $result = $('#result');

    $animate.removeClass('hide');
    $result.html('');

    $.ajax({
      url: 'http://localhost:8080/build',
      type: 'POST',

      success: function( result ){

        console.log('result', result)
        // $('#result').html( '建立頁面：' + JSON.stringify(result) );

        var list = result.list;
        var output = '<br/><div class="ui inverted segment list-wrapper"> <div class="ui list inverted divided">  ';
        var item = '<div class="item"><i class="html5 icon ui orange"></i> <div class="content"><a href="@url" target="_blank" class="header">@title</a> <div class="description">Build Success</div> </div> </div>';

        for( var i = 0; i < list.length; i++ ){

          if( i % 8 === 0 && i !== 0 ){ output += '</div></div> <div class="ui inverted segment list-wrapper"> <div class="ui list inverted divided">'; }

          output += item.replace(/@url/, list[i].page + '.html' )
                        .replace(/@title/, list[i].page);

        }

        $result.html( output + '</div></div>' ); // show all

        $animate.addClass('hide');
      },

      fail: function( err ){
        $('#result').html( err );
      }

    }); // ajax end

    return false;

  }); // #build click end

}); // doc ready end