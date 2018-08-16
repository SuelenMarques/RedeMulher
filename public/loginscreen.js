var database = firebase.database();

$(document).ready(function() {
  $('.firstscreen').delay('4000').fadeOut('slow');
  $('.loginscreen').delay('4000').fadeIn('slow');
  $(".sign-up-button").click(signUpClick);
  $(".sign-in-button").click(signInClick);
});

  function signUpClick(event) {
    event.preventDefault();
    var name = $(".sign-name").val();
    var email = $(".sign-email").val();
    var password = $(".sign-password").val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response) {
      alert("Cadastro concluido com sucesso !!! Faça seu login\n " + name);
    })
    .catch(function(error) {
      checkError(error);
    });
}

  function signInClick(event) {
    event.preventDefault();
    var name = $(".sign-name").val();
    var email = $(".sign-email").val();
    var password = $(".sign-password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(response) {
        var userId = response.user.uid;
        database.ref("users/" + userId).set({
         name: name,
         email: email
       });
        redirectToPage(userId);
      })
      .catch(function(error) {
        checkError(error);
      });
  }

function checkError(error) {
  var errorMessage = error.message;
  alert(errorMessage);
}

function redirectToPage(userId) {
  window.location = "network.html?userId=" + userId;
}
