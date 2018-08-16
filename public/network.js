var database = firebase.database();
var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];
$(document).ready(function() {
createUsersDB();
  getMsgDB();
  getUsersDB();

  $(".add-message").click(function(event) {
   event.preventDefault();
  var newMsg = $(".message-input").val();
  $(".message-input").val("");
  var msgFromDB = database.ref('posts/' + USER_ID).push({
      text: newMsg
    });
  createListItem(newMsg, msgFromDB.key)
  })
});

function createListItem(text, key) {
  $(".news-list").append(`
    <li>
      <span data-text-id="${key}">${text}</span>
      <button class="deletar" data-delete-id="${key}">Excluir </button>
      <button class="editar" data-edit-id="${key}">Editar </button>
      <button class="gostar" data-like-id="${key}">Gostei </button>
    </li>`
    );

    $(`button[data-delete-id=${key}]`).click(function() {
        $(this).parent().remove();
        database.ref('posts/'+ USER_ID + "/" + key).remove();
      });
    $(`button[data-delete-id=${key}]`).click(function() {
        $(this).parent().remove();
        database.ref('posts/'+ USER_ID + "/" + key).remove();
      });
    $(`button[data-edit-id=${key}]`).click(function() {
    var newText = prompt(`Altere o seu texto: ${text}`);
      $(`span[data-text-id=${key}]`).text(newText);
    database.ref(`posts/${USER_ID}/${key}`).update({
      text: newText
      })
    });
    var likes = 1;
    $(`button[data-like-id=${key}]`).click(function() {
      function like(){
        return likes ++;
      }
      database.ref('posts/'+ USER_ID + "/" + key).set({
        likes: like()
      })
    })
  }

function getMsgDB() {
  database.ref("posts/" + USER_ID).once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        createListItem(childData.text, childKey);

      });
    });
}

function createUsersDB() {
database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot) {
    var userInfo = snapshot.val();
    $(".user-name").text(userInfo.name)
  });
}
function getUsersDB(){
  database.ref("users").once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createUsers(childData.name, childKey)
    });
  });
  database.ref("postsFriend").once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createPostsFriend(childData.text, childKey)
    });
  });
}

function createUsers(name, key) {
  if (key !== USER_ID) {
    $(".users-list").append(`
      <li class="users-list-li-u">
        <span>${name}</span>
        <button class="buttonUsers" data-user-id="${key}">seguir</button>
      </li>
    `);
  }

  $(`button[data-user-id=${key}]`).click(function () {
    database.ref('friendship/' + USER_ID).push({
      friendId: key
    });
  })
}

function createPostsFriend(text, key) {
  if (key !== USER_ID) {
    $(".news-list").append(`
      <li class="users-list-li-u">
        <span>${text}</span>
      </li>
    `);
  }

  $(`button[data-user-id=${key}]`).click(function () {
    database.ref('postsFriend/' + USER_ID).push({
    postsFriend: text
    });

})
}

var uploader = $("#uploader").val();
var uploadButton = $("#upload-button");

$("#upload-button").change(files);
function files(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref("gifts/" + file.name);
  var task = storageRef.put(file);
  task.on('state_changed',
    function progress(snapshot) {
      var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percent;

    }
  )}
