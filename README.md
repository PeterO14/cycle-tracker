# Cycle Notes

A small, privacy-first cycle tracking app built with Expo and React Native.

## What exists today

The project has a working mobile app shell and one prototype interaction: a
person can mark that their period started today. The interaction resets when
the app is restarted; permanent on-device storage is deliberately the next
feature so it can be added and tested thoughtfully.

## Run it locally

1. Install the project dependencies with `npm install`.
2. Start the development server with `npm start`.
3. Scan the QR code using Expo Go on an iPhone, or press `i` in the terminal
   to launch the iOS Simulator when Xcode is installed.

## Planned milestones

1. Store period start dates locally on the device.
2. Add a history view and an edit/delete flow.
3. Calculate cycle-length summaries and a clearly labelled estimate.
4. Add optional symptoms and mood notes.
5. Add export and delete-all-data controls before sharing the app with anyone.

## Privacy principle

Cycle information is sensitive health data. This project will begin with
on-device storage and will not add accounts, analytics, or cloud syncing unless
there is a clear user benefit and an explicit privacy design.
