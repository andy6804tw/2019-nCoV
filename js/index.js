/**
 * <a> link hook with smooth Scrolling
 */
arr = ["section-number", "section-map"]
var applyScrolling = function (arr, cb) {
    for (var i = 0; i < arr.length; i++) {
        cb.call(null, i, arr[i])
    }
}
// process multiple hook by id
var anchors = document.querySelectorAll("a[href^='#section']")
if (window.scrollTo) {
    applyScrolling(anchors, function (index, el) {
        var target = document.getElementById(el.getAttribute('href').substring(1))
        el.addEventListener('click', function (e) {
            e.preventDefault()
            window.scrollTo({ 'behavior': 'smooth', 'top': target.offsetTop })
        })
    })
}