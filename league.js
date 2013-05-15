$(function(){
    "use strict";
    function gravatar(email){
        return URI("http://www.gravatar.com/avatar/")
            .filename(CryptoJS.MD5(email).toString())
            .suffix("jpg")
            .query({
                "s": 60
            }).toString();
    }

    var template_tag = $("#league-template");
    var template = Handlebars.compile(template_tag.html());

    $.ajax("users.json", {"dataType":"json", "mimeType":"application/json"}).done(function(data){
        template_tag.replaceWith(template(
            Enumerable.From(data)
                    .Where(function(item){return item[1].hasOwnProperty("logonCount");})
                    .OrderBy(function(item){return parseInt(item[1].logonCount[0],10);})
                    .Select(function(item){
                        return {
                            "name" : item[1].gecos[0],
                            "login_count" : item[1].logonCount[0],
                            "ecsid": item[1].ecsEmail[0],
                            "avatar" : gravatar(item[1].ecsEmail[0] + "@ecs.soton.ac.uk")
                        };
                    })
                    .ToArray()
            ));
    });
});