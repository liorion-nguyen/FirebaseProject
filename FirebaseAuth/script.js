// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Cấu hình Firebase (Thay bằng config của bạn)
const firebaseConfig = {
    apiKey: "AIzaSyDClyiBSWFsyvSFtipKRAwCCwkr9CvSh60",
    authDomain: "jsi05-b6b19.firebaseapp.com",
    databaseURL: "https://jsi05-b6b19-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jsi05-b6b19",
    storageBucket: "jsi05-b6b19.firebasestorage.app",
    messagingSenderId: "431931950239",
    appId: "1:431931950239:web:ae8a947692f89b1e5b0eaa",
    measurementId: "G-Z2N4QEJ6F8"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig); // Khởi tạo Firebase
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Cấu hình Google Auth Provider

// Đăng ký tài khoản với Email/Password
document.getElementById("register").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Đăng ký thành công!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert("Lỗi đăng ký: " + error.message);
        });
});

// Đăng nhập với Email/Password
document.getElementById("login").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Đăng nhập thành công!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert("Lỗi đăng nhập: " + error.message);
        });
});

// Đăng nhập với Google
document.getElementById("google-login").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            alert("Đăng nhập Google thành công!");
            console.log("User:", result.user);
        })
        .catch((error) => {
            alert("Lỗi đăng nhập Google: " + error.message);
        });
});

// Đăng xuất
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("Đã đăng xuất!");
        })
        .catch((error) => {
            alert("Lỗi đăng xuất: " + error.message);
        });
});

// Kiểm tra trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
    const userInfo = document.getElementById("user-info");
    const logoutBtn = document.getElementById("logout");

    if (user) {
        userInfo.textContent = `Đăng nhập: ${user.email}`;
        logoutBtn.style.display = "block";
    } else {
        userInfo.textContent = "Chưa đăng nhập";
        logoutBtn.style.display = "none";
    }
});
