#!/bin/bash
# GCP auth
gcloud auth application-default login
gcloud config set project phading-prod

# Create service account
gcloud iam service-accounts create meter-cron-builder

# Grant permissions to the service account
gcloud projects add-iam-policy-binding phading-prod --member="serviceAccount:meter-cron-builder@phading-prod.iam.gserviceaccount.com" --role='roles/cloudbuild.builds.builder' --condition=None
gcloud projects add-iam-policy-binding phading-prod --member="serviceAccount:meter-cron-builder@phading-prod.iam.gserviceaccount.com" --role='roles/container.developer' --condition=None

# Create the service account
kubectl create serviceaccount meter-cron-account --namespace default
