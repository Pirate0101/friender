$(document).ready(function(){
    chrome.runtime.sendMessage({type: "OverlayTriggerIndividual", options: "MessageIndividual"});
    chrome.runtime.onMessage.addListener(async function(request, sender) {
        // console.log("req : ", request);
        if(request.type =="OverlayCreateProfile"){
            let UserFacebookUsername =  "";
            let UserFacebookName    =   "";
            let UserFacebookid  =   "";
            let UserFacebookImage   =   "";
            let UserLoggedInFacebook =  false;
            let NavItem =$("#globalContainer");
            let CheckCounter =0;
            let LocationDetails =window.location;
            let div=document.createElement("div");
            let textDiv =document.createElement("div");
            let imgURL = chrome.runtime.getURL(process.kyubi.logo.large_icon);
            let img = document.createElement("IMG");
            div.style.width= "100%";
            div.style.height= "100%";
            div.style.position= "absolute";
            div.style.zIndex = "10000";
            div.style.background= "rgba(235,239,242,0.85)";
            div.style.isplay= "flex";
            div.style.flexWrap= "wrap";
            div.style.alignContent= "center";
            div.style.justifyContent= "center";
            div.style.position = 'fixed';
            div.style.top = '0';
            div.style.left = '0';
            img.src = imgURL;
            img.style.position= "fixed";
            img.style.top= "50%";
            img.style.left= "50%";
            img.style.transform= "translate(-50%, -50%)";
            textDiv.innerHTML=process.kyubi.appName+" Is Using This Tab Please Don`t Close It";
            textDiv.style.top= "70%";
            textDiv.style.left= "27%";
            textDiv.style.position = 'fixed';
            textDiv.style.width= "100%";
            textDiv.style.fontSize="41px";
            textDiv.style.color= "#057ed9";
            div.appendChild(img);
            div.appendChild(textDiv);
            document.body.appendChild(div);


            if(NavItem){
                if(NavItem.length  !== 0){
                    CheckCounter =0;
                    UserLoggedInFacebook =  false;
                }else{
                    // NavItem.each( async function() {
                    //     let  name = $(this).text();
                    //     if(name === "Profile"){
                    //         CheckCounter =CheckCounter+1;
                    //     }
                    // })
                    const getProfileIntvl = setInterval(()=>{
                        const profilrNav = $('div[aria-label="Update profile picture"]');
                        // console.log("profilrNav :: ", profilrNav);
                        if(profilrNav.length)
                        {
                            clearInterval(getProfileIntvl);
                            CheckCounter =CheckCounter+1;
                        }
                        if(CheckCounter > 0){
                            UserLoggedInFacebook =  true;
                            UserFacebookid  =$('input[name=target]').val();
                            UserFacebookName = $("h1").text().split("(")[0].includes("Messenger")?$("h1").text().split("(")[0].split("Messenger")[1]:$("h1").text().split("(")[0];
                            // console.log("name : ", UserFacebookName);
                            if(window.location.href.includes("profile.php?")){
                                UserFacebookUsername = window.location.href.split("id=")[1];
                            }
                            else{
                                UserFacebookUsername = window.location.href.split("/");
                                UserFacebookUsername = UserFacebookUsername[UserFacebookUsername.length-1];
                            }

                            // console.log("name : ", name.split("Messanger")[1]);
                    //     let FormBox = $('#mbasic_inline_feed_composer').find('form').find('table').find('tbody').find('tr');
                    //     // console.log("I Got THIS Table ",FormBox);
                    //     FormBox.each(async function(i){
                    //         if(i === 0){
                    //             let UserURL =$(this).find('td').find('div').find('a').attr('href');
                    //             let UserURLNo = UserURL.split('/');
                    //             let UserURLMo = UserURLNo[1].split('?');
                    //             UserFacebookUsername = UserURLMo[0];
                    //             let Name    =   $(this).find('td').find('div').find('a').find('img').attr('alt');
                    //             let finame = Name.split(',');
                    //             UserFacebookName  = finame[0];
                    //             UserFacebookImage   =   $(this).find('td').find('div').find('a').find('img').attr('src');  
                    //         }
                            
                    //     })
                    
                    }else{
                        UserLoggedInFacebook =  false;
                    }
                    },500)
                }
            }else{
                UserLoggedInFacebook =  false;
            }

            let parameters={
                // FacebookId : UserFacebookid,
                FacebookUsername : UserFacebookUsername,
                FacebookName : UserFacebookName,
                FacebookImage  : UserFacebookImage,
                LoggedInFacebook  : UserLoggedInFacebook
            }
            // console.log(parameters);
            // chrome.runtime.sendMessage({type: "storeUserInfoOrQueryThenStore", options: parameters});
        }

    });

});