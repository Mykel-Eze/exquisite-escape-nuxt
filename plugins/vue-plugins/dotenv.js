// eslint-disable-next-line @typescript-eslint/no-var-requires
import { defineNuxtPlugin } from "#app";
import dotenv from "dotenv";

export default defineNuxtPlugin(({ app }) => {
  dotenv.config();
});
