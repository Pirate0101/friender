const helper = require("../helper/helper")
$(document).ready(function () {
    // console.log("document is ready in Mefnevn.");
    chrome.runtime.sendMessage({ type: "OverlayTrigger", options: "MessageListing" });

    chrome.runtime.onMessage.addListener(async function (request, sender) {
        // console.log("req :: ", request);

        if (request.type == "OverlayCreateList") {
            let div = document.createElement("div");
            let textDiv = document.createElement("div");
            let imgURL = chrome.runtime.getURL(process.kyubi.logo.large_icon);
            let img = document.createElement("IMG");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.position = "absolute";
            div.style.zIndex = "10000";
            div.style.background = "rgba(235,239,242,0.85)";
            div.style.isplay = "flex";
            div.style.flexWrap = "wrap";
            div.style.alignContent = "center";
            div.style.justifyContent = "center";
            div.style.position = 'fixed';
            div.style.top = '0';
            div.style.left = '0';
            img.src = imgURL;
            img.style.position = "fixed";
            img.style.top = "50%";
            img.style.left = "50%";
            img.style.transform = "translate(-50%, -50%)";
            textDiv.innerHTML = process.kyubi.appName + " Is Using This Tab Please Don`t Close It";
            textDiv.style.top = "70%";
            textDiv.style.left = "27%";
            textDiv.style.position = 'fixed';
            textDiv.style.width = "100%";
            textDiv.style.fontSize = "41px";
            textDiv.style.color = "#057ed9";
            div.appendChild(img);
            div.appendChild(textDiv);
            document.body.appendChild(div);
            let previousIds = [];
            const MmwThreadList = setInterval(() => {
                let target = document.querySelector('div[data-testid="MWJewelThreadListContainer"]');
                if (target) {
                    clearInterval(MmwThreadList);
                    let LocationDetails = window.location;
                    let observer = new MutationObserver(function (mutations) {
                        console.log("mutations ::: ", mutations);
                        mutations.forEach(async function (mutation) {
                            if (mutation.addedNodes.length) {
                                
                                console.log("I am here One",$(mutation.target).html());
                                // await chill(1500);
                                // setTimeout(async() => {
                                    $(mutation.target).first().find('div[aria-label="Mark as read"]').each(async function () { //span[aria-label="Mark as read"],
                                        let currentSender = "";
                                        currentSender = getSenderUrl($(this).first(), true);
                                        if (!previousIds.includes(currentSender)) {
                                            previousIds.push(currentSender);
                                            getSenderUrl($(this).first())
                                            setTimeout(() => {
                                                previousIds = previousIds.filter(data => data !== currentSender);
                                            }, 1000);
                                        }
                                    });

                                // }, 500)
                            } else if (mutation.type == "characterData") {
                                //console.log("I am here Two",mutation);
                                console.log("I am here Two",$(mutation.target).html());
                                let isMessageText = $(mutation.target.parentElement).hasClass("a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5");
                                if (isMessageText) {
                                    // await chill(1500);
                                    // setTimeout(async () => {
                                        let currentSender1 = "";
                                        currentSender1 = getSenderUrl($(mutation.target).first(), true);
                                        if (!previousIds.includes(currentSender1)) {
                                            previousIds.push(currentSender1);
                                            console.log("isMessageText : ", isMessageText);
                                            getSenderUrl($(mutation.target).first())
                                            setTimeout(() => {
                                                previousIds = previousIds.filter(data => data !== currentSender1);
                                            }, 1000);
                                        }
                                    // }, 1000);
                                } else if ($($(mutation.target)[0]).text() == "1m") {
                                    // await chill(1500);
                                    // setTimeout(async () => {
                                        let currentSender2 = "";
                                        currentSender2 = getSenderUrl($(mutation.target).first(), true);
                                        if (!previousIds.includes(currentSender2)) {
                                            previousIds.push(currentSender2);
                                            console.log("1 min ki?????");
                                            getSenderUrl($(mutation.target).first())
                                            setTimeout(() => {
                                                previousIds = previousIds.filter(data => data !== currentSender2);
                                            }, 1000);
                                        }
                                    // }, 2000)
                                }
                            } else{
                               // console.log("I am here Three",mutation);
                                console.log("I am here Three",$(mutation.target).html());
                            }

                        });
                    });

                    // configuration of the observer:
                    let config = { attributes: true, childList: true, characterData: true, subtree: true, attributeFilter: ["aria-label"] }

                    // pass in the target node, as well as the observer options
                    observer.observe(target, config);
                }
            }, 500)
        }
    })
})

const getSenderUrl = (elem, returnData = false) => {
    // console.log("elem : ", elem);
    const anchortag = $($(elem).closest('div[data-visualcompletion="ignore-dynamic"]')[0]).find('a')[0]
    // console.log("message list else : ", anchortag);
    let senderUrl = $(anchortag).attr("href");
    // console.log("senderUrl ::: ",senderUrl);

    if (returnData) {
        return senderUrl;
    }

    let port = chrome.runtime.connect({ name: "ListKnock" });
    port.postMessage({ options: senderUrl, ConFlag: "StoreMessageLinkInLocalStorage" });
    port.disconnect();
}