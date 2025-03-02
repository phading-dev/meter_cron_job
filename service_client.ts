import { CLUSTER_ENV_VARS } from "@phading/cluster/env_vars";
import { NodeServiceClient } from "@selfage/node_service_client";

export let SERVICE_CLIENT = NodeServiceClient.create(
  CLUSTER_ENV_VARS.internalOrigin,
);
