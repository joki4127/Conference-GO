function createCard(title, description, pictureUrl, start_date, end_date, location) {
    return `
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <h6 class = "card-subtitle">${location}</h6>
          <p class="card-text">${description}</p>
          <footer class = "card-footer">${start_date}-${end_date}</footer>
        </div>
      </div>
    `;
}
window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Figure out what to do when the response is bad
        window.alert("No valid response");
      } else {
        const data = await response.json();
        // const conference = data.conferences[0];
        // const nameTag = document.querySelector('.card-title');
        // nameTag.innerHTML = conference.name;
        for (let i = 0; i < data.conferences.length; i++){
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const start_date = new Date(details.conference.starts).toLocaleDateString();
                    const end_date = new Date (details.conference.ends).toLocaleDateString();
                    const location = details.conference.location.name;
                    const html = createCard(title, description, pictureUrl, start_date, end_date, location);
                    const column = document.querySelectorAll('.col');
                    column[i%3].innerHTML += html;
                    i++;
        
                    // const conferenceDetails = details.conference;
                    // const detailTag = document.querySelector('.card-text');
                    // detailTag.innerHTML = conferenceDetails.description;
                    // const imageTag = document.querySelector('.card-img-top');
                    // imageTag.src = details.conference.location.picture_url;
                }
            }
        }
      }
    } catch (e) {
      // Figure out what to do if an error is raised
      window.alert(e);
    }
});
