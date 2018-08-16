var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  getMsgDB();
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
      <button data-delete-id="${key}">Excluir </button>
        <button data-edit-id="${key}">Editar </button>
      <span data-text-id="${key}">${text}</span>
    </li>`
    );
  
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
}

function getMsgDB() {
  database.ref("posts/" + USER_ID).once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        createListItem(childData.text, childKey)
      });
    });
}

$(document).ready(function() {
  database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot) {
    var userInfo = snapshot.val();
    $(".user-name").text(userInfo.name)
  })

  database.ref("users").once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createUsers(childData.name, childKey);
    });
  })

  function createUsers(name, key) {
  if (key !== USER_ID) {
    $(".users-list").append(`
      <li>
        <span>${name}</span>
        <button data-user-id="${key}">seguir</button>
      </li>
    `);
  }

  $(`button[data-user-id=${key}]`).click(function () {
    database.ref('friendship/' + USER_ID).push({
      friendId: key
    });
  })
}
});
//   $(`button[data-user-id=${key}]`).click(function () {
//     database.ref('friendship/' + USER_ID).push({
//       friendId: key
//     });
//   })

// }

//     var uploader = $("#uploader").val();
//     var uploadButton = $("#upload-button");
//
// $("#upload-button").change(files);
// function files(e){
//   var file = e.target.files[0];
//   var storageRef = firebase.storage().ref("gifts/" + file.name).
//   var bar = storage.ref.put(file),
//   bar.on("state_changed",
//   function progress(snapshot) {
//     var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     uploader.value = percent;
//
//   }
//   function error(err){
//
//   }
//   function complete(){
//
//   }
//
// )
// }

