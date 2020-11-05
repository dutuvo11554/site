BANNED_DOMAINS = '(csgofast|drop777|shurzgbets|TRIDEXSKINBETS|CSGOSELECTOR|skinionaire|FASTSPOTS|csgomassive|csgoup|csgo2x|skinwin|CSGOW|csgohap|kickback|csgofade|csgolucky|csgocasino|game-raffle|ezskinz|CSGOhot|CSGOSTART|csgonice|csgo|game-luck|g2a|csgostar|hellstore|cs-drop|csgo|csgoshuffle|csgotop|csbets|csgobest|csgolike|fast-jackpot|skins-up|csgobank|hardluck-shop|CSGOLucky|cs-drop|csgogamble)\.(ru|club|com|net|gl|one|in)';

function replaceLogin(login) {
    var reg = new RegExp(BANNED_DOMAINS, 'i');
    return login.replace(reg, "");
}

function setCookie(name, value, expires, path, domain, secure) {
    expires instanceof Date ? expires = expires.toGMTString() : typeof (expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
    var r = [name + "=" + escape(value)],
            s, i;
    for (i in s = {
        expires: expires,
        path: path,
        domain: domain
    }) {
        s[i] && r.push(i + "=" + s[i]);
    }
    return secure && r.push("secure"), document.cookie = r.join(";"), true;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//склонение окончаний
function declension(num, expressions) {
    var result;
    count = num % 100;
    if (count >= 5 && count <= 20) {
        result = expressions['2'];
    } else {
        count = count % 10;
        if (count == 1) {
            result = expressions['0'];
        } else if (count >= 2 && count <= 4) {
            result = expressions['1'];
        } else {
            result = expressions['2'];
        }
    }
    return result;
}

$(document).ready(function () {
    $('#saveTradeLink').on('click', function () {
        saveTradeLink();
    });
});
