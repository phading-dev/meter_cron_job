import { SERVICE_CLIENT } from "./service_client";
import {
  newGetDailyStorageBatchRequest,
  newGetDailyWatchBatchRequest,
  newGetMonthlyBatchRequest,
  newProcessDailyStorageReadingRequest,
  newProcessDailyWatchReadingRequest,
  newProcessMonthlyMeterReadingRequest,
} from "@phading/product_meter_service_interface/show/node/publisher/client";

export async function processPublishers(): Promise<void> {
  let cursor: string;
  do {
    let resposne = await SERVICE_CLIENT.send(
      newGetDailyWatchBatchRequest({
        cursor,
      }),
    );
    cursor = resposne.cursor;
    await Promise.all(
      resposne.rowKeys.map((rowKey) =>
        SERVICE_CLIENT.send(
          newProcessDailyWatchReadingRequest({
            rowKey,
          }),
        ),
      ),
    );
  } while (cursor);

  do {
    let resposne = await SERVICE_CLIENT.send(
      newGetDailyStorageBatchRequest({
        cursor,
      }),
    );
    cursor = resposne.cursor;
    await Promise.all(
      resposne.rowKeys.map((rowKey) =>
        SERVICE_CLIENT.send(
          newProcessDailyStorageReadingRequest({
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
