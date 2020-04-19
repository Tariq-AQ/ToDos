$(document).ready(function () {
  var $todos = $("#todos");
  //Read data from JSON using AJAX
  $.ajax({
    type: "GET",
    url: "/assets/todos.json",
    success: function (data) {
      $.each(data, function (i, todo) {
        $todos.append(
          '<li><span><i class="fa fa-trash"></i></span> ' + todo.name + "</li>"
        );
      });
    },
    //On error display a message including the actual error message
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      alert("ToDos could not be loaded - " + errorMessage);
    },
  });
  //Line through ToDos on click to mark as completed
  $("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
  });

  //Deleting a todo (Front-end only)
  $("ul").on("click", "span", function (event) {
    $(this)
      .parent()
      .fadeOut(400, function () {
        $(this).remove();
      });

    event.stopPropagation();
  });

  //Encapsulating add new function to use it as a callback function later
  var submit = function () {
    if ($("input[type='text']").val() != "") {
      var todoText = $("input[type='text']").val();
      $("input[type='text']").val("");
      $("ul").prepend(
        '<li><span><i class="fa fa-trash"></i></span> ' + todoText + "</li>"
      );
    }
  };
  //On Enter save the new toDo
  $("input[type='text']").keypress(function () {
    if (event.which === 13) {
      submit();
    }
  });

  //On Click save the new toDo
  $("#addLi").click(submit);

  //toggle display of the newData div
  $(".fa-plus").click(function () {
    $("input[type='text'],#addLi").fadeToggle();
  });

  //Add a check sign to submit button on click
  $("#addLi").click(function () {
    setTimeout(function () {
      $("#addLi").addClass("fa fa-check clicked");
    }, 0);

    setTimeout(function () {
      $("#addLi").removeClass("fa fa-check clicked");
    }, 700);
  });
});
