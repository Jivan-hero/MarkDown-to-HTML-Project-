function convertMarkdown() {
  // Step 1: read the textarea inside the function
  const input = document.getElementById("markdown-input").value;

  // Step 2: split input into lines
  const lines = input.split("\n");
  let html = "";

  lines.forEach(line => {
    let converted = line;

    // Headings (must be at the start of line)
    converted = converted.replace(/^### (.*)$/, "<h3>$1</h3>");
    converted = converted.replace(/^## (.*)$/, "<h2>$1</h2>");
    converted = converted.replace(/^# (.*)$/, "<h1>$1</h1>");

    // Blockquotes (must be at the start of line)
    converted = converted.replace(/^> (.*)$/, "<blockquote>$1</blockquote>");

    // Images
    converted = converted.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');

    // Links
    converted = converted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Bold (** or __)
    converted = converted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    converted = converted.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic (* or _)
    converted = converted.replace(/\*(.*?)\*/g, "<em>$1</em>");
    converted = converted.replace(/_(.*?)_/g, "<em>$1</em>");

    html += converted;
  });

  return html;
}

// Step 3 & 4: input event to show live preview and raw HTML
const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutput.textContent = html; // raw HTML
  preview.innerHTML = html;      // rendered HTML
});
