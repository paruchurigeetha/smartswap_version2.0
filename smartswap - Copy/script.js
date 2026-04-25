function showLogin() {
  var modal = new bootstrap.Modal(document.getElementById('loginModal'));
  modal.show();
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup Successful ✅");
    })
    .catch(error => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login Successful 🎉");

      document.getElementById("mainSection").style.display = "none";
      document.getElementById("collegeSection").style.display = "block";
    })
    .catch(error => {
      alert(error.message);
    });
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("loginBtn").style.display = "none";

    const college = localStorage.getItem("college");

    if (!college) {
      document.getElementById("collegeSection").style.display = "block";
      document.getElementById("mainSection").style.display = "none";
    } else {
      document.getElementById("collegeSection").style.display = "none";
      document.getElementById("mainSection").style.display = "block";
      loadCollege();
    }

  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("mainSection").style.display = "none";
    document.getElementById("collegeSection").style.display = "none";
  }
});
function saveCollege() {
  const college = document.getElementById("college").value;

  if (college === "") {
    alert("Please select a college");
    return;
  }

  localStorage.setItem("college", college);

  alert("College Selected: " + college);

  document.getElementById("collegeSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
}
function loadCollege() {
  const college = localStorage.getItem("college");

  if (college) {
    document.getElementById("collegeDisplay").innerText =
      "Showing items for: " + college;
  }
}
function addItem() {
  const name = document.getElementById("itemName").value;
  const desc = document.getElementById("description").value;
  const mrp = document.getElementById("mrp").value;
  const price = document.getElementById("price").value;
  const contact = document.getElementById("contact").value;
  const college = localStorage.getItem("college");

  firebase.firestore().collection("items").add({
    name,
    description: desc,
    mrp,
    price,
    contact,
    college,
    createdAt: new Date()
  })
  .then(() => {
    alert("Item Posted Successfully ✅");
  })
  .catch(error => {
    alert(error.message);
  });
}