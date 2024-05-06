window.addEventListener("scroll", function () {
  var scrollY = window.scrollY || window.pageYOffset;
  var container = document.querySelector(".carousel-container");
  let factor = 0.5; //speed to scroll
  console.log(factor);
  container.scrollLeft = scrollY / factor; //
});

// Get the anchor element by its ID
var anchorElement = document.getElementById("hero-cta-link");

// Get the div element inside the anchor element
var divElement = anchorElement.querySelector("#hero-cta");

// Define an array of data with href and text
var data = [
  { href: "bond.html", text: "Bonds" },
  { href: "mutual-fund.html", text: "Mutual Funds" },
  { href: "fixed-deposit.html", text: "Fixed Deposits" },
  { href: "provident-fund.html", text: "Provident Funds" },
  // Add more data as needed
];

// Initialize index to 0
var index = 0;

// Function to update href and text
function updateContent() {
  // Update the href attribute of the anchor element
  anchorElement.href = data[index].href;
  // Update the text content of the div element
  divElement.textContent = data[index].text;
  // Increment index or reset to 0 if at the end of the array
  index = (index + 1) % data.length;
}

// Call the function initially
updateContent();

// Set interval to call the function repeatedly
setInterval(updateContent, 2000); // Change 2000 to desired interval in milliseconds
