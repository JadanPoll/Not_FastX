export function load (name = '') {
    return fail (name + ' data', 'load')
}
export function save (name = '') {
    return fail (name + ' data', 'save')
}
export function message (e) {
    return [e.message, '[',e.name,']'].join (' ')
}
export function error (name = '') {
    return [name, "Error"].join (' ');
}
export function fail (object, action) {
    return ["Failed", "to", action, object].join (' ')
}