"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieselect = document.getElementById("movie");

let ticketprice = +movieselect.value;
populateui();

function setmoviedata(selectedindex, value) {
  localStorage.setItem("selectedmovie", selectedindex);
  localStorage.setItem("selectedmovieprice", value);
}

function updateselectedcount() {
  const selected = document.querySelectorAll(".selected");

  const count1 = [...selected].map((s) => [...seats].indexOf(s));

  localStorage.setItem("selectedcount", JSON.stringify(count1));
  const selectedseats = JSON.parse(localStorage.getItem("selectedcount"));

  count.innerText = selectedseats.length;
  total.innerText = selectedseats.length * ticketprice;
}

function populateui() {
  const selectedseats = JSON.parse(localStorage.getItem("selectedcount"));
  if (selectedseats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedseats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedmovieindex = localStorage.getItem("selectedmovie");
  if (selectedmovieindex !== null) {
    movieselect.selectedIndex = selectedmovieindex;
  }
}

movieselect.addEventListener("change", (e) => {
  ticketprice = e.target.value;
  //console.log(e.target.selectedIndex);
  setmoviedata(e.target.selectedIndex, e.target.value);
  updateselectedcount();
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateselectedcount();
});

updateselectedcount();
