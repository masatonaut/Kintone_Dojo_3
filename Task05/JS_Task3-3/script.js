'use strict';

$(document).ready(() => {
    $('#zipSearch').on('click', () => {
        var zipCode =$('#zipCode').val();

        var apiKey = 'dj00aiZpPWdaS0pYYTdaZUlOZSZzPWNvbnN1bWVyc2VjcmV0Jng9NTQ-'
    
    $.ajax({
        type: 'GET',
        url: 'https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=' + zipCode + '&appid=' + apiKey + '&output=json',
        dataType: 'jsonp'
    })
    .done(function(response) {
        console.log(response);
        var stations = [];
        for (var i =0; i < Object.keys(response.Feature[0].Property.Station).length; i++) {
            stations.push(response.Feature[0].Property.Station[i].Name);
    }
    var geometry = response.Feature[0].Geometry.Coordinates.split(',');
    $('.addressTable td').eq(0).text(response.Feature[0].Property.Address);
    $('.addressTable td').eq(1).text(geometry[0]);
    $('.addressTable td').eq(2).text(geometry[1]);
    $('.addressTable td').eq(3).text(stations);
    })
    .fail(function(xhr) {
        console.log(error);
        event.error = '住所の検索に失敗しました';
    })
    });
});