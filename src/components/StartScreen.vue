<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Logo" class="top-right-logo" />
    <img src="@/assets/zeleni_logo.png" alt="Zeleni Logo" class="bottom-right-logo" />
    <div class="screen">
      <div class="title">
        <h1>Pripremite se za izazov!</h1>
        <h1>Možete li pogoditi ekvivalent nutritivnih vrijednosti ovih napitaka?</h1>
        <p class="subtitle">Odaberite jedan od napitaka da biste započeli igru:</p>
      </div>
      <div class="drinks-row">
        <div
          v-for="(drink, index) in drinks"
          :key="index"
          class="drink-cell"
          @click="selectDrink(drink.name)"
          :class="{ selected: selectedDrink === drink.name }"
        >
          <img
            :src="require(`@/assets/${drink.image}`)"
            :alt="drink.name"
            class="drink-image"
            @mouseover="hoveredDrink = drink.name"
            @mouseleave="hoveredDrink = null"
            :class="{ hovered: hoveredDrink === drink.name }"
          />
          <p class="drink-name">{{ drink.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import drinksData from "../data.json";
  
  export default {
    data() {
      return {
        drinks: drinksData,
        hoveredDrink: null,
        selectedDrink: null,
      };
    },
    methods: {
      selectDrink(drinkName) {
        this.selectedDrink = drinkName;
        this.$router.push({ path: "/game", query: { drink: drinkName } });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
  position: relative; /* Required for positioning the logos relative to the container */
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  overflow: hidden;
}

.screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 5%;
}

.top-right-logo {
  position: absolute;
  top: 2%; /* Add some space from the top */
  right: 2%; /* Add some space from the right */
  width: 10%; /* Adjust the size of the logo */
  height: auto; /* Maintain aspect ratio */
}

.bottom-right-logo {
  position: absolute;
  bottom: 2%; /* Add some space from the bottom */
  right: 2%; /* Add some space from the right */
  width: 10%; /* Adjust the size of the logo */
  height: auto; /* Maintain aspect ratio */
}
  
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.1em;
    color: #303b90;
    font-size: 0.9em;
  }
  
  .subtitle {
    font-size: 1.3em;
    color: #676666;
    margin-top: 0.8em;
  }
  
  .drinks-row {
  display: flex;
  justify-content: space-around; /* Distribute cells evenly with space between them */
  align-items: center;
  width: 100%;
  height: 60vh; /* Ensure the row takes up 60% of the viewport height */
  margin-top: 2em;
  gap: 2%; /* Add spacing between cells */
}

.drink-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%; /* Make the cell fill the height of the row */
  width: 20%; /* Make each cell take up 20% of the row's width */
  transition: transform 0.3s, background-color 0.3s;
}
  
  .drink-cell.selected {
    background-color: rgba(128, 0, 128, 0.2); /* Slight purple hue */
    border-radius: 10px;
    padding: 10px;
  }
  
  .drink-image {
    height: 80%;
    width: auto;
    object-fit: contain; 
    animation: shake 1s infinite alternate;
    transition: transform 0.3s;
  }
  
  .drink-image.hovered {
    animation: none;
    transform: scale(1.1);
  }
  
  .drink-name {
    margin-top: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color:#34293f;
  }
  
  @keyframes shake {
    0% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(5deg);
    }
  }
  </style>