# fantasy_sports

This queries the espn fantasy v3 basketball endpoint to retrieve league details and calculate weekly payouts.

## Local Development

Refer to .env.example file for setup

`npm run dev` to run locally for the provided slack webhook.

## Build

Merges to main will trigger a Codebuild job to release the code to a lambda function

## Frequency

This code is configured on AWS Lambda to be triggered every Monday at 9:00 CST.
