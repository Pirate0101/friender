import makeParsable from "./helper/makeParseable";

const fbAPiURLs = {
    routeDefinition: `${fbAPIHostname}/ajax/route-definition/`,
    bulkRouteDefinition: `${fbAPIHostname}/ajax/bulk-route-definitions/`,
    businessPage: `${businessfbAPIHostname}/creatorstudio/home`,
    loggedUserData: `${mfbAPIHostname}/composer/ocelot/async_loader/?publisher=feed`
};

/**
 * Get dtsg, suggestions, UserFacebookid, UserFacebookUsername, UserFacebookName, UserFacebookImage, UserLoggedInFacebook
 * @param {*} data 
 * @param {*} callback 
 * @param {*} responseBack 
 * @param {*} saveToStorage 
 */
export const fbDtsg = (data, callback = null, responseBack = null) => {
    fetch(fbAPiURLs.loggedUserData, {
        method: "GET",
    })
        .then((e) => e.text())
        .then((e) => {
            let sugest, dtsg, UserFacebookUsername = "", UserFacebookName = "", UserFacebookid = "", UserFacebookImage = "", UserLoggedInFacebook = false;
            const regex3 = /\\"suggestions\\":\[\{[^}]*\}/gm;
            const regex4 = /\\"dtsg\\":\{[^}]*\}/gm;
            if (e.match(regex4) != null) {
                dtsg = e.match(regex4)[0];
                dtsg = "{" + dtsg.replace(/[\\]/g, "") + "}";
                dtsg = JSON.parse(dtsg).dtsg;
            }
            let parameters = {};
            if (regex3.test(e)) {
                sugest = e.match(regex3)[0];
                sugest = "{" + sugest.replace(/[\\]/g, "") + "]}"
                sugest = JSON.parse(sugest).suggestions[0]
                console.log("sugest in login helper", sugest);
                let userName = sugest.path.includes("profile.php") ? sugest.uid : sugest.path.replace('/', '');
                UserFacebookid = sugest.uid;
                UserFacebookUsername = userName;
                UserFacebookName = sugest.text;
                UserFacebookImage = sugest.photo;
                UserLoggedInFacebook = true;
                parameters = {
                    FacebookId: UserFacebookid,
                    FacebookUsername: UserFacebookUsername,
                    FacebookName: UserFacebookName,
                    FacebookImage: UserFacebookImage,
                    LoggedInFacebook: UserLoggedInFacebook,
                    dtsg: dtsg
                }
            } else {
                UserLoggedInFacebook = false;
                parameters = {
                    FacebookId: UserFacebookid,
                    FacebookUsername: UserFacebookUsername,
                    FacebookName: UserFacebookName,
                    FacebookImage: UserFacebookImage,
                    LoggedInFacebook: UserLoggedInFacebook,
                    dtsg: dtsg
                }
            }
            if (typeof callback === "function") {
                callback({ data, dtsg, sugest, parameters });
            } else {
                return { data, dtsg, sugest, parameters };
            }
        })
        .catch(() => {
            if (callback) {
                callback(data, null, responseBack);
            }
        });
};

/**
 * Get access token from facebook
 * @param {*} data 
 * @param {*} callback 
 * @param {*} responseBack
 */
export const fbAccessToken = (callback = null) => {
    fetch(fbAPiURLs.businessPage, {
        method: "GET",
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "authority": "business.facebook.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "text/html,application/json"
        }
    })
        .then((e) => e.text())
        .then((e) => {
            const match = e.match(/"userAccessToken":"(.*?)"/);
            if (match && Array.isArray(match)) {
                let accessToken = match[1];
                callback(accessToken, match);
            }
        })
        .catch(() => {
            if (callback) {
                callback(null);
            }
        });
};

/**
 * Gets information of facebook URL
 * @param {*} dtsg 
 * @param {*} path 
 * @param {*} loggedUserId 
 * @param {*} responseBack 
 */
export const fbGrabRouteData = async (dtsg, path, loggedUserId, responseBack = null) => {
    var form = new FormData();
    form.append("fb_dtsg", dtsg);
    form.append("route_url", path);
    form.append("client_previous_actor_id", loggedUserId);
    form.append("__user", loggedUserId);
    form.append("routing_namespace", "fb_comet");
    form.append("__comet_req", 1);
    form.append("__a", 1);
    form.append("dpr", 1);
    fetch(fbAPiURLs.routeDefinition, {
        body: form,
        headers: {
            accept: "application/json, text/plain, */*",
        },
        method: "POST",
    })
        .then((e) => e.text())
        .then((data) => {
            let parsedData = makeParsable(data, true);
            if (typeof responseBack === "function") {
                responseBack({ text: parsedData.length ? parsedData[0] : "", parseAble: parsedData }, userId);
            } else {
                return { text: parsedData.length ? parsedData[0] : "", parseAble: makeParsable(data), userId };
            }
        });
};

/**
 * Gets information of facebook URL multiple
 * @param {*} dtsg 
 * @param {*} paths  Array
 * @param {*} loggedUserId 
 * @param {*} responseBack 
 */
export const fbGrabRouteMultiData = async (dtsg, paths, loggedUserId, responseBack = null) => {
    var form = new FormData();
    form.append("fb_dtsg", dtsg);
    paths.forEach((path, index) => {
        form.append(`route_urls[${index}]`, path);
    });
    form.append("client_previous_actor_id", loggedUserId);
    form.append("__user", loggedUserId);
    form.append("routing_namespace", "fb_comet");
    form.append("__comet_req", 1);
    form.append("__a", 1);
    form.append("dpr", 1);
    fetch(fbAPiURLs.routeDefinition, {
        body: form,
        headers: {
            accept: "application/json, text/plain, */*",
        },
        method: "POST",
    })
        .then((e) => e.text())
        .then((data) => {
            let parsedData = makeParsable(data, true);
            if (typeof responseBack === "function") {
                responseBack({ text: parsedData.length ? parsedData[0] : "", parseAble: parsedData }, userId);
            } else {
                return { text: parsedData.length ? parsedData[0] : "", parseAble: makeParsable(data), userId };
            }
        });
};

export const aboutUs = (paths, callback = null) => {
    fbDtsg(null, (data) => {
        fbGrabRouteMultiData(data.dtsg, paths, data.parameters.FacebookId, (routeDef) => {
            // "/beta.vaughan.7/about_overview"
            // "/beta.vaughan.7/about_work_and_education"
            // "/beta.vaughan.7/about_places"
            // "/beta.vaughan.7/about_contact_and_basic_info"
            // "/beta.vaughan.7/about_family_and_relationships"
            // "/beta.vaughan.7/about_details"
            // "/beta.vaughan.7/about_life_events"
            // routeDef -> payload -> payloads -> "path" -> result -> exports -> hostableView -> props -> ...
            // OR
            // routeDef -> payload -> payloads -> "path" -> result -> exports -> rootView -> props -> ...
            /*
            * collectionToken
            * rawSectionToken
            * sectionToken
            * userID - 100049898284447
            * userVanity - beta.vaughan.7
            * viewerID - 100064621826160
            */

            /**
                var loggedInUserId = "100064621826160";
                var userIDForAboutUsPage = "100067189421485";
                var commonNumber = `2327158227`;
                var collectionToken = btoa(`app_collection:${userIDForAboutUsPage}:${commonNumber}:201`);
                var appSection = btoa(`app_section:${userIDForAboutUsPage}:${commonNumber}`);
                var rawSectionToken = `AQHRuIjHovXd4m5WB3YGqcZbzDKxaVkJukbZuPxInY4uz7segydC5AB5aZCjreLE6KvZ1peaiKx5cqSfg5qfpnNi6TC5MsLgWl628tYu3Qs_Rj0`;
                var appSectionFeedKey = `ProfileCometAppSectionFeed_timeline_nav_app_sections__${rawSectionToken}`

                var variables = {"collectionToken": collectionToken, appSectionFeedKey: appSectionFeedKey, rawSectionToken: rawSectionToken, "pageID": userIDForAboutUsPage, "scale": 1, "sectionToken": "YXBwX3NlY3Rpb246MTAwMDY3MTg5NDIxNDg1OjIzMjcxNTgyMjc=", "showReactions": true, "userID": userIDForAboutUsPage }

                var data = {
                    __a: "1",
                    fb_dtsg: "AQHGSJUISojlUdA:28:1650440610",
                    fb_api_caller_class: "RelayModern",
                    fb_api_req_friendly_name: "ProfileCometAboutAppSectionQuery",
                    variables: JSON.stringify(variables),
                    doc_id: "5018835244901653",
                };

                var serialize = function (obj) {
                    var str = [];
                    for (var p in obj)
                        if (obj.hasOwnProperty(p)) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                    return str.join("&");
                };

                var a = await fetch("https://www.facebook.com/api/graphql/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "text/html,application/json",
                        "x-fb-friendly-name": "ProfileCometAboutAppSectionQuery",
                    },
                    body: serialize(data),
                });
                await a.text();
             */
        });
    });
    // overview

    // work & education

    // places lived

    // contact and basic info

    // family and relationships

    // details

    // life events
}