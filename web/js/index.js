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
            window.scrollTo({
                'behavior': 'smooth',
                'top': target.offsetTop
            })
        })
    })
}

/**
 * HTTP Request
 */
// 疫情統計
axios.get(`https://novel-coronavirus-2019.herokuapp.com/virus`)
    .then((response) => {
            var dataObject = response.data;
            // render DOM
            const confirmList = dataObject['confirm'];
            const deathList = dataObject['death'];
            const epidemicList = confirmList.concat(deathList);
            const numberDom = document.getElementsByClassName('number');
            
            for (let i = 0; i < 6; i += 1) {
                numberDom[i].innerHTML = `<span class="number-animate" data-end-value="${epidemicList[i].currentCount}" data-increment="1">0</span><br>${epidemicList[i].morethan}`;
            }
            // start animated
            initAnimated();
        },
        (error) => {
            var message = error.response.data.message;
            // start animated
            initAnimated();
        }
    );

    // 旅遊等級警示
    axios.get(`https://novel-coronavirus-2019.herokuapp.com/virus/countryEpidLevel`)
        .then((response) => {
                var dataObject = response.data[0].result;
                const list = document.getElementById('countryEpidLevel');
                console.log(dataObject)
                // render DOM
                for(let i=0;i<dataObject.length;i++){
                    console.log(dataObject[i]);
                    const item = document.createElement('tr');
                    item.innerHTML = `
                    <td> ${dataObject[i].region} </td> 
                    <td> ${dataObject[i].country} </td> 
                    <td> ${dataObject[i].level} </td>
                    <td > ${dataObject[i].updateTime} </td>
                        `;
                    list.appendChild(item);
                }
            },
            (error) => {
                var message = error.response.data.message;
            }
        );