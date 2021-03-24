const form = document.querySelector('#searchForm');
const container = document.querySelector('#container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    console.log(res.data[0].show);
    container.innerHTML = "";
    makeShowCards(res.data)
    form.elements.query.value = '';
})

const makeShowCards = (shows) => {
    for (let result of shows) {
        //Create a container div
        const div = document.createElement('div');
        div.classList.add('show')

        //Add the Name as an h1
        const h1 = document.createElement('h1');
        h1.classList.add('title');
        h1.textContent = result.show.name;
        div.append(h1)


        //Check for an image
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            div.append(img)
        } else {
            const p = document.createElement('p');
            p.textContent = 'There is no image for this show'
            div.append(p)
        }
        //Create a summary Element
        const summary = document.createElement('span')
        summary.classList.add('summary')
        summary.append("Summary:")
        //Truncate the summary to 'X' characters
        if (result.show.summary != null && result.show.summary != undefined) {
            let sumArr = result.show.summary.split("");
            let newSum = [];
            if (sumArr.length > 200) {
                for (let i = 0; i < 200; i++) {

                    newSum += sumArr[i]
                }
                summary.innerHTML += newSum + "...</p>";
            } else if (sumArr.length == 0) {
                summary.innerHTML += "No summary provided"
            } else {
                for (let i = 0; i < sumArr.length; i++) {
                    newSum += sumArr[i]
                }
                summary.innerHTML += newSum + "</p>";
            }


        }


        //Genres
        summary.innerHTML += "<p>Genres: </p>"
        //Loop through the potential genres sent from the API
        if (result.show.genres.length > 0) {
            for (let i = 0; i < result.show.genres.length; i++) {
                summary.innerHTML += result.show.genres[i]
                if (i < result.show.genres.length - 1) {
                    summary.innerHTML += ", "
                }

            }
        } else {
            summary.innerHTML += "N/A"
        }


        div.append(summary);

        container.append(div)
    }



}