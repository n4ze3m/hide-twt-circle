
let articleSelector = "article[data-testid=tweet]";
const TWT_CIRCLE_SVG = "M14 6c0 2.21-1.791 4-4 4S6 8.21 6 6s1.791-4 4-4 4 1.79 4 4zm-4 5c-2.352 0-4.373.85-5.863 2.44-1.477 1.58-2.366 3.8-2.632 6.46l-.11 1.1h17.21l-.11-1.1c-.266-2.66-1.155-4.88-2.632-6.46C14.373 11.85 12.352 11 10 11zm13.759-3.83c-.355-.69-1.059-1.13-1.84-1.17-.66-.03-1.347.22-1.918.79-.573-.57-1.259-.82-1.92-.79-.781.04-1.485.48-1.84 1.17-.358.71-.339 1.62.206 2.59.541.97 1.601 1.99 3.352 2.98l.202.12.201-.12c1.751-.99 2.811-2.01 3.352-2.98.544-.97.563-1.88.205-2.59z"
function getAllCircleTweet() {
    return Array.from(document.querySelectorAll('div')).filter(function (el: any) {
        if (el.innerHTML.includes(TWT_CIRCLE_SVG)) {
            return el;
        }
    })
}

const hideTweet = (tweet: any) => {

    if (tweet.closest(articleSelector)) {
        tweet.closest(articleSelector).remove();
    }

}

export function injectScript() {

    console.log("Injecting script to hide tweets");

    document.addEventListener('load', () => getAllCircleTweet().forEach(hideTweet));

    new PerformanceObserver((_) => {
        getAllCircleTweet().forEach(hideTweet)
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    document.addEventListener('scroll', () => getAllCircleTweet().forEach(hideTweet));

    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                getAllCircleTweet().forEach(hideTweet)
            }
        })
    }
    ).observe(document.body, { childList: true, subtree: true });

}