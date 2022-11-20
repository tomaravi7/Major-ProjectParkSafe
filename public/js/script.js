function light() {
    document.querySelector('body').className="light"    
    console.log("Light Mode Active")
}
const lt = window.matchMedia("(prefers-color-scheme: light)");
if (lt.matches) {
  light()
}

