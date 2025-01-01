const fileInput = document.querySelector('input');
const downloadBtn = document.querySelector('button');

downloadBtn.addEventListener("click", e => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
})

function fetchFile(url) {
  // Fetching file & returning response as blob
  fetch(url).then(res => res.blob()).then(file => {
    // URL.createObjectURL creates a URL of the passed object
    let tempUrl = URL.createObjectURL(file);
    let aTag = document.createElement("a");
    aTag.href = tempUrl; // Passing tempUrl as href value of <a> tag
    
    // Passing the last name & extension as download value of <a> tag
    aTag.download = url.replace(/^.*[\\\/]/, '');
    document.body.appendChild(aTag); // Adding <a> tag inside body
    
    aTag.click(); // Click <a> tag so the file downloads
    aTag.remove(); // Remove the <a> tag once file is downloaded
    URL.revokeObjectURL(tempUrl); // Remove tempURL from the document
    downloadBtn.innerText = "Download file";
  }).catch(() => {
    alert("Failed to download file");
    downloadBtn.innerText = "Download file";
  });
}
