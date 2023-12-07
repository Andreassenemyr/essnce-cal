document.addEventListener('DOMContentLoaded', (event) => {
    const smallContainer = document.querySelector('.grid-container-calendar-small');
    const bigContainer = document.querySelector('.grid-container-calendar-big');
    let jsonURL;
    let container;
  
    if (smallContainer) {
      jsonURL = 'https://raw.githubusercontent.com/Andreassenemyr/essnce-cal/main/calendar_small.json';
      container = smallContainer;
    } else if (bigContainer) {
      jsonURL = 'https://raw.githubusercontent.com/Andreassenemyr/essnce-cal/main/calendar_big.json';
      container = bigContainer;
    }
  
    if (jsonURL) {
      fetch(jsonURL)
        .then(response => response.json())
        .then(data => {
          generateCalendar(data, container); // Pass the relevant container to the generateCalendar function
        })
        .catch(error => console.error('Error fetching the JSON:', error));
    } else {
      console.error('Neither small nor big container found.');
    }
  
    function generateCalendar(data, container) {
      const days = data.days;
      const today = new Date();
      const currentDay = today.getDate();
  
      for (const [id, day] of Object.entries(days)) {
        const div = document.createElement('div');
        div.classList.add(`calendar-${id}`);
  
        const doorDiv = document.createElement('div');
        doorDiv.classList.add('door');
  
        if (parseInt(id) <= currentDay) {
          doorDiv.classList.add('available');
        }
  
        doorDiv.innerHTML = `
          <div class="calendar-number">${id}</div>
        `;
  
        div.innerHTML = `
          <div class="backDoor ">
            ${doorDiv.outerHTML}
            <div class="backDoor-info">
              <div class="name">
                <span>${day.name}</span>
              </div>
              <div class="inspo">
                <span>Inspirerad av<br>${day.inspo}</span>
              </div>
              <div class="scent-notes">
                <span>${day.top}<br>${day.hart}<br>${day.base}</span>
              </div>
              <a href="${day.link}" class="modal-link" target="_blank">Läs mer här</a>
            </div>
          </div>
        `;
        container.appendChild(div);
  
        const backDoorDiv = div.querySelector('.backDoor');
  
        if (parseInt(id) === currentDay) {
          backDoorDiv.classList.add('today');
        }
  
        const door = div.querySelector('.door');
        door.addEventListener("click", function () {
          if (this.classList.contains("available")) {
            this.classList.toggle("doorOpen");
            launchConfetti();
          } else {
            alert("Man får inte fuska och öppna luckan i förväg 🙈 kom tillbaka imorgon så kan du se vad som döljer sig bakom denna luckan 💞");
          }
        });
      }
    }
  
    function launchConfetti() {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ['🎄', '🎅🏽', '☃️', '❄️'],
        emojiSize: 240,
        confettiNumber: 20,
        origin: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 1
        }
      });
    }
  });
  