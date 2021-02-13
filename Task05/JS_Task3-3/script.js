'use strict';

$(document).ready(() => {
  $('#zipSearch').on('click', () => {
    var zipCode = $('#zipCode').val();

    var apiKey = 'dj00aiZpPWdaS0pYYTdaZUlOZSZzPWNvbnN1bWVyc2VjcmV0Jng9NTQ-'

  $.ajax({
    type: 'GET',
    url: 'https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=' + zipCode + '&appid=' + apiKey + '&output=json',
    dataType: 'jsonp'
  }).done(function(response) {
    // console.log(response);
    var stations = [];
    for (var i =0; i < Object.keys(response.Feature[0].Property.Station).length; i++) {
    stations.push(response.Feature[0].Property.Station[i].Name);
    }
  var geometry = response.Feature[0].Geometry.Coordinates.split(',');
  $('.addressTable td').eq(0).text(response.Feature[0].Property.Address);
  $('.addressTable td').eq(1).text(geometry[0]);
  $('.addressTable td').eq(2).text(geometry[1]);
  $('.addressTable td').eq(3).text(stations);
  }).fail(function() {
    console.log(error);
    event.error = '住所の検索に失敗しました';
  });window.alert('住所の検索に失敗しました');
  });

  if (!zipCode.match(/^\d{3}-?\d{4}$/)) {
    if ($('.errMsg')[0]) {
      $('.errMsg').remove();
    }
    $('.searchField').append('<p class="errMsg" style="color:#ff0000; background-color:#ffcccc; width:50%; margin:0 auto">入力欄には7桁の半角数字を入力してください。<br>（ハイフンの有無は動作に影響しません）</p>');
    return false;
  }
});