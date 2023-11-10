/* --------------- Calendar ------------------ */

let calendar = document.querySelector('.calendar')

const month_names = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (month > 11 || month < 0) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

/* ---------------------- MEMO ----------------------------- */
 /* save memo as draft */
 function save(){
    var Name;
    var Item;
    if(document.getElementById("title")){
        Name = document.getElementById("title").value;
    } else {
        Name = document.getElementById("result-name").value;
    }
    if(document.getElementById("content")){
        Item = document.getElementById("content").value;
    } else {
        Item = document.getElementById("result").value;
    }
    localStorage.setItem("storedName", Name);
    localStorage.setItem("storedItem", Item);
    window.alert("Draft Save ✅");
}

/* delete saved memo */
function deleteLog(){
    localStorage.clear();
    window.alert("Draft Deleted ✅");
    location.reload();
}

/* save memo to file functions */
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
var hour = today.getHours();
var min = today.getMinutes();
var seconds = today.getSeconds();

if(dd<10) {
    dd='0'+dd
    } 

if(mm<10) {
    mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;

time = hour+':'+min+':'+seconds;

function saveFormAsTextFile()
    // Based on https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
    {
    var username;
    var usercontent;

    if(document.getElementById("title") != null){
        username = document.getElementById("title").value;
    } else {
        username = localStorage.getItem("storedName");
    }
    if(document.getElementById("content") != null){
        usercontent = document.getElementById("content").value;
    }else{
        usercontent = localStorage.getItem("storedItem");
    }


    var textToSave =
        '---\n'+
        'Name: ' + username + '\n' + // =title
        'Date: ' + today + '\n' +// =date - automatically puts today's date =todo: fix bug allowing going over 60 seconds, i.e. 61 seconds
        'Time: ' + time + '\n' + 
        '---\n' + 
        usercontent // =content;

    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function destroyClickedElement(event){
    document.body.removeChild(event.target);
}