// --------- Settings ----------

//defaults
const defaultSettings = {
    seconds: false,
    format12: false,
    autocomplete: true,
    bdradius: "10px",
    searchLogo: true,
    searchEngine: "ddg",
    background: "off"
}

// if not exists, create settings profile
if (localStorage.getItem("settings") == null) {
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// change setting given the name and the new value
const setSetting = (setting, val) => {
    let settings = JSON.parse(localStorage.getItem("settings"));
    settings[setting] = val;
    localStorage.setItem("settings", JSON.stringify(settings));
}

// return setting
const getSetting = (setting) => {
    return JSON.parse(localStorage.getItem("settings"))[setting];
}

// tick checkboxes to match settings
const loadSettings = () => {
    document.getElementById("seconds").checked = getSetting("seconds");
    document.getElementById("timeFormat").checked = getSetting("format12");
    document.getElementById("autocomplete").checked = getSetting("autocomplete");
    document.getElementById("bdradius").value = getSetting("bdradius");
    document.getElementById("background").value = getSetting("background");
    document.getElementById("showEngineLogo").checked = getSetting("searchLogo");
    document.getElementById("searchEngine").value = getSetting("searchEngine");
    // set icon
    document.getElementById("icon").src = `assets/${getSetting("searchEngine")}.svg`;
}

// change search engine
const changeSearchEngine = () => {
    setSetting("searchEngine", document.getElementById("searchEngine").value)
    loadSettings()
}

// change search engine
const changeBdradius = () => {
    setSetting("bdradius", document.getElementById("bdradius").value)
    const r = document.querySelector(":root")
    r.style.setProperty("--bdradius", getSetting("bdradius"))
}

// change background
const changeBackground = () => {
    setSetting("background", document.getElementById("background").value)
    setBackground()
}

const setBackground = () => {
    const r = document.querySelector(":root")
    if (getSetting("background") != "off") {
        document.body.style.backgroundImage = `url(assets/${getSetting("background")}.jpg)`
        r.style.setProperty("--bg", "#272a34dd")
        r.style.setProperty("--secBg", "#030615d6")
        document.getElementById("datetime").style.opacity = "100%"
    } else {
        document.body.style.backgroundImage = "none"
        r.style.setProperty("--bg", "#272a34")
        r.style.setProperty("--secBg", "#030615d6")
        document.getElementById("datetime").style.opacity = "50%"
    }
}

// toggle setting
const toggleSetting = (setting, id) => {
    setSetting(setting, document.getElementById(id).checked)
    updateSettings()
}

// update settings
const updateSettings = () => {
    document.getElementById("icon").style.display = (getSetting("searchLogo") ? "block":"none");
}

// on load
const BdLoad = () => {
    updateSettings()
    loadSettings()
    const r = document.querySelector(":root")
    r.style.setProperty("--bdradius", getSetting("bdradius"))
    setBackground()
    document.getElementById("searchInput").focus()
}

BdLoad()

// ----------- time and date ------------

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// set time and date
const dateTime = () => {
    const date = new Date()
    if (getSetting("seconds")) {
        document.getElementById("time").style.fontSize = "5.5rem";
        document.getElementById("time").innerText = date.toLocaleTimeString([], { hour12: getSetting("format12")})
    } else {
        document.getElementById("time").style.fontSize = "7.5rem";
        document.getElementById("time").innerText = date.toLocaleTimeString([], {hour12: getSetting("format12"), hour: '2-digit', minute: '2-digit'})
    }

    document.getElementById("day").innerText = capitalizeFirstLetter(date.toLocaleDateString([], {weekday: "long"}));
    document.getElementById("date").innerText = date.toLocaleDateString([], {month: "long", day: "numeric", year: "numeric"})
}

// update time and date
dateTime()
setInterval(dateTime, 1000)


// ---------- menus ----------

// hide all
const hideMenu = () => {
    document.getElementById("close").style.display = "none"
    document.getElementById("settings").style.display = "none"
}

// show settings menu
const settingsMenu = () => {
    document.getElementById("close").style.display = "block"
    document.getElementById("settings").style.display = "block"
}

const urlSubmit = () => {
    event.preventDefault();
    if (document.getElementById("searchInput").value.startsWith("https://")) {
        location.href = document.getElementById("searchInput").value;
    } else if (document.getElementById("searchInput").value.includes(".") && !document.getElementById("searchInput").value.includes(' ')) {
        location.href = `https://${document.getElementById("searchInput").value}`
    } else {
        location.href = `https://duckduckgo.com/?q=${document.getElementById("searchInput").value} !${getSetting("searchEngine")}`;
    }
    
}