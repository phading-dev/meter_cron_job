import { processConsumers } from "./consumer_processing";
import { processPublishers } from "./publisher_processing";

async function main() {
  await processConsumers();
  await processPublishers();
}

main();
