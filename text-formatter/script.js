// 1. DOM Element Selections
const text = document.getElementById("text-input");
const result = document.getElementById("preview");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");
const fontSelect = document.getElementById("font-select");

const buttons = {
  uppercase: document.getElementById("uppercase-btn"),
  lowercase: document.getElementById("lowercase-btn"),
  capitalize: document.getElementById("capitalize-btn"),
  underline: document.getElementById("underline-btn"),
  copy: document.getElementById("copy-btn"),
  rmspace: document.getElementById("rmspace"),
};

// 2. Live Preview + Stats Update
text.addEventListener("input", () => {
  const content = text.value;
  result.textContent = content;
  updateStats(content);
});

// 3. Update Word & Character Stats
function updateStats(content) {
  const words = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const chars = content.length;

  wordCount.textContent = words;
  charCount.textContent = chars;
}

// 4. Text Transformations
function transformText(type) {
  let content = result.textContent;

  switch (type) {
    case "uppercase":
      content = content.toUpperCase();
      break;
    case "lowercase":
      content = content.toLowerCase();
      break;
    case "capitalize":
      content = content
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      break;
    case "rmspace":
      content = content.replace(/\s+/g, " ").trim();
      break;
  }

  result.textContent = content;
  text.value = content;
  updateStats(content);
}

// 5. Bind Text Transformation Buttons
["uppercase", "lowercase", "capitalize", "rmspace"].forEach((type) => {
  buttons[type].addEventListener("click", () => transformText(type));
});

// 6. Underline Toggle
buttons.underline.addEventListener("click", () => {
  const isUnderlined = result.style.textDecoration === "underline";
  result.style.textDecoration = isUnderlined ? "none" : "underline";
});

// 7. Copy to Clipboard
buttons.copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(result.textContent)
    .then(() => alert("Copied to clipboard!"))
    .catch((err) => console.error("Copy failed:", err));
});

// 8. Font Selection
fontSelect.addEventListener("change", () => {
  const font = fontSelect.value;
  result.style.fontFamily = font;
  text.style.fontFamily = font;
});

