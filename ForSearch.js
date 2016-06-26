



document.getElementById("searchout_tuwen").style.fontFamily="Sans-serif,SimHei,Microsoft YaHei";

$("#searchout_tuwen tr:eq(0) td:eq(4)").text("简介");
$("#searchout_tuwen tr:eq(0) td:eq(0)").html('<div style="width:102px;">豆瓣</div>');
var a = $("#searchout_tuwen tr:gt(0)").each(
    function(){
    	// 寻找isbn
    	var isbnRaw = $(this).find("td:eq(4)");
        var isbn =  isbnRaw.text().replace(/-/g, '').replace('/ /g', '').substring(0,13);
        var apiUrl = "https://api.douban.com/v2/book/isbn/"+isbn+"?fields=id,url,images,rating,title,url,summary";
        isbn = Number(isbn);
        if(isbn == NaN){isbn = 9784061828629;
        	return
           }
        // console.log(isbn)
        // http://book.douban.com/isbn/9787115320896/

        // 生成 豆瓣链接 并植入
        var doubanUrl = "http://book.douban.com/isbn/"+isbn+"/";
        // isbnRaw.html("<a href='"+doubanUrl+"' target='_blank' >"+isbn+"</a>");

        // 跨域解析
        var row = $(this)
        row.find("td:eq(0)").text('豆瓣没有收录此书');
		var xhr = new XMLHttpRequest();
		xhr.open("GET", apiUrl, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4  ) {
		    
		    //{"url":"https:\/\/api.douban.com\/v2\/book\/17604305","id":"17604305","title":"塔希里亚故事集"}
		    var resp = JSON.parse(xhr.responseText);
            if (resp.code == 6000){ return; }
            if (resp.code == 1998){ 
                row.find("td:eq(0)").html('豆瓣API请求超限<br>请1小时后再使用');
                return; }
		    var imgDiv = '<div style="height:145px;width:102px;text-decoration:none;position:relative;font-family:Microsoft YaHei;">\
    <a target="_blank" href="'+doubanUrl+'" style="text-decoration:none;">\
        <div style="position:absolute;top:120px;left:70px;color:#000000;">\
            '+resp.rating.average+'\
            <span style="top:-1px;left:-1px;position:absolute; color:yellow;">\
            	'+resp.rating.average+'\
            </span>\
        </div>\
        <img style="width:102px;" src="'+resp.images.large+'">\
    </a>\
</div>\
</div>'
			row.find("td:eq(0)").html(imgDiv);
			isbnRaw.html('<a target="_blank" href="'+doubanUrl+'" style="text-decoration:none;font-family:Microsoft YaHei;"> \
				<div class="summary-div"  style="height:125px;overflow:hidden;" > '+resp.summary+'</div></a>');

		  }
		}
		xhr.send();


       })


