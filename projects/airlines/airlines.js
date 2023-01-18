let flights = [
  { id: 00, to: "Bilbao", from: "Barcelona", cost: 1600, scale: false },
  { id: 01, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 02, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 03, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 04, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 05, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 06, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 07, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 08, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 09, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

let dataOk = true;

function welcome() {
  console.log("***********************************");
  const user = prompt("Please,enter your name ");
  if (!user) {
    alert("Enter a valid name");
    welcome();
  } else {
    console.log(`Welcome to Isdi Airlines ${user}`);
  }
}

function showFlights(avaibleFlights = flights) {
  console.log("***********************************");
  avaibleFlights
    ? console.log(`The result of your search is : `)
    : `These are our avaible flights`;
  avaibleFlights.forEach((element) => {
    element.scale
      ? console.log(
          `flight from ${element.from} and destination ${element.to} cost ${element.cost}€ has stop`
        )
      : console.log(
          `flight from ${element.from} and destination ${element.to} cost ${element.cost}€ has no stop`
        );
  });
}

function showPriceAverage() {
  let totalPrice = 0;
  let flightsWithStop = 0;
  flights.forEach((element) => {
    totalPrice += element.cost;
    if (element.scale) {
      flightsWithStop++;
    }
  });
  console.log("***********************************");
  console.log(
    "The average cost of the flights is : ",
    (totalPrice / flights.length).toFixed(2)
  );
  console.log("***********************************");
  console.log(`There are ${flightsWithStop} flights with stop`);
  console.log("***********************************");
}

function lastFiveFlights() {
  console.log("***********************************");
  console.log("Deatails about our last five flights");
  console.log("***********************************");
  for (let index = flights.length - 5; index < flights.length; index++) {
    flights[index].scale
      ? console.log(
          ` flight from ${flights[index].from} and destination ${flights[index].to} cost ${flights[index].cost}€ has stop`
        )
      : console.log(
          `flight from ${flights[index].from} and destination ${flights[index].to} cost ${flights[index].cost}€ has no stop`
        );
  }
}

const checkOptions = (optionSelected, dataOk) => {
  let optionsAvaible = ["1", "2", "3"];
  if (!optionsAvaible.includes(optionSelected)) {
    alert("Enter a valid option");
    dataOk = false;
  }
  return dataOk;
};

function selectRol() {
  const rol = prompt("Select your rol:\n 1-USER\n 2-ADMIN\n");
  let isValidOption = checkOptions(rol, dataOk);
  if (isValidOption) {
    switch (rol) {
      case "1":
        selectUserOptions();
        break;
      case "2":
        selectAdminOptions();
        break;
      case "3":
        exit();
        break;
      default:
        break;
    }
  } else {
    selectRol();
  }
}

const selectAdminOptions = () => {
  let adminOptions = prompt(
    "Select one option :\n 1-Create a new flight\n 2-Delete flight by id\n 3-Exit"
  );
  let isValidOption = checkOptions(adminOptions, dataOk);
  if (isValidOption) {
    switch (adminOptions) {
      case "1":
        createFlight();
        break;
      case "2":
        deleteFlightById();
      case "3":
        exit();
        break;
      default:
        break;
    }
  } else {
    selectAdminOptions();
  }
};

const selectUserOptions = () => {
  let userOptions = prompt(
    "Select one option :\n 1-Search flight by price\n 2-Search flight by destination\n 3-Exit"
  );
  let isValidOption = checkOptions(userOptions, dataOk);
  if (isValidOption) {
    switch (userOptions) {
      case "1":
        searchFlightByPrice();
        break;
      case "2":
        searchFlightByDestination();
        break;
      case "3":
        exit();
        break;
      default:
        break;
    }
  } else {
    selectUserOptions();
  }
};

const exit = () => {
  alert(`Thanks for your visit!!!\n,Goodbye, see you soon`);
};

function createFlight() {
  let totalFlights = flights.length;
  let newFlight = {
    id: flights.length,
    to: "",
    from: "",
    cost: 0,
    scale: false,
  };

  if (totalFlights < 15) {
    do {
      newFlight.to = prompt("Enter destination");
    } while (
      newFlight.to === "" ||
      newFlight.to === " " ||
      newFlight.to === null
    );

    do {
      newFlight.from = prompt("Enter flight origin");
    } while (
      newFlight.from === "" ||
      newFlight.from === " " ||
      newFlight.from === null
    );

    do {
      price = prompt("Enter flight price");
    } while (isNaN(price) || price === "" || price === null);

    newFlight.scale = confirm("Does the flight any stop ?");
    newFlight.cost = Number(price);

    flights.push(newFlight);
    showFlights();
    selectAdminOptions();
  } else {
    alert(
      "Therea are already 15 flights, if you want to create another one, you have to delete a flight first"
    );
    selectAdminOptions();
  }
}

function deleteFlightById() {
  let flightId = prompt("Enter the flight id you want to delete");
  if (isNaN(flightId)) {
    alert(`Enter a valid id !!!`);
    deleteFlightById();
  } else {
    isIdFounded = findId(flightId);
    if (isIdFounded) {
      flights.splice(flightId, 1);
      showFlights();
      selectAdminOptions();
    } else {
      alert(`Flight with id: ${flightId} not founded!!\n Try again`);
      deleteFlightById();
    }
  }
}

const searchFlightByDestination = () => {
  alert("You have selected search flight by destination");
  let destination = "";
  do {
    destination = prompt(`Enter destination`);
  } while (destination === "" || destination === null);
  let city = firstLetterToUpperCase(destination);
  const resultFlights = flights.filter((flight) => flight.to === city);
  if (resultFlights.length >= 0) {
    showFlights(resultFlights);
    selectUserOptions();
  } else {
    alert(`Flight with destination ${destination} not founded`);
  }
};

const firstLetterToUpperCase = (city) => {
  const myCities = city.split(" ");
  const myCitiesToUpperCase = myCities.map(
    (element) => element[0].toUpperCase() + element.slice(1, element.length)
  );
  return myCitiesToUpperCase.join(" ");
};

function findId(id) {
  const flightId = Number(id);
  const founded = flights.some((element) => element.id === flightId);
  return founded;
}

function searchFlightByPrice() {
  alert("You have selected search flight by price");
  let price = prompt("Enter a price");
  if (isNaN(price)) {
    alert("Enter a valid price!!!");
    searchFlightByPrice();
  } else {
    price = Number(price);
    const option = prompt(
      `Select an option:\n 1-Flights lower than ${price}\n 2-Flights upper than ${price}`
    );
    let isValidOption = checkOptions(option, dataOk);
    if (isValidOption) {
      switch (option) {
        case "1":
          const chipestFlights = flights.filter(
            (flight) => flight.cost <= price
          );
          showFlights(chipestFlights);
          selectUserOptions();
          break;
        case "2":
          const expensiveFlights = flights.filter(
            (flight) => flight.cost >= price
          );
          showFlights(expensiveFlights);
          selectUserOptions();
          break;
        default:
          break;
      }
    } else {
      searchFlightByPrice();
    }
  }
}

function isdiAirlines() {
  welcome();
  showFlights();
  showPriceAverage();
  lastFiveFlights();
  selectRol();
}

isdiAirlines();
