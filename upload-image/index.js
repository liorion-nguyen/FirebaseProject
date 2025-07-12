import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";

// 1️⃣ Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAy3E6W18XpdwatHykZ13SHDk-LZTxcJgY",
    authDomain: "school-management-9be49.firebaseapp.com",
    databaseURL: "https://school-management-9be49-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "school-management-9be49",
    storageBucket: "school-management-9be49.appspot.com",
    messagingSenderId: "124556711513",
    appId: "1:124556711513:web:60e309ecd813394efb4348",
    measurementId: "G-K21GLE45GZ"
};

// 2️⃣ Khởi tạo Firebase App và Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// 3️⃣ Hàm Upload Ảnh
function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Vui lòng chọn ảnh!");
        return;
    }

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("status").innerText = `Đang Upload: ${progress.toFixed(2)}%`;
        },
        (error) => {
            alert("Lỗi Upload: " + error.message);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                document.getElementById("status").innerText = "Upload Thành Công!";
                document.getElementById("preview").src = downloadURL;
                document.getElementById("preview").style.display = "block";
            });
        }
    );
}

// 4️⃣ Hàm Xoá Ảnh từ URL
function deleteFileByUrl() {
    const imageUrl = document.getElementById("deleteUrl").value.trim();

    if (!imageUrl) {
        alert("Vui lòng nhập URL ảnh cần xoá!");
        return;
    }

    try {
        // Chuyển URL ảnh thành đường dẫn trong Storage
        const urlObj = new URL(imageUrl);
        const path = decodeURIComponent(urlObj.pathname.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, path);

        // Xoá ảnh
        deleteObject(imageRef)
            .then(() => {
                document.getElementById("status").innerText = "Ảnh đã bị xoá thành công!";
                document.getElementById("deleteUrl").value = "";
            })
            .catch((error) => {
                alert("Lỗi khi xoá ảnh: " + error.message);
            });
    } catch (error) {
        alert("URL không hợp lệ!");
    }
}

// 5️⃣ Gắn sự kiện cho nút Upload & Xoá
document.getElementById("uploadBtn").addEventListener("click", uploadFile);
document.getElementById("deleteBtn").addEventListener("click", deleteFileByUrl);