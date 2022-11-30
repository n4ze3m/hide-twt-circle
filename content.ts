import { injectScript } from "~script";

export { };



if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get(['hideCircleTweets'], (item) => {
        const isEmptyItem = Object.keys(item).length === 0 && item.constructor === Object;
        if (item.hideCircleTweets || isEmptyItem) {
            injectScript();
        }
    });
}
