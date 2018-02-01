var begin;
var delta = 200;
var end;
var hasTyped = false;
var originalHeight = $(window).height();
var originalWidth = $(window).width();
var acutalHeight = $(window).height();
var actualWidth = $(window).width();
var rtime;
let uuid = uuidv4()
var req = {
  url: window.location,
  id: uuid
};
var timeout = false;

$(document).ready(function() {
  console.log(uuid);
  sendData('new')
  $(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });

  $("input").on('paste', function() {
    req.eventType = "copyAndPaste"
    req.formId = this.id;
    req.pasted = true;
    sendData('copyandpaste');
  })

  $("input").on('copy', function() {
    req.eventType = "copyAndPaste";
    req.formId = this.id;
    req.pasted = false;
    sendData('copyandpaste');
  })

  typeInput();
  submitData();
})

// Set a timeout before actualizing screen size
function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta);
  } else {
    timeout = false;
    screenResolution();
  }
}

// Set values of the screen dimensions
function screenResolution() {
  req.eventType = "resize";
  actualHeight = $(window).height();
  acutalWidth = $(window).width();
  sendData('resize');
  originalHeight = $(window).height();
  oringinalWidth = $(window).width();
}

// Detect when user starts typing
function typeInput() {
  $("input").keypress(function(event) {
    if (!hasTyped) {
      hasTyped = true;
      begin = new Date();
    }
  });
}

// Detect when you submit the data
function submitData() {
  $("button").click(function(event) {
    if (hasTyped) {
      end = new Date();
      interval = (end - begin) / 1000;
      req.eventType = "timeTaken";
      req.interval = interval;
      hasTyped = false;
      sendData('submit');
    }
  });
}
submit
function sendData(route) {
  $.ajax({
    websiteURL: 'localhost:8080/' + route,
    type: 'POST',
    dataType: 'json',
    data: {
      websiteURL: req.url,
      sessionId: req.id,
      eventType: (req.eventType) ? req.eventType : null,
      paste: (req.eventType == 'copyAndPaste') ? req.pasted : null,
      formId: (req.eventType == 'copyAndPaste') ? req.formId : null,
      resizeFrom: (req.eventType == 'resize') ? {
        height: originalHeight,
        width: originalWidth
      } : null,
      resizeTo: (req.eventType == 'resize') ? {
        height: acutalHeight,
        width: actualWidth
      } : null,
      time: (req.eventType == 'timeTaken') ? req.interval : null
    }
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
