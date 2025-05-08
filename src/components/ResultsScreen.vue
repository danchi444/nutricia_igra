<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Logo" class="top-right-logo" />
    <img src="@/assets/zeleni_logo.png" alt="Zeleni Logo" class="bottom-right-logo" />
    <div class="results-screen">
    <h1 :class="isCorrect ? 'correct' : 'incorrect'">
      {{ isCorrect ? "Tako je! ✅" : "Blizu! ❌" }}
    </h1>
    <div class="poz">
      <!-- Two Columns for True Answer and User Answer -->
      <div class="answers-container">
        <!-- True Answer Column -->
        <div class="answer-column">
          <p class="column-title nutri">Točan odgovor je:</p>
          <div
            v-for="(foodItem, index) in drink.foodItems"
            :key="index"
            class="answer-row"
          >
            <p class="nutri">
              {{ foodItem.text }}
              <b>{{ foodItem.answer }}</b>
              {{ foodItem.amount[foodItem.options.indexOf(foodItem.answer)] }}
            </p>
            <img
              :src="require(`@/assets/${foodItem.image}`)"
              :alt="foodItem.name"
              class="food-image"
            />
          </div>
        </div>

        <!-- User Answer Column -->
        <div class="answer-column" v-if="!isCorrect">
          <p class="column-title nutri">Vaš odgovor:</p>
          <div
            v-for="(answer, index) in userAnswers"
            :key="index"
            class="answer-row"
          >
            <p class="nutri">
              {{
                answer === null
                  ? drink.foodItems[index].text + " " + drink.foodItems[index].default
                  : drink.foodItems[index].text +
                    " " +
                    answer +
                    " " +
                    drink.foodItems[index].amount[
                      drink.foodItems[index].options.indexOf(answer)
                    ]
              }}
            </p>
            <img
              :src="require(`@/assets/${drink.foodItems[index].image}`)"
              :alt="drink.foodItems[index].name"
              class="food-image"
            />
          </div>
        </div>
      </div>

      <!-- Price Row -->
      <div class="price-row">
        <img src="@/assets/basket.png" alt="Basket" class="basket-image" />
        <p class="nutri">Cijena odgovarajućih namirnica ~ <b>{{ drink.cost }}€</b></p>
        <template v-if="drink.payment > 0">
          <img
            :src="require(`@/assets/${drink.image}`)"
            alt="Drink"
            class="drink-image"
          />
          <p class="nutri">Nadoplata = <b>{{ drink.payment }}€</b></p>
        </template>
      </div>
    </div>

    <button @click="goToStart">Vrati me na početnu</button>
  </div>
  </div>
</template>

<script>
import drinksData from "../data.json";

export default {
  props: ["drinkName", "answers"],
  data() {
    return {
      drink: null,
      userAnswers: [],
      isCorrect: false,
      timeoutId: null, // Store the timeout ID so it can be cleared
    };
  },
  created() {
    this.drink = drinksData.find((drink) => drink.name === this.drinkName);
    this.userAnswers = JSON.parse(this.answers);
    this.isCorrect = this.userAnswers.every(
      (answer, index) => answer === this.drink.foodItems[index].answer
    );
  },
  methods: {
    goToStart() {
      this.$router.push("/");
    },
    startCountdown() {
      // Start the countdown and store the timeout ID
      this.timeoutId = setTimeout(() => {
        this.goToStart();
      }, 50000); // 50 seconds
    },
    clearCountdown() {
      // Clear the timeout if it exists
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    },
  },
  mounted() {
    this.startCountdown(); // Start the countdown when the component is mounted
  },
  beforeUnmount() {
    this.clearCountdown(); // Clear the countdown when the component is unmounted
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

.results-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  width: 80vw;
}

.nutri {
  color: #2b2234;
}

.correct {
  color: #056839;
  font-size: 2em;
}

.incorrect {
  color: #303b90;
  font-size: 2em;
}

.poz {
  display: flex;
  flex-direction: column; /* Vertical layout */
  gap: 0.1px;
  padding: 10px;
  border-radius: 5%; /* Slightly rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.answers-container {
  display: flex;
  flex-direction: row; /* Two columns for answers */
  justify-content: center;
  gap: 10px;
}

.answer-column {
  display: flex;
  flex-direction: column;
  gap: 0.5px; /* Each column takes up 45% of the container */
}

.column-title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.answer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Consistent gap between elements */
  margin: 0; /* Remove any extra margins */
  padding: 0; /* Remove any extra padding */
}

.food-image {
  height: 35px;
  width: auto;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.basket-image {
  height: 70px;
  width: auto;
}

.drink-image {
  height: 70px;
  width: auto;
}

button {
  font-size: 1.2em;
  padding: 12px 24px;
  background-color: #056839;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #05683ace;
}
</style>