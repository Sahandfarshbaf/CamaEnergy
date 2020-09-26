
let cid = 0;

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



function GetAllProducts() {

    let Html = "";

    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetAllProductsByCid?cid="+cid,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

       
            jQuery.each(response, function (i, item) {

                let desc = '';
                if (item.description.length > 200) {

                    for (var j = 200; j < item.description.length; j++) {

                        if (item.description.charAt(j) === " ") {
                            desc = item.description.substr(0, j) + " ...";
                            j = item.description.length;
                        }
                    }
                } else {
                    desc = item.description;
                }


                var cat = "";
                switch (item.productCategoryId) {
                    case 1:
                        cat = "سیستم هوشمند ساختمان";
                        break;
                    case 2:
                        cat = "مدیریت انرژی ساختمان";
                        break;
                    case 3:
                        cat = "فناوری اطلاعات و شبکه";
                        break;
                    case 4:
                        cat = "سیستم صوتی و تصویری";
                        break;

                }

                Html += `<div class="col-sm-6 col-md-4">
                            <div class="thumbnail">
                                <img src="${item.productsImage[0].fileImage}" alt="...">
                                <div class="caption">
                                    <span class="ph1">${item.name}</span>
                                    <p>${desc}</p>
                                    <p><a href="../home/SingleProduct?id=${item.id}" class="btn btn-danger" onclick="../home/SingleProduct?id=${item.id}" role="button">مشاهده جزئیات</a>
                                </div>
                            </div>
                        </div>`;
            });

            Html += `</tbody></table>`;

            $('#ProductList').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

           
        }
    });
}






$(document).ready(() => {

    cid= getUrlParameter('cid');
    GetAllProducts();
});