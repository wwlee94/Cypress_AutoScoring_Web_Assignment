$('.card-lecture').click(function() {
  //제목
  var title = $(this).children('.lecture-title').text()
  $('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body > .lecture-title').text(title);
  //시간
  var time = $(this).children('.lecture-time').children('span').text();
  $('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body > .lecture-info > .lecture-time > span').text(time);

  //코드
  var code = $(this).children('.list-lecture-info').children('li:nth-child(1)').text();
  $('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body > .lecture-info > :nth-child(2) > span').text(code);
  //교수
  var professor = $(this).children('.list-lecture-info').children('li:nth-child(2)').text();
  $('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body > .lecture-info > :nth-child(3) > span').text(professor);
  //강의실
  var classroom = $(this).children('.list-lecture-info').children('li:nth-child(3)').text();
  $('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body > .lecture-info > :nth-child(4) > span').text(classroom);
  $('#modal-lecture-info').modal('show');

});

$('.lecture-time > a').click(function() {

  var TL_title = $(this).children('div').children('.lecture-title').text()
  var element = $('.card-lecture > .lecture-title:contains("'+TL_title+'")').parent()

  //제목
  var title = $(element).children('.lecture-title').text()
  $('#modal-lecture-task > .modal-dialog > .modal-content > .modal-body > .lecture-title').text(title);
  //시간
  var time = $(element).children('.lecture-time').children('span').text();
  $('#modal-lecture-task > .modal-dialog > .modal-content > .modal-body > .lecture-info > .lecture-time > span').text(time);
  //코드
  var code = $(element).children('.list-lecture-info').children('li:nth-child(1)').text();
  $('#modal-lecture-task > .modal-dialog > .modal-content > .modal-body > .lecture-info > :nth-child(2) > span').text(code);
  //교수
  var professor = $(element).children('.list-lecture-info').children('li:nth-child(2)').text();
  $('#modal-lecture-task > .modal-dialog > .modal-content > .modal-body > .lecture-info > :nth-child(3) > span').text(professor);
  //강의실
  var classroom = $(element).children('.list-lecture-info').children('li:nth-child(3)').text();
  $('#modal-lecture-task > .modal-dialog > .modal-content > .modal-body > .lecture-info > :nth-child(4) > span').text(classroom);

  $('#modal-lecture-task').modal('show');

});

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

$(function() {
  $('[data-toggle="popover"]').popover({
    container: 'body',
    html: true,
    placement: 'right',
    sanitize: false,
    content: function() {
      return $("#PopoverContent").html();
    }
  });
  //메모 등록 버튼
  $(document).on("click",'.popover .btn-save', function(){
    $(this).parents(".popover").popover('hide')
  })
});

$('#search-form > .form-control').keyup(function(e){
  if(e.keyCode === 13) alert("hello")
});

$('.modal-footer > .btn-primary').click(function(){
  console.log($('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body > .lecture-title').text()+"등록!! & 등록하기 버튼 클릭! ")
  $('#modal-lecture-info').modal('hide');
});

// 삭제 버튼
$('.btn-danger').click(function(){
  $('#modal-lecture-task').modal('hide');
});
