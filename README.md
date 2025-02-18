# Vendor Management System

[![Netlify Status](https://api.netlify.com/api/v1/badges/63c1eff0-f0b6-4af1-a3c8-f52d53099763/deploy-status)](https://app.netlify.com/sites/vendormanagement/deploys)

## Overview

This project is a vendor management system developed using React, Tailwind CSS, and Firebase for the frontend, and Node.js with Firebase Realtime Database for the backend. It allows users to login with Google, create, edit, and delete vendor profiles, and displays a paginated list of vendors with essential details.

## Features

- **Login & Logout with Google:**

  - Users can securely log in using Google accounts and logout when they're done.

- **Create Vendor:**

  - Mandatory fields include Vendor Name, Bank Account, and Bank Name.
  - Optional fields include Address, City, Country, and Zip Code.

- **Display Paginated Vendor List:**

  - Shows Vendor Name, Bank Account, and Bank Name.
  - Provides Edit and Delete options for each vendor.

- **Edit Vendor:**

  - Users can edit vendor details and submit changes.

- **Delete Vendor:**
  - Confirmation required before deleting a vendor.

## Frontend

- **Framework:** React
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Google login
- **Database:** Firebase Firestore Database

## Hosting

- **Frontend:** Netlify [https://vendormanagement.netlify.app/](https://vendormanagement.netlify.app/)
