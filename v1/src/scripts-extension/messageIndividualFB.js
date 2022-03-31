$(document).ready(function () {
    // console.log("I am in message individual");
    chrome.runtime.sendMessage({ type: "OverlayTriggerThread", options: "MessageIndividual" });

    chrome.runtime.onMessage.addListener(async function (request, sender) {
        // console.log("This is the Request  From BackGround",request)
        if (request.type == "OverlayCreateIndividual") {
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

            let port = chrome.runtime.connect({ name: "knockknock" });
            let WindowURL = window.location.search;
            var LocationDetails = window.location;
            let newWindowURL = WindowURL.replace('?tid=cid.c.', ' ');
            newWindowURL = newWindowURL.replace('?tid=cid.g.', ' ');
            let reslinksplit = newWindowURL.split("&");
            // let FacebookIdString  = reslinksplit[0].split("%3A");
            let FacebookIdString = LocationDetails.href.split("/t/")[1];
            // console.log("FacebookIdString : ", FacebookIdString);
            const msglistInterval = setInterval(() => {
                const messageList = $(document).find('div[data-testid="mw_message_list"]');
                if (messageList.length) {
                    clearInterval(msglistInterval);
                    const messageListDiv = $(messageList[0]).find(" > div");
                    // console.log("messageListDiv :", messageListDiv);
                    // console.log("messageListDiv[messageListDiv.length-1] :", messageListDiv[messageListDiv.length-1]);
                    // console.log("$(messageListDiv[messageListDiv.length-1]).find('span') :", $(messageListDiv[messageListDiv.length-1]).find("span"));
                    // console.log("$(messageListDiv[messageListDiv.length-1]).find('span')[2] :", $(messageListDiv[messageListDiv.length-1]).find("span")[2]);
                    // console.log("$(messageListDiv[messageListDiv.length-1]).find('span')[2].innerText :", $(messageListDiv[messageListDiv.length-1]).find("span")[2].innerText);
                    if (messageListDiv.length > 0) {
                        let ProfileLink = "https://www.facebook.com" + $($('h2[class="gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl d2edcug0 hpfvmrgz"]').last().find("a")[0]).attr("href");
                        let Name = $($('h2[class="gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl d2edcug0 hpfvmrgz"]').last().find("a")[0]).html();
                        let ProfileName = Name.trim();
                        let content = "";
                        content = $(messageListDiv[messageListDiv.length - 1]).find("span")[2].innerText;
                        // console.log("content : ", content);
                        let MessageDetails = {
                            profile_name: ProfileName,
                            message_content: content,
                            facebook_Id: FacebookIdString,
                            location_details: LocationDetails.href,
                            ProfileLink: ProfileLink
                        }
                        console.log("This Is I am Sending", MessageDetails);
                        port.postMessage({ MessageDetails: MessageDetails, ConFlag: "CheckMessageContent" });
                    } else {
                    }
                }
            }, 500);

            port.onMessage.addListener(async function (msg) {
                // console.log("This is the Request  From CCCCCCCCCCCCCCCCCCCCCC",msg)

                // await chill(3000)
                var loadInterval = setInterval(async () => {
                    console.log($('div[aria-label="Message"]').find('span'));
                    if ($('div[aria-label="Message"]').find('span').length > 0) {
                        clearInterval(loadInterval)
                        $('div[aria-label="Message"]').find('span')[0].click();
                        await chill(1000)
                        createCaretPlacer(
                            document.querySelector('[aria-label="Aa"]'),
                            true,
                            true
                        );
                        await chill(1000)

                        await paste(msg.userInfoDetails);
                        await chill(4000)

                        if (msg.ConFlagBack == "DEFAULTMESSAGEBACK") {

                            let Nowtime = $.now();

                            let setDefaultMessageSaveONEX = {
                                FacebookFirstName: msg.ThreadParams.FacebookFirstName,
                                FacebookLastName: msg.ThreadParams.FacebookLastName,
                                FacebookUserId: msg.ThreadParams.FacebookUserId,
                                FriendFacebookId: msg.ThreadParams.FriendFacebookId,
                                MfenevanId: msg.ThreadParams.MfenevanId,
                                ProfileLink: msg.ThreadParams.ProfileLink,
                                ResponseMessage: msg.userInfoDetails,
                                ResponseTime: Nowtime,
                                MessageSenderType: "last_default_message_time",
                                LocationDetails: LocationDetails.href,
                                autoresponder_id: 0
                            };
                            console.log("RESPONSE To Save  and Close With Link", setDefaultMessageSaveONEX);
                            // await chill(1000)
                            setTimeout(() => {
                                port.postMessage({ MessageDetails: setDefaultMessageSaveONEX, ConFlag: "STOREANDCLOSE" });
                            }, 1000)
                        }
                        if (msg.ConFlagBack == "AUTOMESSAGEBACK") {
                            // await chill(1000)

                            let Nowtime = $.now();
                            let setDefaultMessageSaveONEX = {
                                FacebookFirstName: msg.ThreadParams.FacebookFirstName,
                                FacebookLastName: msg.ThreadParams.FacebookLastName,
                                FacebookUserId: msg.ThreadParams.FacebookUserId,
                                FriendFacebookId: msg.ThreadParams.FriendFacebookId,
                                MfenevanId: msg.ThreadParams.MfenevanId,
                                ProfileLink: msg.ThreadParams.ProfileLink,
                                ResponseMessage: msg.userInfoDetails,
                                ResponseTime: Nowtime,
                                MessageSenderType: "last_contact_outgoing",
                                LocationDetails: LocationDetails.href,
                                autoresponder_id: msg.ThreadParams.autoresponder_id
                            };
                            // await chill(1000)
                            setTimeout(() => {

                                // console.log("RESPONSE To Save  and Close With Link",setDefaultMessageSaveONEX);
                                port.postMessage({ MessageDetails: setDefaultMessageSaveONEX, ConFlag: "STOREANDCLOSE" });
                            }, 1000)
                        }
                    }
                }, 1000)
            })
        }
    })


})

function createCaretPlacer(elem, collapse, atStart) {
    // console.log("called the function",elem  )
    var el = elem; // get the dom node of the given element
    if (el) {
        el.focus(); // focus to the element
        // feature test to see which methods to use for given browser
        if (
            typeof window.getSelection != "undefined" &&
            typeof document.createRange != "undefined"
        ) {
            // handle real browsers (not IE)
            var range = document.createRange(); // create a new range object
            range.selectNodeContents(el); // add the contents of the given element to the range
            if (collapse) range.collapse(atStart); // collapse the rage to either the first or last index based on "atStart" param
            var sel = window.getSelection(); // Returns a Selection object representing the range of text selected by the user or the current position of the caret.
            sel.removeAllRanges(); // removes all ranges from the selection, leaving the anchorNode and focusNode properties equal to null and leaving nothing selected.
            sel.addRange(range); // add the range we created to the selection effectively setting the cursor position
        } else if (typeof document.body.createTextRange != "undefined") {
            // handle IE
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            if (collapse) textRange.collapse(atStart);
            textRange.select();
        }
    }
}


const chill = (till) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("chill")
            resolve(true)
        }, till)
    })
}

async function paste(message) {
    console.log("pasting", message);
    var data = [new ClipboardItem({ "text/plain": new Blob([message], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(async () => {
        const text = await navigator.clipboard.readText();
        console.log("text ", text);
        await chill(1000)
        document.execCommand("paste");
        await chill(1000)
        const submit_btn = document.querySelector(`div[aria-label="Press enter to send"]`);
        console.log("btn : ", submit_btn);
        submit_btn.click();
    });
}