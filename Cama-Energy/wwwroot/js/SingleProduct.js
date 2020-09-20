
let pid = 0;

function GetProjectById() {


    let Html = ``;
    let Html1 = ``;



    jQuery.ajax({
        type: "Get",
        url: `/api/Home/GetProductById?Id=${pid}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            console.log(response);
            if (response.productsImage.length > 0) {

                $('.MainImage').attr('src', response.productsImage[0].fileImage);
                $('.ImageList').show();
            }
            else {
                $('.ImageList').hide();
            }
            jQuery.each(response.productsImage, function (i, item) {


                Html1 += `<img src="${item.fileImage}"  class="img-thumbnail Sahandthumb mx-auto">`;
            });

            Html +='<hr>'
            Html += `<article style="border:none;" class="entry wow text-right fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms"><div id="post-thumb" class="post-thumb">`;

            Html += `</div>
                            <div class="post-excerpt" >
                                <h3><a href="single-post.html">${response.name}</a></h3>
                                    <textarea cols="50" readonly disabled class="sahandtextarea">${response.description}</textarea>  
                            </div>
                      </div>                          
                         </article > `;



            $('.post-item').html(Html);
            jQuery('.ImageContainer').html(Html1);


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function resizeIt()  {
    $(".sahandtextarea").height($("textarea")[0].scrollHeight);
};


$(document).ready(() => {

    pid = getUrlParameter('id');

    GetProjectById();
    resizeIt();

    $(document.body).on('click', '.Sahandthumb', function () {

        $('.MainImage').attr('src', $(this).attr('src'));
        $('#imgTitle').text($(this).attr('alt'));
        $('#RemoveImage').attr('ImageId', $(this).attr('ImageId'));

    });

  




});