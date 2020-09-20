
let NewsId = 0;

function GetNewsById() {


    let Html = ``;


    jQuery.ajax({
        type: "Get",
        url: `/api/Home/GetNewsById?NewsId=${NewsId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            Html += `<article class="entry wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms"><div id="post-thumb" class="post-thumb">`;
                    jQuery.each(response.newsImage, function (j, itemm) {

                        Html += `<div class="item" style="margin:auto;width:fit-content;" >
                                <img src="${itemm.fileImage}" alt="Flying bicycle" class="img-responsive">
                             </div>`;
                });

                Html += `</div>
                            <div class="post-excerpt" >
                                <h3><a href="">${response.title}</a></h3>
                                    <p>${response.description}</p>  
                            </div>
                            <div class="post-meta">
                                <span class="post-date">
                                    <i class="fa fa-calendar"></i>${response.newsDateTime}
                                </span>
                                <span class="author">
                                    <i class="fa fa-user"></i><a href="#">${response.author}</a>
                                </span> 
                            </div>
                         </article > `;



            $('.post-item').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}




$(document).ready(() => {

    NewsId = parseInt(window.location.pathname.replace('/home/SingleNews/', ''));
    GetNewsById();



    $(document.body).on('click', '#btnJadid', () => {


    });
});