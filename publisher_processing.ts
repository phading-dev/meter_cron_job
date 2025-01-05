import { SERVICE_CLIENT } from "./service_client";
import {
  getDailyStorageBatch,
  getDailyWatchBatch,
  getMonthlyBatch,
  processDailyStorageReading,
  processDailyWatchReading,
  processMonthlyMeterReading,
} from "@phading/product_meter_service_interface/show/node/publisher/client";

export async function processPublishers(): Promise<void> {
  let cursor: string;
  do {
    let resposne = await getDailyWatchBatch(SERVICE_CLIENT, {
      cursor,
    });
    cursor = resposne.cursor;
    await Promise.all(
      resposne.rowKeys.map((rowKey) =>
        processDailyWatchReading(SERVICE_CLIENT, {
          rowKey,
        }),
      ),
    );
  } while (cursor);

  do {
    let resposne = await getDailyStorageBatch(SERVICE_CLIENT, {
      cursor,
    });
    cursor = resposne.cursor;
    await Promise.all(
      resposne.rowKeys.map((rowKey) =>
        processDailyStorageReading(SERVICE_CLIENT, {
          rowKey,
        }),
      ),
    );
  } while (cursor);

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
