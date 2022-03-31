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
                    
                    $(target).find('> div').each(async function () {
                        let treso=$(this).find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find('a').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+3+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').attr("aria-label");
                        let groupFinder=$(this).find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find('a').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').length;
                        let groupFindernum=$(this).find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find('a').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').children().size() 
                        console.log("Each Box count111 : ",groupFinder);
                        console.log("Each Box count222",groupFindernum);
                        if(treso == "Mark as read" ){
                            if(groupFindernum === 1){
                                let box= $(this).find(' > div:nth-child('+1+')').find(' > div:nth-child('+1+')').find('a').attr("href");
                                console.log("Each Box",box);
                                previousIds.push(box);
                                getSenderUrl(box)
                            }
                            
                        }
                       
                    })
                }
            }, 1000)
            
        }
    })
})

const getSenderUrl = (senderUrl) => {
    
if(senderUrl !="undefined"){
    let port = chrome.runtime.connect({ name: "ListKnock" });
    port.postMessage({ options: senderUrl, ConFlag: "StoreMessageLinkInLocalStorage" });
    port.disconnect();
}
    
}