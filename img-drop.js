
// img drop zone

"use strict"

$.fn.ImgDrop = function (option) {

  let $file = $(this),
    fileId = $($file[0]).attr('id') ? $($file[0]).attr('id') : $($file[0]).attr('class'),
    labels = option;

  const labelTxt = labels ? labels.labelText ? labels.labelText : console.error('labelText must have a value...') : 'Browse file here...';
  const FileLabel = '<label class="dropzone-label" for="dropzone-' + fileId + '">' + labelTxt + '</label>';
  const FileInput = '<input multiple accept="image/*" class="dropzone_input" type="file" id="dropzone-' + fileId + '" />';
  const FileInputBox = FileLabel + FileInput;

  $file.addClass('dropzone').append('<form action="" class="dropzone_form" method="post" enctype="multipart/form-data">' + FileInputBox + '<div class="dropzone-img"></div> </form>');

  function setInputSize(fHeight = $file.outerHeight(), fWidth = $file.outerWidth()) {
    $file.find('.dropzone_input').css({
      height: fHeight,
      width: fWidth,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0
    });
  }
  setInputSize();

  // target to the change function of input

  $file.on('change', function (e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const FR = new FileReader();
      FR.onload = function (e) {
        $file.find('.dropzone-img').append('<div class="dropzone-img-completed"><img src=' + e.target.result + ' /><span class="delete-img">X</span></div>');
        SetDropSize(6);
        $file.find('.dropzone-label').addClass('dropped');
      }
      FR.readAsDataURL(e.target.files[i]);
    }
    setTimeout(function () {
      setInputSize($file.outerHeight(), $file.outerWidth());
    });
  });

  $file.on('click', '.delete-img', function () {
    $(this).closest('.dropzone-img-completed').remove();
    let droppedFile = $('.dropzone-img').find('.dropzone-img-completed').length;
    console.log(droppedFile);
    if (droppedFile <= 0) {
      $file.find('.dropzone-label').removeClass('dropped');
    }
    setTimeout(function () {
      setInputSize($file.outerHeight(), $file.outerWidth());
    });
  });

  function SetDropSize(screenSize) {
    let formWidth = $file.find('.dropzone_form').width() / screenSize;
    $file.find('.dropzone_form').find('.dropzone-img-completed').outerWidth(formWidth);
  }

  window.onresize = function () {
    setInputSize($file.outerHeight(), $file.outerWidth());
    let WSize = $(this).outerWidth();
    switch (true) {
      case WSize <= 320:
        SetDropSize(1);
        break;
      case WSize <= 400:
        SetDropSize(2);
        break;
      case WSize <= 767:
        SetDropSize(3);
        break;
      case WSize <= 991:
        SetDropSize(4);
        break;
      default:
        SetDropSize(6);
        break;
    }

  }

}
