<template>
  <div class="game-screen">
    <div class="left-column">
      <p class="instruction">Odaberite količinu svake stavke za koju mislite da odgovara nutritivnoj vrijednosti napitka {{ drinkName }}...</p>
      <img :src="require(`@/assets/${drink.secondaryImage}`)" :alt="drink.name" class="drink-image" />
      <button class="finish-button" @click="finishGame">Završi igru</button>
    </div>
    <div class="right-column">
      <div class="nutrient-row" v-for="(foodItem, index) in drink.foodItems" :key="index">
        <div class="nutrient-cell">
          <p class="nutri">{{ foodItem.nutrient }}</p>
        </div>
        <div
          v-for="(option, optionIndex) in foodItem.options"
          :key="optionIndex"
          class="option-cell"
          :class="{ selected: selectedOptions[index] === option }"
          @click="selectOption(index, option)"
          @mouseover="hoveredOption = { row: index, col: optionIndex }"
          @mouseleave="hoveredOption = null"
        >
          <p class="nutri">{{ option }}</p>
        </div>
        <div class="food-cell">
          <img :src="require(`@/assets/${foodItem.image}`)" :alt="foodItem.name" class="food-image" />
          <p class="food-name">{{ foodItem.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drinksData from "../data.json";

export default {
  props: ["drinkName"],
  data() {
    return {
      drink: null,
      selectedOptions: [],
      hoveredOption: null,
    };
  },
  created() {
    this.drink = drinksData.find((drink) => drink.name === this.drinkName);
    this.selectedOptions = Array(this.drink.foodItems.length).fill(null);
  },
  methods: {
    selectOption(rowIndex, option) {
      this.selectedOptions[rowIndex] = option;
    },
    finishGame() {
      this.$router.push({
        path: "/results",
        query: {
          drinkName: this.drinkName,
          answers: JSON.stringify(this.selectedOptions),
        },
      });
    },
  },
};
</script>

<style scoped>
.game-screen {
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: flex-end;
  padding: 5%;
}

.left-column {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5%;
  text-align: center;
}

.instruction {
  margin-bottom: 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: #34293f;;
}

.drink-image {
  height: 50%;
  width: auto;
  margin-bottom: 20px;
}

.finish-button {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: #056839;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.finish-button:hover {
  background-color: #05683ace;
}

.finish-button:active {
  background-color: #388e3c;
  transform: scale(0.95);
}

.right-column {
  width: 50%;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 2%;
  background-color: #303b9091; /* Light blue background */
  border-radius: 7%; /* Slightly rounded corners */
  height: auto; /* Let the height adjust to the content */
}

.nutrient-row {
  display: flex;
  align-items: center;
  padding: 2%;
  height: 80px; /* Set a fixed height for the rows */
}

.nutrient-cell {
  flex: 1;
  text-align: center;
  font-weight: bold;
  margin-right: 1%;
}

.option-cell {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #303b90; /* Dark purple border */
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.option-cell:hover {
  background-color: #303b90ca; /* Lilac */
}

.option-cell.selected {
  background-color: #303b90; /* Darker purple */
  color: white;
}

.food-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  margin-left: 2%;
}

.nutri {
  color: #2b2234;
}

.food-image {
  height: 50px; /* Set a fixed height for the images */
  width: auto; /* Maintain aspect ratio */
  margin-bottom: 5px;
}

.food-name {
  font-size: 0.9em;
  text-align: center;
  font-weight: bold;
  color: #161b3e;
}
</style>