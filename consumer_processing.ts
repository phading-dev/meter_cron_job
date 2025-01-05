import { SERVICE_CLIENT } from "./service_client";
import {
  getDailyBatch,
  getMonthlyBatch,
  processDailyMeterReading,
  processMonthlyMeterReading,
} from "@phading/product_meter_service_interface/show/node/consumer/client";

export async function processConsumers(): Promise<void> {
  let cursor: string;
  do {
    let response = await getDailyBatch(SERVICE_CLIENT, {
      cursor,
    });
    cursor = response.cursor;
    await Promise.all(
      response.rowKeys.map((rowKey) =>
        processDailyMeterReading(SERVICE_CLIENT, {
          rowKey,
        }),
      ),
    );
  } while (cursor);

  do {
    let response = await getMonthlyBatch(SERVICE_CLIENT, {
      cursor,
    });
    cursor = response.cursor;
    await Promise.all(
      response.rowKeys.map((rowKey) =>
        processMonthlyMeterReading(SERVICE_CLIENT, {
          rowKey,
        }),
      ),
    );
  } while (cursor);
}
