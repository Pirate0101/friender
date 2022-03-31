// console.log("I am new worker js")
let notifviewURL = null;

const changeStatusFn = async (data) => {
    // console.log("came to changeStatusFn")
    // console.log("notifviewURL : ", notifviewURL)
    return new Promise(async (resolve, reject) => {
        try {
            const notifResp = await fetch(notifviewURL, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept' : 'application/json'
                }
              })
              resolve(notifResp)
            // console.log("notifResp changeStatusFn : ", notifResp)
        } catch(e) {
            resolve(notifResp)
            // console.log("err oo :: ", e)
        }
    })
}

self.addEventListener('push', async (e) => {
    
    const data = e.data.json()
    
    // console.log("data.data :: ", data.data)
    notifviewURL = data.data.notifviewURL
    
    e.waitUntil(
        changeStatusFn(data.data).then((resp) => {
            // console.log("resp fetched :: ", resp)
            return self.registration.showNotification(data.title, data)
        })
    );

    
    self.addEventListener('notificationclick', function(event) {
        let url = data.data.url
        event.notification.close(); // Android needs explicit close.
        event.waitUntil(
            clients.matchAll({type: 'window'}).then( windowClients => {
                // Check if there is already a window/tab open with the target URL
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    // If so, just focus it.
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not, then open the target URL in a new window/tab.
                if (clients.openWindow) {
                    // console.log("open window")
                    return clients.openWindow(url);
                }
            })
        );
    });
})