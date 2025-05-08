import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "@/components/StartScreen.vue";
import GameScreen from "@/components/GameScreen.vue";
import ResultsScreen from "@/components/ResultsScreen.vue";

const routes = [
  { 
    path: "/", 
    component: StartScreen 
  },
  { 
    path: "/game", 
    component: GameScreen,
    props: route => ({
      drinkName: route.query.drink,
    }),
  },
  {
    path: "/results",
    component: ResultsScreen,
    props: route => ({
      drinkName: route.query.drinkName,
      answers: route.query.answers,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;