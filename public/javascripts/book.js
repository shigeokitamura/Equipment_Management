$(document).ready(() => {
  const date = new Date();
  $('#boughtAt').val(
    date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate()
  );
});

function searchISBN() {
  console.log('ISBNを検索します．');
  const isbn = $('#isbn').val();
  if (!isbn) {
    alert('ISBNを入力して下さい．');
    return;
  } else if (!$.isNumeric(isbn)) {
    alert('数値で入力して下さい．');
    return;
  }
  const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
  $.getJSON(url, data => {
    if (data.totalItems == 0) {
      alert('書籍情報が見つかりませんでした．');
      return;
    }

    //console.log(data.items[0].volumeInfo);
    const item = data.items[0].volumeInfo;

    $('#title').val(item.title);
    $('#authors').val(item.authors);
    $('#description').val(item.description);
    $('#categories').val(item.categories);
    $('#thumbnail').val(item.imageLinks.thumbnail);
    setImage();
  });
}

function setImage() {
  const src = $('#thumbnail').val();
  $('.thumbnail').attr('src', src);
}
