
let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("user-input");
const inputBtn = document.getElementById("save-button");
const ulEl = document.getElementById("ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads") );
const deleteBtn = document.getElementById("delete-btn");

const tabBtn = document.querySelector("#tab-btn");

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads);
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads" , JSON.stringify(myLeads) );
    render(myLeads);
})

tabBtn.addEventListener("click" ,function(){
    chrome.tabs.query({active: true, currentWindow: true} ,function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads" , JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

