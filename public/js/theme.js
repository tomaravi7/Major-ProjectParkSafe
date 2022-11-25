function change() {
  var theme = localStorage.getItem("theme");
  if (theme == "light") {
    document.querySelector("body").className = "light";
    console.log("Light Mode Active");
    document.querySelector("#light").setAttribute("selected", "");
  } else {
    document.querySelector("body").className = "";
    console.log("Dark Mode Active");
    document.querySelector("#dark").setAttribute("selected", "");
  }
}

function theme(val) {
  localStorage.setItem("theme", val);
  change();
}
change();

function fetchTheme() {
  const lt = window.matchMedia("(prefers-color-scheme: light)");
  console.log(lt);
  if (lt.matches) {
    localStorage.setItem("theme", "light");
    change();
  } else {
    localStorage.setItem("theme", "dark");
    change();
  }
  localStorage.setItem("system-theme", "fetched");
}

var sysTheme = localStorage.getItem("system-theme");
if (sysTheme=="fetched") {
  change()
} else {
  fetchTheme()
}


