var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  getMsgDB();
  $(".add-message").click(addMsgClick);
});

function addMsgClick(event) {
  event.preventDefault();

  var newMsg = $(".message-input").val();
  var msgFromDB = addMsgToDB(newMsg);

  createListItem(newMsg, msgFromDB.key)
}

function addMsgToDB(text) {
  return database.ref("posts" + USER_ID).push({
  text: text

  });
}

function getMsgDB() {
  database.ref("posts" + USER_ID).once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        createListItem(childData.text, childKey)
        console.log(snapshot)
      });
    });
}


function createListItem(text, key) {
  $(".news-list").append(`
    <li>
      <button class="button-delete">Excluir</button> data-delete-id=${key} />
        <button class="button-delete">Editar</button> data-edit-id=${key} />
      <span>${text}</span>
    </li>`);
  }

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

  // $(`input[data-publicacoes-id="${key}"]`).click(function() {
  //   database.ref("publicacoes/" + USER_ID + "/" + key).remove();
  //   $(this).parent().remove();
  // });
// }

    //     function addMessage(key, message) {
    //         if ($('#li-message-' + key).length) return;
    //         var template = $('#message-template').html();
    //         template = template.replace('{key}', key);
    //         template = template.replace('{user-name}', message.userDisplayName);
    //         template = template.replace('{photo-url}', message.userPhotoUrl);
    //         template = template.replace('{body}', message.body);
    //         $('#ul-messages').prepend(template);
    //         $('#div-loading').hide();
    //     }
    //
    //     function delMessage(key) {
    //         $('#li-message-' + key).hide(1000);
    //     }
    //
    //     messagesRef = firebase.database().ref('messages/');
    //
    //     messagesRef.limitToFirst(1).on('value', function (snapshot) {
    //         console.log('messagesRef.limitToFirst(1).on > value', snapshot.val());
    //     });
    //
    //     messagesRef.on('child_added', function (data) {
    //         console.log('messagesRef.on > child_added', data.val());
    //         addMessage(data.key, data.val());
    //     });
    //     messagesRef.on('child_removed', function (data) {
    //         console.log('messagesRef.on > child_removed', data);
    //         delMessage(data.key);
    //     });
    //
    //
    // function sendMessage() {
    //     var message = $('#input-message').val();
    //     if (message.trim() == '') return;
    //     $('#input-message').attr("disabled", true);
    //     var data = {
    //         userDisplayName: loggedUser.displayName,
    //         userPhotoUrl: loggedUser.photoURL,
    //         uid: loggedUser.uid,
    //         timestamp: firebase.database.ServerValue.TIMESTAMP,
    //         body: message
    //     };
    //     var newMessageKey = firebase.database().ref('messages/').push(data, function (data) {
    //         console.log('database.ref.push >', data);
    //     });
    //     $('#input-message').attr("disabled", false);
    //     $('#input-message').val('');
    //     $('#input-message').focus();
    // }
    //
    //
    // function setSendEnabled(enabled) {
    //     $('#div-send').show(200);
    //     $('#input-message').attr("disabled", !enabled);
    //     $('#button-send').attr("disabled", !enabled);
    // }
    //
    //
    // //****************** Users ************************
    // var usersRef;
    //
    // function listenUsers() {
    //
    //     function addUser(key, user) {
    //         var template = $('#user-template').html();
    //         template = template.replace('{key}', key);
    //         template = template.replace('{class}', '');
    //         template = template.replace('{user-name}', user.displayName);
    //         template = template.replace('{photo-url}', user.photoUrl);
    //         $('#ul-users-online').prepend(template);
    //         setUserStatus(key, user);
    //     }
    //
    //     function setUserStatus(key, user) {
    //         if (user.lastOnline != undefined) {
    //             $('#li-user-' + key).removeClass('online').addClass('offline');
    //         } else {
    //             $('#li-user-' + key).removeClass('offline').addClass('online');
    //         }
    //     }
    //
    //     usersRef = firebase.database().ref('users/');
    //
    //     usersRef.on('child_added', function (data) {
    //         console.log('usersRef.on > child_added', data.val());
    //         addUser(data.key, data.val());
    //     });
    //     usersRef.on('child_changed', function (data) {
    //         console.log('usersRef.on > child_changed', data.val());
    //         setUserStatus(data.key, data.val());
    //     });
    // }
    //
    //
    // //**************** About ********************
    // var dialog = document.querySelector('dialog');
    // var showDialogButton = document.querySelector('#a-about');
    // if (!dialog.showModal) {
    //     dialogPolyfill.registerDialog(dialog);
    // }
    // console.log($('.about'));
    // $('.about').click(function (e) {
    //     e.preventDefault();
    //     dialog.showModal();
    // });
    // dialog.querySelector('.close').addEventListener('click', function () {
    //     dialog.close();
    // });
