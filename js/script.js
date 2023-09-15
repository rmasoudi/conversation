data = [];
if(localStorage.getItem("currentId")==null){
  localStorage.setItem("currentId","0");
}

$(document).ready(function () {
  fetch("./conversation.json")
  .then((res) => {
    return res.json();
  })
  .then((dt) => {
    data = dt;
    loadLessons();
  });
});

function loadLessons() {
  let container = $("#container");
  container.html("");
  for (let i = 0; i < data.length; i++) {
    let lesson = $("<div data-id=\"" + i + "\" id=\"lesson" + i
        + "\" class=\"lessonButton\">Lesson " + (i + 1) + "</div>");
    if(i<=parseInt(localStorage.getItem("currentId"))){
      lesson.addClass("doneSentence");
    }
    container.append(lesson);
  }
  $(".lessonButton").click(function () {
    let id = $(this).data().id;
    localStorage.setItem("currentId",id+"")
    showLesson();
  });
}

function showLesson() {
  let container = $("#container");
  container.html("");
  let sentences = data[parseInt(localStorage.getItem("currentId"))].sentences;
  for (let i = 0; i < sentences.length; i++) {
    let fa= sentences[i].fa;
    let en= sentences[i].en;
    container.append("<div data-id=\""+i+"\" id=\"faSentence\""+i+" class=\"sentence faSentence\">"+fa+"</div>")
    container.append("<div id=\"enSentence"+i+"\" class=\"sentence enSentence hidden\">"+en+"</div>")
  }
  $(".faSentence").click(function (){
    let id=$(this).data().id;
    $("#enSentence"+id ).removeClass("hidden");
  });
  container.append("  <div class=\"bottomContainer\">\n"
      + "    <div id=\"btnBack\" class=\"bottomButton\">Back</div>\n"
      + "    <div id=\"btnNext\" class=\"bottomButton\">Next</div>\n"
      + "  </div>");
  $("#btnBack").click(function (){
    loadLessons();
  });
  $("#btnNext").click(function (){
    let next = parseInt(localStorage.getItem("currentId"))+1;
    if(next>=489){
      next=489;
    }
    localStorage.setItem("currentId",next);
    showLesson();
  });
}