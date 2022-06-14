// https://aaronluna.dev/blog/add-copy-button-to-code-blocks-hugo-chroma/

// create copy button
function ccb(highlightDiv) {
  const button = document.createElement("button");
  button.className = "cc ";
  button.type = "button";
  button.innerHTML = "Copy";
  button.addEventListener("click", () =>
    ccc(button, highlightDiv)
  );

  // addCopyButtonToDom
  const wrapper = document.createElement("div");
  wrapper.className = "ccw";
  wrapper.appendChild(button);
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

// copy code clipboard
async function ccc(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(":last-child > code")
    .innerText;
  try {
    result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      cce(codeToCopy, highlightDiv);//copyCodeBlockExecCommand
    }
  } catch (_) {
    cce(codeToCopy, highlightDiv);//copyCodeBlockExecCommand
  } finally {
    //codeWasCopied
    button.blur();
    button.innerHTML = "Copied";
    setTimeout(function () {
      button.innerHTML = "Copy";
    }, 2000);
  }
}

//copyCodeBlockExecCommand
function cce(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = "true";
  textArea.readOnly = "false";
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange();
  range.selectNodeContents(textArea);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  textArea.setSelectionRange(0, 999999);
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}

document
  .querySelectorAll("pre")
  .forEach((highlightDiv) => ccb(highlightDiv));