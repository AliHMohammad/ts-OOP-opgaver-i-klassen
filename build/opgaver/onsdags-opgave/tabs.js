let selectedTab = null;
function initTabs() {
    // setup tab-toggling
    document.querySelectorAll("#tabs h2").forEach((tab) => tab.addEventListener("click", selectTab));
    // click the first tab to enable everything
    const htmlElement = document.querySelector("#tabs h2");
    htmlElement.click();
}
function selectTab(event) {
    const tab = event.target;
    // only accept click, if tab isn't selected
    if (!tab.classList.contains("selected")) {
        // unselect last tab - if any
        if (selectedTab) {
            selectedTab.classList.remove("selected");
            const element = document.querySelector(`#${selectedTab.dataset.tabShow}`);
            element.classList.add("hide");
        }
        // select this tab
        tab.classList.add("selected");
        const anotherElement = document.querySelector(`#${tab.dataset.tabShow}`);
        anotherElement.classList.remove("hide");
        // remember the selected tab
        selectedTab = tab;
    }
}
export { initTabs };
