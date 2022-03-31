const { GetData } = require("../helper/helper");
// const helper = require("../helper/helper")

$(document).ready(function () {
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
      // let WindowURL=window.location.search;
      var LocationDetails = window.location;
      // let newWindowURL=WindowURL.replace('?tid=cid.c.', ' ');
      // newWindowURL=newWindowURL.replace('?tid=cid.g.', ' ');
      let reslinksplit = window.location.href.split("/");
      let FacebookIdString = reslinksplit[reslinksplit.length - 2];
      const mbasicAccount = $('input[name="query"]');
      // console.log("mbasicAccount : ", mbasicAccount);

      if (mbasicAccount.length) {
        // if(1===2){
        // console.log("hiiiiii, i have logged in as m facebook");
        if ($("#messageGroup  > div").length > 0) {
          let valll = $("#messageGroup  > div").last().find(' > div').length;
          let newel = $("#messageGroup  > div").last().find(' > div:nth-child(' + valll + ')').html();
          let divlet = $("#messageGroup  > div").last().find(' > div:nth-child(' + valll + ')').find(' > div:nth-child(' + 1 + ')').length;
          let divlethtml = $("#messageGroup  > div").last().find(' > div:nth-child(' + valll + ')').find(' > div:nth-child(' + 1 + ')').html();

          let lengthv = $("#messageGroup  > div").length;
          if (divlet != 0) {
            let ProfileLink = $("#messageGroup  > div").last().find(' > div:nth-child(' + valll + ')').find(' > div:nth-child(' + 1 + ')').children('a').attr("href");
            let Name = $("#messageGroup  > div").last().find(' > div:nth-child(' + valll + ')').find(' > div:nth-child(' + 1 + ')').children('a').children('strong').html();
            let ProfileName = Name && Name.trim();
            let content = " ";
            $("#messageGroup  > div").last().find(' > div:nth-child(' + valll + ')').find(' > div:nth-child(' + 1 + ')').find('div').find('span').each(async function (ThisCountElem) {
              content = content + " " + $(this).html() + " ";
            });
            let MessageDetails = {
              profile_name: ProfileName,
              message_content: content,
              facebook_Id: FacebookIdString,
              location_details: LocationDetails.href,
              ProfileLink: ProfileLink
            }

            // console.log("This Is I am Sending",MessageDetails);
            port.postMessage({ MessageDetails: MessageDetails, ConFlag: "CheckMessageContent" });
          } else {
            //console.log("Clear the CheckMessageREAD")
          }

        } else {
          ////console.log("Clear the CheckMessageREAD")
        }
      } else {
        // console.log("hi, I have blocked from m fb.. opening www.FB");
        const fbthread = await GetData('fbthread');
        console.log('fbthread : ', fbthread);
        chrome.storage.local.set({ "tabInfo": { "isBlocked": true, tabId: fbthread } })
      }
      port.onMessage.addListener(async function (msg) {
        // console.log("This is the Request  From CCCCCCCCCCCCCCCCCCCCCC",msg)
        const mbasicAccount = $('input[name="query"]');
        // console.log("mbasicAccount : ", mbasicAccount);

        if (msg.ConFlagBack == "DEFAULTMESSAGEBACK") {
          $('#composerInput').val(msg.userInfoDetails);
          $("#composer_form").submit();

          //console.log("RESPONSE To USER With Default Message",msg.userInfoDetails);
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
          // chrome.storage.local.set({"isMessageSend":false})

          // console.log("RESPONSE To Save  and Close With Link",setDefaultMessageSaveONEX);
          port.postMessage({ MessageDetails: setDefaultMessageSaveONEX, ConFlag: "STOREANDCLOSE" });
        }
        if (msg.ConFlagBack == "AUTOMESSAGEBACK") {
          $('#composerInput').val(msg.userInfoDetails);
          $("#composer_form").submit();
          // console.log("RESPONSE To USER With AutoResponder Message",msg.userInfoDetails);
          // chrome.storage.local.set({"isMessageSend":false})

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
          // console.log("RESPONSE To Save  and Close With Link",setDefaultMessageSaveONEX);
          port.postMessage({ MessageDetails: setDefaultMessageSaveONEX, ConFlag: "STOREANDCLOSE" });
        }
      })
    }
  })


})