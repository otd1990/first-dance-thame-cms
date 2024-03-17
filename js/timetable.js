function fetchTimetable() {
  const PROJECT_ID = 'c7jd3ho8'
  const DATASET = 'production'
  const QUERY = encodeURIComponent('*[_type == "timetable"]')

  const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`

  fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
      }
      return res.json()
    })
    .then((response) => {
      const timetableData = extractTimetableData(response)
      const sortedTimetableData = sortTimetableData(timetableData)
      displayTimetable(sortedTimetableData)
    })
    .catch((error) => {
      console.error('An error occurred while fetching timetable:', error)
    })
}

function extractTimetableData(response) {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const timetableData = {}

  daysOfWeek.forEach((day) => {
    if (response.result[0]?.[day]) {
      timetableData[day] = response.result[0][day]
    }
  })

  return timetableData
}

function sortTimetableData(timetableData) {
  const dayOrder = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  }

  const sortedTimetableData = Object.entries(timetableData)
    .sort(([dayA], [dayB]) => dayOrder[dayA] - dayOrder[dayB])
    .reduce((acc, [day, data]) => {
      acc[day] = data
      return acc
    }, {})

  return sortedTimetableData
}

function displayTimetable(timetableData) {
  const timetableDataElement = document.getElementById('timetableData')

  const tableContent = Object.keys(timetableData)
    .map((key, index) => {
      return `
      <div class="col-12 col-md-4 timetable__data__item">
        <span class="timetable__header__sm d-block">${key.toUpperCase()}</span>
        ${timetableData[key]
          .map((item, index) => {
            return `
            <p><strong>${item.time}: </strong>${item.className}</p>
          `
          })
          .join('')}
      </div>
    `
    })
    .join('')

  timetableDataElement.insertAdjacentHTML('afterbegin', tableContent)
}

// Call the fetchTimetable function to initiate the process
fetchTimetable()
