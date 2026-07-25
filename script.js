let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// Giới hạn độ dài tên để tránh vỡ bố cục
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// Tránh `null` bị hiển thị thành `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // Đếm số lần nhấn nút Không

// Các dòng chữ thay đổi trên nút Không
const noTexts = [
  "…Em nói thật á?",
  "Suy nghĩ lại đi?",
  "Không được chọn cái này!",
  "Anh sẽ rất buồn…",
  "Không được:(",
];

// Sự kiện khi nhấn nút Không
noButton.addEventListener("click", function () {
  clickCount++;

  // Phóng to nút Có, mỗi lần tăng gấp 1.2 lần
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // Đẩy nút Không sang phải, mỗi lần 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // Dịch ảnh và chữ lên trên
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // Đổi văn bản trên nút Không (5 lần đầu)
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // Đổi ảnh (5 lần đầu)
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // Sốc
  if (clickCount === 2) mainImage.src = "images/think.png"; // Suy nghĩ
  if (clickCount === 3) mainImage.src = "images/angry.png"; // Tức giận
  if (clickCount === 4) mainImage.src = "images/crying.png"; // Khóc
  if (clickCount >= 5) mainImage.src = "images/crying.png"; // Từ lần 5 trở đi luôn là khóc
});

// Khi nhấn Có, chuyển sang trang thành công
const loveTest = `Anh thích em!!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // Tạo cấu trúc HTML mới
  document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text"></h1>
            <img src="images/hug.png" alt="Ôm" class="yes-image">
        </div>
    `;

  // Chèn tên an toàn vào văn bản
  document.querySelector(".yes-text").innerText = loveTest;

  // Khóa cuộn để giữ giao diện đẹp
  document.body.style.overflow = "hidden";
});