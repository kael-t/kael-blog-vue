export default {
    // 传入键值保存cookie
    setCookie: function (key, value) {
        document.cookie = key + "=" + encodeURI(value);
    },
    // 传入key返回value
    getCookie: function (key) {
        if (document.cookie.length > 0){ //先查询cookie是否为空，为空就return ""
            let start = document.cookie.indexOf(key + "="); //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
            if (start !== -1){
                start = start + key.length + 1; //最后这个+1其实就是表示"="号啦，这样就获取到了cookie的value值的开始位置
                let end = document.cookie.indexOf(";",start);　//其实我刚看见indexOf()第二个参数表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
                if (end === -1)
                    end = document.cookie.length;
                return decodeURI(document.cookie.substring(start, end)); //通过substring()得到了值。
            }
        }
        return "";
    }
};