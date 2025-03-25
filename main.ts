import { processConsumers } from "./consumer_processing";
import { processPublishers } from "./publisher_processing";

async function main() {
  console.log("Starting processing");
  let startTimeMs = Date.now();
  try {
    await processConsumers();
    await processPublishers();
  } catch (e) {
    console.error("Error processing meters.", e);
  }
  let elapsedTimeMs = Date.now() - startTimeMs;
  console.log("Finished processing. Elapsed time: ", elapsedTimeMs);
}

main();
