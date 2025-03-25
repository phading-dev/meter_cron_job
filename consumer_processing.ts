import { SERVICE_CLIENT } from "./service_client";
import {
  newGetDailyBatchRequest,
  newGetMonthlyBatchRequest,
  newProcessDailyMeterReadingRequest,
  newProcessMonthlyMeterReadingRequest,
} from "@phading/meter_service_interface/show/node/consumer/client";

export async function processConsumers(): Promise<void> {
  let cursor: string;
  do {
    let response = await SERVICE_CLIENT.send(
      newGetDailyBatchRequest({
        cursor,
      }),
    );
    cursor = response.cursor;
    await Promise.all(
      response.rowKeys.map((rowKey) =>
        SERVICE_CLIENT.send(
          newProcessDailyMeterReadingRequest({
            rowKey,
          }),
        ),
      ),
    );
  } while (cursor);

  do {
    let response = await SERVICE_CLIENT.send(
      newGetMonthlyBatchRequest({
        cursor,
      }),
    );
    cursor = response.cursor;
    await Promise.all(
      response.rowKeys.map((rowKey) =>
        SERVICE_CLIENT.send(
          newProcessMonthlyMeterReadingRequest({
            rowKey,
          }),
        ),
      ),
    );
  } while (cursor);
}
