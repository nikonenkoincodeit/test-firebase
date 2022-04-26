import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.11/firebase-database.min.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.11/firebase-auth.min.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

//добавить данные
function writeUserData(userId, name, email, imageUrl = "") {
  push(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

function getData(userId) {
  get(ref(db, "users/" + userId + "/-N0CgkHgtW1KdUNL41RO"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const a = {
  email: "test@test.com",
  profile_picture: "",
  username: "Test 111111111",
};

function updateData(userId, updates) {
  update(ref(db, "users/" + userId + "/-N0CgkHgtW1KdUNL41RO"), updates);
}

function removeData(userId) {
  remove(ref(db, "users/" + userId + "/-N0CgkHgtW1KdUNL41RO"));
}
// writeUserData("shdbvjdasad", "Test", "test@test.com");
// updateData("shdbvjdasad", a);
// removeData("shdbvjdasad");
// getData("shdbvjdasad");

const btn = document.querySelector(".btn");
const provider = new GoogleAuthProvider();

btn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user :>> ", user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log("getRedirectResult :>> ", user);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
getRedirectResult(auth);
