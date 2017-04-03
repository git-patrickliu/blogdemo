/**
 * Created by patrickliu on 17/4/3.
 */

window.addEventListener("popstate", function(e) {

    var state = e.state,
        url = state && state.url;

    if (!url) {
        return;
    }

    window.location.href = url;
});

function backURL(url) {
    if(!url) {
        return;
    }
    
    var currentUrl = window.location.href;
    
    window.history.replaceState({
        url: url
    }, '', url);
    window.history.pushState({}, '', currentUrl);
}

var queryToJson = function (url) {
        var query = url.substr(url.lastIndexOf('?') + 1),
            params = query.split('&'),
            len = params.length,
            result = {},
            i = 0,
            key, value, item, param;
        for (; i < len; i++) {
            if (!params[i]) {
                continue;
            }
            param = params[i].split('=');
            key = param[0];
            value = param[1];
            item = result[key];
            if ('undefined' == typeof item) {
                result[key] = value;
            } else {
                result[key] = [item, value];
            }
        }
        return result;
    },
    getUrlParams = function () {
        try {
            var href = window['location']['href'];
            var sParam = href.substring(href.indexOf('?')).split('#')[0];
            var params = queryToJson(sParam);

            for (var p in params) {
                try {
                    params[p] = decodeURIComponent(params[p]);
                } catch (e1) {
                }
            }
            return params;
        } catch (e) {
            return {};
        }
    };

(function() {
    var urlParams = getUrlParams();
    if(urlParams['backURL']) {
        backURL(urlParams['backURL']);
    }
})();

