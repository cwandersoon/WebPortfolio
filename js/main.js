// WEATHER WIDGET
const WEATHER_API_KEY = "f9ee8e442d487ddb429ecace45215cc6";

document.addEventListener("DOMContentLoaded", () => {

  const widget = document.getElementById("weatherWidget");

  if (!widget) return;

  const city = widget.dataset.city || "Gothenburg";
  const units = widget.dataset.units || "metric";

  widget.addEventListener("click", () => {
    const isOpen = widget.getAttribute("aria-expanded") === "true";
    widget.setAttribute("aria-expanded", !isOpen);
    widget.setAttribute(
      "aria-label",
      isOpen ? "Show weather details" : "Hide weather details"
    );
  });

  fetchWeather(widget, city, units);
});


async function fetchWeather(widget, city, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather`
            + `?q=${encodeURIComponent(city)}`
            + `&units=${units}`
            + `&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();

    showWeather(widget, data, units);

  } catch (error) {
    console.error("Weather fetch failed:", error);
    noWeather(widget);
  }
}


function showWeather(widget, data, units) {
  const temp = Math.round(data.main.temp);
  const unitSymbol = units === "metric" ? "°C" : "°F";
  const iconClass = iconToBootstrap(data.weather[0].icon);

  widget.innerHTML = `
    <i class="bi ${iconClass} pf-weather-icon" aria-hidden="true"></i>
    <span class="pf-weather-details ms-2 ms-sm-3 gap-2 align-items-center justify-content-center">
      <span class="pf-weather-temp">${temp}${unitSymbol}</span>
      <span class="pf-weather-city">${data.name}</span>
    </span>
  `;
}


function noWeather(widget) {
  widget.innerHTML = `
    <i class="bi bi-cloud pf-no-weather" aria-hidden="true" title="Weather data unavailable"></i>
  `;
}


function iconToBootstrap(owmCode) {
  const code = owmCode.substring(0, 2);

  const map = {
    "01": "bi-sun-fill",
    "02": "bi-cloud-sun-fill",
    "03": "bi-cloud-fill",
    "04": "bi-clouds-fill",
    "09": "bi-cloud-drizzle-fill",
    "10": "bi-cloud-rain-fill",
    "11": "bi-cloud-lightning-fill",
    "13": "bi-cloud-snow-fill",
    "50": "bi-cloud-haze-fill"
  };

  return map[code] || "bi-cloud";
}

// NAVBAR  
const header = document.querySelector(".pf-header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY < 50) {
    header.classList.remove("pf-header-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY) {
    header.classList.add("pf-header-hidden");
  } else {
    header.classList.remove("pf-header-hidden");
  }

  lastScrollY = currentScrollY;
});

const navLinks = document.querySelectorAll(".pf-nav-link");
const navMenu = document.getElementById("navMenu");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) {
      const collapse = bootstrap.Collapse.getInstance(navMenu)
                    || new bootstrap.Collapse(navMenu, { toggle: false });
      collapse.hide();
    }
  });
});

// CONTACT FORM – Formspree
const contactForm = document.querySelector(".pf-contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitBtn = contactForm.querySelector("[type='submit']");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      document.getElementById("contactFormWrapper").hidden = true;
      document.getElementById("contactSuccess").hidden = false;

      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
        console.error("Form submission failed:", error);
        document.getElementById("contactError").hidden = false;
      } 
  });

  const resetBtn = document.getElementById("contactReset");

    if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        contactForm.reset();

        const submitBtn = contactForm.querySelector("[type='submit']");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";

        document.getElementById("contactSuccess").hidden = true;
        document.getElementById("contactFormWrapper").hidden = false;

        contactForm.querySelector("input").focus();
    });
    }
}