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
            // render DOM
            for (let i = 0; i < dataObject.length; i++) {
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

// 旅遊等級警示
axios.get(`https://api.coronatracker.com/news/trending?limit=5&offset=0&countryCode=&country=&language=zh_TW`)
    .then((response) => {
            var dataObject = response.data.items;
            const newsItem = document.getElementById('newsItem');
            console.log(dataObject)
            for(let i=0;i<dataObject.length;i++){
                const postTime = moment.utc(dataObject[i].publishedAt).local().format('YYYY-MM-DD HH:mm:ss');
                console.log(postTime);
                const item = document.createElement('a');
                item.classList = 'card col-12 my-3';
                item.href = dataObject[i].url;
                item.target='_blank';
                item.innerHTML = `
                    <div class="row py-4">
                    <div class="card-image col-2 text-center">
                        <img src="${dataObject[i].urlToImage}" alt="" style="width: 80%;">
                    </div>
                    <div class="col-9">
                        <h5>${dataObject[i].title}</h5>
                        <p>
                        ${dataObject[i].description}
                        </p>
                        <div class="text-right">${postTime}</div>
                    </div>
                    </div>
                        `;
                newsItem.appendChild(item);
                console.log(i)
            }
        },
        (error) => {
            var message = error.response.data.message;
        }
    );
