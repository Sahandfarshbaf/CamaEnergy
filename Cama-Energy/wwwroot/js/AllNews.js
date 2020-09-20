
let searchtxt = '';
let type = 0;


function GetAllNewsBlog() {


    let Html = ``;


    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetAllNewsBlog?type="+type+"&searchtxt=" + searchtxt,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {
                
                let desc = '';
                if (item.description.length > 300) {

                    for (var j = 300; j < item.description.length; j++) {

                        if (item.description.charAt(j) === " ") {
                            desc = item.description.substr(0, j) + " ...";
                            j = item.description.length;
                        }
                    }
                } else {
                    desc = item.description;
                }


                Html += ` <article class="entry wow fadeInDown"  data-wow-duration="1000ms" data-wow-delay="300ms">
								<div id="post-thumb" class="post-thumb">`;
                jQuery.each(item.newsImage, function (j, itemm) {

                    Html += `<div class="item text-center">
								<img src="${itemm.fileImage}" alt="Flying bicycle" class="img-responsive" style="margin:2px;display:unset !important">
							</div>`;
                });


                Html += `</div>
                                <div class="post-excerpt">
									<h3><a href="single-post.html">${item.title}</a></h3>
                                    <p>${desc}</p>
                                    <a class="btn btn-transparent" href="../../home/SingleNews/${item.id}">ادامه مطلب</a>
                                </div>								
                                <div class="post-meta">
                                    <span class="post-date">
                                        <i class="fa fa-calendar"></i>${item.newsDateTime}
                                    </span>
                                    
                                    <span class="author">
                                        <i class="fa fa-user"></i><a href="#">${item.author}</a>
                                    </span>
                                    
                                </div>
                            </article>`;
            });



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

    type =parseInt(window.location.pathname.replace('/Home/AllNews/', ''));
    if (type == 1) {

        $('#pageTitle').text('اخبار روز');
    }
    else {
        $('#pageTitle').text('اخبار شرکت');
    }
    GetAllNewsBlog();

    $(document.body).on('click', '#search-submit', () => {

        searchtxt = $('#txtsearch').val().trim();
        GetAllNewsBlog();
    });
});