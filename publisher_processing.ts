import { SERVICE_CLIENT } from "./service_client";
import {
  getDailyBatch,
  getMonthlyBatch,
  loadPublishersToProcessMonthly,
  processDailyMeterReading,
  processMonthlyMeterReading,
} from "@phading/product_meter_service_interface/show/backend/publisher/client";

export async function processPublishers(): Promise<void> {
  let cursor: string;
  do {
    let resposne = await getDailyBatch(SERVICE_CLIENT, {
      cursor,
    });
    cursor = resposne.cursor;
    await Promise.all(
      resposne.rowKeys.map((rowKey) =>
        processDailyMeterReading(SERVICE_CLIENT, {
          rowKey,
        }),
      ),
    );
  } while (cursor);

  await loadPublishersToProcessMonthly(SERVICE_CLIENT, {});
  do {
    let response = await getMonthlyBatch(SERVICE_CLIENT, {
      cursor,
    });
    await Promise.all(
      response.rowKeys.map((rowKey) =>
        processMonthlyMeterReading(SERVICE_CLIENT, {
          rowKey,
        }),
      ),
    );
  } while (cursor);
}
