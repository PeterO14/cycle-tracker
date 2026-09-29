# Cycle Notes

A small, privacy-first cycle tracking app built with Expo and React Native.

## What it does

- Log the start and end of a period with one clear action on the Today screen.
- Store entries only on the device.
- See the current cycle day and a carefully labelled next-period estimate once
  enough dates have been logged.
- Browse a small monthly calendar, add a past start date, and remove mistakes.
- Set an optional typical cycle length, export data through the device share
  sheet, or delete everything.

## Run it locally

1. Install the project dependencies with `npm install`.
2. Start the development server with `npm start`.
3. Scan the QR code using Expo Go on an iPhone, or press `i` in the terminal
   to launch the iOS Simulator when Xcode is installed.

## Product boundaries

This is a personal journal, not medical advice or a diagnostic tool. Dates
shown as predictions are estimates based on prior start dates (or an optional
cycle-length setting), and should not be used for contraception or healthcare
decisions.

## Privacy principle

Cycle information is sensitive health data. This project will begin with
on-device storage and will not add accounts, analytics, or cloud syncing unless
there is a clear user benefit and an explicit privacy design.
