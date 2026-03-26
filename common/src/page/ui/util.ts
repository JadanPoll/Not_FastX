export function getHtml (url, baseHref = '') {
    return new Promise ((resolve, reject) => {
        let config = {
            credentials: 'include'
        } as RequestInit;
        let req = new Request ([baseHref, url].join ('/'), config);
        fetch (req).then (res => res.ok ? resolve (res.text ()) : reject ({ error: { name: res.status, message: res.statusText }}))
    })
}

export function loadTheme (url) {
    let l = document.createElement ('link');
    l.rel = 'stylesheet';
    l.href = url;
    document.getElementsByTagName('head')[0].appendChild (l);
}