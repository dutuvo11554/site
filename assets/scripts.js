$( document ).ready(function() {
    console.log( "ready!" );

		var gameName = getCookie('gameName');
		console.log(gameName)
		var time = getCookie('nextPlay');
		var appId = getCookie('appid');

    if(getCookie('nextPlay')) {
        $('#timerday').css('background-color', '#daa122');
        nextDay();
        $('.buttonblock').hide();
        $('.winContainer .left').show();
        $('.winContainer .right').show();
        $('#gamename').html(gameName);
        $('.winContainer .image img').attr('src','https://steamcommunity-a.akamaihd.net/economy/image/'+ appId +'/image.png');
        
        if((new Date().getTime() - getCookie('nextPlay')) > 1800000) {
            console.log('Удалить куки');
            deleteCookie('gameName');
            deleteCookie('appid');
            deleteCookie('nextPlay');
            $('.buttonblock').show();
            $('.winContainer .left').hide();
            $('.winContainer .right').hide();
            $('#timerday').html('Available');
            $('#timerday').css('background-color', '#83b34f');
        } else {
            console.log('Еще ждем');
        }
    
    }


});

var wingames = [
    {name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4/"},
    {name: "M4A1-S | Hot Rod", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f"},
    {name: "AWP | Electric Hive", appid: "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5Yeg3UBJ9TWfEz4QWiUXJl6cY2UNLl9e4HcVm-tobFOuIvMNBPF8TRDv6DZ1v84ks91aJae4vJ_n0-dvDrog/260fx194f"},
    {name: "AWP | Asiimov", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G9SupUijOjAotyg3w2x_0ZkZ2rzd4OXdgRoYQuE8gDtyL_mg5K4tJ7XiSw0WqKv8kM"},
    {name: "AK-47 | Hydroponic", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh3szKcDBA49OJnpWFkPvxDLfYkWNFppwpie2Rp9_w0VDm-UNrMj30IoPHdAY-M1rY-1K7w7291pO8vJTJzHN9-n51xLwwH8g/140fx105f"},
    {name: "AK-47 | Fire Serpent (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oThxg3n8kM5ZD-nJI-UJ1c2MFjU-VXolezugZXpvMyan3I3v3Qjty2OlhKpwUYbndZ_4hw"},
    {name: "Desert Eagle | Mecha Industries", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PTbTjlH7du6kb-GkvT8MoTdn2xZ_It02rHCpIrx0APk8hVqMWr1LI-QdFU6YAvW8gO_xr3ugMDqup7Mz3FmpGB8st6VkheS/140fx105f"},
]

var players = [
    {name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4/"},
{name: "M4A1-S | Hot Rod", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f"},
{name: "USP-S | Serum", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzfeTRW6dOjgL-DkvbiKvWElTII6ZIhj--Sp433jgXj-UduMGr2JIbBJ1dsaQ6DrwC8xL_n0Jbuot2XnjwhZrR8/260fx194f"},
{name: "CZ75-Auto | Yellow Jacket", appid: "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhkZzvBG_cLXco5_An_HS4o7dVcWdKy_q4LZw69vdTBYLAkZopJHJSDCPGGZw2puxk9ifIJLJbfpSO61Hm_PTtfChb1ujVTRKDBiB4/260fx194f/140fx105f"},
{name: "R8 Revolver | Llama Cannon", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3di59_oSJmIyKmvb3MrXfmWVu5Mx2gv2P9Imhi1Hs_0RqZzv3LI-XIwRrMFqE-Qe3l-6-08W5u53LyiRk6HRx7WGdwUJ7o0v99A/260fx194f"},
{name: "AUG | Bengal Tiger", appid: "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKOC5YZg3FBLJhUfA-_R3hR3JisMMwVoXvpeNWKl-6tYvAYOQoMNwdSZbYDvCEb1-pu0850qVcep2X4HS4l-v7zTM/260fx194f"},
{name: "AK-47 | Wild Lotus (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWZU7Mxkh9bN9J7yjRri-xJlMGHwcIWTJ1A_Z12C_gO7lO65hJXvvcmcy3U2uylx4inezRK1n1gSOchgY33-/260fx194f"},
{name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4/"},
{name: "Tec-9 | Fuel Injector", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzbcDNG09C_k4if2fSjZLmGwDkBsZZz3r6Zo4mliwTj-0BtZDz1dYSUcAdtYw3XqFXtyejxxcjrr8fSJ40/140fx105f"},
{name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4/"},
{name: "Souvenir M4A1-S | Knight (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-GkuP1P6jummJW4NFOhujT8om72VGy-kJpZjr0JYSWdg9sYwmBrwS2wOnt1JXo7Zqfm3M2vCJ35HzbnQv330-9f4-Ixw/"},
{name: "CZ75-Auto | Yellow Jacket", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzfeTRW6dOjgL-DkvbiKvWElTII6ZIhj--Sp433jgXj-UduMGr2JIbBJ1dsaQ6DrwC8xL_n0Jbuot2XnjwhZrR8/260fx194f"},
{name: "AUG | Wings", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzbcDNG09C_k4if2fSjZLmGwDkBsZZz3r6Zo4mliwTj-0BtZDz1dYSUcAdtYw3XqFXtyejxxcjrr8fSJ40/140fx105f"},
{name: "AK-47 | Wild Lotus (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWZU7Mxkh9bN9J7yjRri-xJlMGHwcIWTJ1A_Z12C_gO7lO65hJXvvcmcy3U2uylx4inezRK1n1gSOchgY33-/260fx194f"},
{name: "AWP | Containment Breach", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJU5c6jh7-HnvD8J_WBxjgBv8Mp27HFod6gjA3gqBFkNm2mcdLEc1M8Zl7Z8we5wO2515K5ot2XnsjoWXP9"},
{name: "AWP | Asiimov", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G9SupUijOjAotyg3w2x_0ZkZ2rzd4OXdgRoYQuE8gDtyL_mg5K4tJ7XiSw0WqKv8kM"},
{name: "AWP | Dragon Lore (Battle-Scarred)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu4MBwnPD--Y3nj1H68hE-NW_2JNPAdVNtYV_Q_wO6le7u1pS-7pWfzCFnvCEq7SyOnBzi0wYMMLK7E03aCQ"},
{name: "AK-47 | Hydroponic", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh3szKcDBA49OJnpWFkPvxDLfYkWNFppwpie2Rp9_w0VDm-UNrMj30IoPHdAY-M1rY-1K7w7291pO8vJTJzHN9-n51xLwwH8g/140fx105f"},
{name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4/"},
{name: "AK-47 | Wild Lotus (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWZU7Mxkh9bN9J7yjRri-xJlMGHwcIWTJ1A_Z12C_gO7lO65hJXvvcmcy3U2uylx4inezRK1n1gSOchgY33-/260fx194f"},
{name: "AK-47 | Point Disarray", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLPbTYhFRc7cF4n-SP9o2mjA3hqBJlZGGmdYCRegY-ZwmFrFC5xufuhpK5vcuayXYxsyVz4GGdwUJGz70rjQ/140fx105f"},
{name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4/"},
{name: "Desert Eagle | Mecha Industries", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PTbTjlH7du6kb-GkvT8MoTdn2xZ_It02rHCpIrx0APk8hVqMWr1LI-QdFU6YAvW8gO_xr3ugMDqup7Mz3FmpGB8st6VkheS/140fx105f"},
{name: "M4A1-S | Hot Rod", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f"},
{name: "StatTrak™ M4A4 | Howl (Well-Worn)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLP7LWnn9u5MRjjeyP9tqhiQ2yqEo6Mmn3doPBcwZqZQrRr1O-we_sgMO5tZ_BzCFr6ycltmGdwULa1vGJFg/"},
{name: "M4A1-S | Hot Rod", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f"},
{name: "AK-47 | Fire Serpent (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oThxg3n8kM5ZD-nJI-UJ1c2MFjU-VXolezugZXpvMyan3I3v3Qjty2OlhKpwUYbndZ_4hw"},
{name: "AK-47 | Fire Serpent (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oThxg3n8kM5ZD-nJI-UJ1c2MFjU-VXolezugZXpvMyan3I3v3Qjty2OlhKpwUYbndZ_4hw"},
{name: "AWP | Dragon Lore (Battle-Scarred)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu4MBwnPD--Y3nj1H68hE-NW_2JNPAdVNtYV_Q_wO6le7u1pS-7pWfzCFnvCEq7SyOnBzi0wYMMLK7E03aCQ"},    
{name: "AK-47 | Cartel", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP4jVC9vh5yYGr7IoWVdABrYQ3Y-1m8xezp0ZTtvpjNmHpguCAhtnndzRW10x9KOvsv26KUE4Zjjg/260fx194f"},
{name: "AWP | Electric Hive", appid: "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5Yeg3UBJ9TWfEz4QWiUXJl6cY2UNLl9e4HcVm-tobFOuIvMNBPF8TRDv6DZ1v84ks91aJae4vJ_n0-dvDrog/260fx194f"},
{name: "Sticker | Titan | Katowice 2015", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYorOxKglf3_LadjgM6d_jktjcxaKlZLiGwTwHusYm3u-Qodqk0ALjqERqNWDxLdKVIwA8YUaQpAavfp4mGQ/90fx90f"},
{name: "AK-47 | Fire Serpent (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oThxg3n8kM5ZD-nJI-UJ1c2MFjU-VXolezugZXpvMyan3I3v3Qjty2OlhKpwUYbndZ_4hw"},
{name: "AK-47 | Fire Serpent (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oThxg3n8kM5ZD-nJI-UJ1c2MFjU-VXolezugZXpvMyan3I3v3Qjty2OlhKpwUYbndZ_4hw"},
{name: "M4A1-S | Hot Rod", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f"},
{name: "M4A1-S | Decimator", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alDL_UlWJc6dF-mNbM8Ij8nVn6rhFtYmyiJ4SWJAc4NQvS8ge9xb3v1J65usmbnCY17CMr5CvYmkG1hgYMMLJencFQUA/260fx194f"},
{name: "Souvenir M4A1-S | Knight (Minimal Wear)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-GkuP1P6jummJW4NFOhujT8om72VGy-kJpZjr0JYSWdg9sYwmBrwS2wOnt1JXo7Zqfm3M2vCJ35HzbnQv330-9f4-Ixw/"},
{name: "M4A1-S | Hot Rod", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f"},
{name: "StatTrak™ M4A4 | Howl (Well-Worn)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLP7LWnn9u5MRjjeyP9tqhiQ2yqEo6Mmn3doPBcwZqZQrRr1O-we_sgMO5tZ_BzCFr6ycltmGdwULa1vGJFg/"},    
{name: "Butterfly Knife | Doppler (Factory new)", appid: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UM-YDz2I4OScwJsZl7Vr1O9x-u9g8K6uJnOzHM16ScktnmJmR23hhhSLrs4sbhU0c4"}
];
var caseScrollAudio = new Audio();
caseScrollAudio.src = "./click.mp3";
caseScrollAudio.volume = 0.3;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// scroll
var x, xVel, prevTime, kVar;
var xAcc = 0.46;

// scroll
function scroll() {
    var curSec = (new Date).getSeconds();
    var curTime = (new Date).getTime();
    var timeDiff = (curTime - prevTime) / 60;
    var xPrev = x;
    x -= xVel * timeDiff;
    xVel -= xAcc * timeDiff;
    if (Math.abs(x) % 103 < Math.abs(xPrev) % 103) {
        caseScrollAudio.pause();
        caseScrollAudio.currentTime = 0;
        caseScrollAudio.play();
    }
    if (xVel < 0) {
        xVel = 0;
    }
    prevTime = curTime;
}

function setupCookies(gameName, appId) {
    setCookie('nextPlay', new Date().getTime());
    setCookie('gameName', gameName);
    setCookie('appid', appId);
}

function nextDay() {
    $('#timerday').countdown(+(getCookie('nextPlay')) + 86400000, function (event) {
         $(this).html(event.strftime('Left %H:%M:%S'));
        seconds = +(event.strftime('%M') * 60) + +event.strftime('%S');
    });

    $('#timer').countdown(+(getCookie('nextPlay')) + 1800000, function (event) {
        $(this).html(event.strftime('%H:%M:%S'));
    });
}

function startTimer(countdown) {
    $('#timer').countdown(+(new Date) + countdown, function (event) {
        $(this).html(event.strftime('%H:%M:%S'));
    });
}

var online = setInterval(function(){
    $('#onlineCount').html(getRandomInt(210,220));
},6000);

function addWinner(data) {
	$('.buttonblock button').attr('disabled', 'disabled');
    //players.push({uname: 'rakal na pnevme', avatar: 'http://cdn.edgecast.steamstatic.com/steam/apps/-fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhkZzvBG_cLXco5_An_HS4o7dVcWdKy_q4LZw69vdTBYLAkZopJHJSDCPGGZw2puxk9ifIJLJbfpSO61Hm_PTtfChb1ujVTRKDBiB4/260fx194f/140fx105f/header.jpg?t=1518656270'});
    //players.push({uname: 'rakal na stoke', avatar: 'http://cdn.edgecast.steamstatic.com/steam/apps/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ/140fx105f/header.jpg?t=1518656270'});

    players_count = players.length;
    if (players_count < 100) {
        for (i = players_count; i <= 100; i++) {
            players.push(players[getRandomInt(0, players_count - 1)]);
        }
    }

    var el = '';
    players[73] = data;
    players.forEach(function (item, index) {
        el += '<div class="item">' +
                '<img src="https://steamcommunity-a.akamaihd.net/economy/image/'+ item.appid +'/image.png" alt="">' +
            '</div>';
    });
    $('.carusel').css("margin-left", "0px");
    $('.carusel').html(el);
    //console.log(data);
    //$("#scrollerContainer").fadeIn(1200);
    b = $('.carusel .item').outerWidth(true);
    //alert(b);
    c = $('#aCanvas').width() / 2;
    a = (b * 73) - c + getRandomInt(0, b);
    //startTimer(14 * 1000);

    $('.carusel').animate({marginLeft: -1 * a}, {

        duration: 10000,
        easing: 'easeOutQuint',
        start: function () {
            kVar = Math.floor(Math.random() * 20) + 10;
            kVar += Math.random() * 0.75 + 0.0675;
            x = 372 / 2; //x = 0;
            xVel = Math.sqrt((kVar * 124.5 + (372 / 2)) * xAcc * 2);
            prevTime = (new Date).getTime();
            handle = setInterval(scroll, 1);
            console.log(handle);
        },
        complete: function () {
            clearInterval(handle);
            setupCookies(data.name,data.appid);
            $('.buttonblock').fadeOut(1000);
            $('#gamename').html(data.name);
            nextDay();
            $('.winContainer .image img').attr('src','https://steamcommunity-a.akamaihd.net/economy/image/'+ data.appid +'/image.png');

            $('.winContainer .left').fadeIn(1200);
            $('.winContainer .right').fadeIn(1200);


        }
    });

}


