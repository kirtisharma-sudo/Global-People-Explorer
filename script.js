const userContainer = document.getElementById("user");
const loader = document.getElementById("loader");
const button = document.getElementById("generateBtn");

const profilePic = document.getElementById("profilePic");
const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const phoneElement = document.getElementById("phone");
const locationElement = document.getElementById("location");
const ageElement = document.getElementById("age");
const genderElement = document.getElementById("gender");
const counterElement = document.getElementById("count");

let profileCount = localStorage.getItem("profileCount") || 0;
counterElement.textContent = profileCount;

async function generateUser() {

    loader.classList.remove("hidden");
    userContainer.style.display = "none";

    button.disabled = true;
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;

    try {

        const response = await fetch("https://randomuser.me/api/");

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        const user = data.results[0];


        const fullName =
            `${user.name.title} ${user.name.first} ${user.name.last}`;

        const email = user.email;

        const phone = user.phone;

        const location =
            `${user.location.city}, ${user.location.country}`;

        const age =
            `${user.dob.age} Years`;

        const gender =
            user.gender.charAt(0).toUpperCase() +
            user.gender.slice(1);

        const image =
            user.picture.large;

        setTimeout(() => {

            profilePic.src = image;
            nameElement.textContent = fullName;
            emailElement.textContent = email;
            phoneElement.textContent = phone;
            locationElement.textContent = location;
            ageElement.textContent = age;
            genderElement.textContent = gender;

            loader.classList.add("hidden");

            userContainer.style.display = "block";

            userContainer.classList.remove("fade");
            void userContainer.offsetWidth;
            userContainer.classList.add("fade");

            profileCount++;
            localStorage.setItem("profileCount", profileCount);

            counterElement.textContent = profileCount;

            button.disabled = false;
            button.innerHTML =
                `<i class="fa-solid fa-arrows-rotate"></i> Generate Another User`;

        }, 700);

    }

    catch (error) {

        loader.classList.add("hidden");

        userContainer.style.display = "block";

        userContainer.innerHTML = `
        <div style="padding:25px;">
            <h2>Something went wrong</h2>
            <p>Please check your internet connection and try again.</p>
        </div>
        `;

        button.disabled = false;
        button.innerHTML =
            `<i class="fa-solid fa-user-plus"></i> Try Again`;
        console.error(error);
    }
}

window.onload = generateUser;
