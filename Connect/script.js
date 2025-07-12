// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBaGTtD2xoQXvSXV82BHI7MmGYhD_I6vJI",
    authDomain: "l-edu-cca65.firebaseapp.com",
    projectId: "l-edu-cca65",
    storageBucket: "l-edu-cca65.firebasestorage.app",
    messagingSenderId: "94845436942",
    appId: "1:94845436942:web:4acf422c12ea07e3fc685f",
    measurementId: "G-ZKGRJP089H"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Gán sự kiện cho nút kiểm tra Firebase
document.getElementById("testFirebase").addEventListener("click", async () => {
    try {
        const docRef = await addDoc(collection(db, "test"), {
            message: "Firebase đang hoạt động!"
        });
        alert("Dữ liệu đã được lưu với ID: " + docRef.id);
    } catch (e) {
        console.error("Lỗi khi thêm dữ liệu:", e);
    }
});
