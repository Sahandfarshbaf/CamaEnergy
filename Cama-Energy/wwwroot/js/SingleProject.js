
let pid = 0;

function GetProjectById() {


    let Html = ``;
    let Html1= ``;



    jQuery.ajax({
        type: "Get",
        url: `/api/Home/GetProjectById?Id=${pid}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.projectsImage.length > 0) {
                
                $('.MainImage').attr('src', response.projectsImage[0].fileImage);
                $('.ImageList').show();
            }
            else {
                $('.ImageList').hide();
            }
            jQuery.each(response.projectsImage, function (i, item) {


                Html1 += `<img src="${item.fileImage}"  class="img-thumbnail Sahandthumb mx-auto">`;
            });


            Html += `<article class="entry wow text-right fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms"><div id="post-thumb" class="post-thumb">`;
           
            Html += `</div>
                            <div class="post-excerpt" >
                                <h3><a href="single-post.html">${response.title}</a></h3>
                                    <p>${response.description}</p>  
                            </div>
                            <div style="padding:10px;">
                            <span class="ph1">:امکانات</span>
                            <ul >`;

            let emkamat = response.emkanat.split('**');

            for (var i = 0; i < emkamat.length; i++) {
                
                Html += `<li>${emkamat[i]}&nbsp;<i class="fa fa-check">&nbsp;</i></li>`;
            }

            Html += ` </ul>
<span class="ph1">:برند</span>
<p>${response.brand}</p>
<span class="ph1">:کارفرما</span>
<p>${response.karfarma}</p>
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


$(document).ready(() => {

    pid = getUrlParameter('id');

    GetProjectById();


    $(document.body).on('click', '.Sahandthumb', function () {

        $('.MainImage').attr('src', $(this).attr('src'));
        $('#imgTitle').text($(this).attr('alt'));
        $('#RemoveImage').attr('ImageId', $(this).attr('ImageId'));

    });
});