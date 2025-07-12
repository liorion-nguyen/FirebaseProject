// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Cấu hình Firebase (Thay bằng config của bạn từ Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBaGTtD2xoQXvSXV82BHI7MmGYhD_I6vJI",
    authDomain: "l-edu-cca65.firebaseapp.com",
    projectId: "l-edu-cca65",
    storageBucket: "l-edu-cca65.firebasestorage.app",
    messagingSenderId: "94845436942",
    appId: "1:94845436942:web:4acf422c12ea07e3fc685f",
    measurementId: "G-ZKGRJP089H"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lưu dữ liệu vào Firestore
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    
    try {
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            age: parseInt(age),
            createdAt: new Date()
        });
        alert("Dữ liệu đã được lưu vào Firebase!");
        document.getElementById("userForm").reset();
        loadUsers(); // Load lại danh sách sau khi thêm
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
    }
});

// Load danh sách người dùng từ Firestore
async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email} - ${user.age} tuổi`;
        userList.appendChild(li);
    });
}

// Gọi loadUsers() khi trang web load
loadUsers();
