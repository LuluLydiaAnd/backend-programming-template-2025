# Take Home Quiz 1

# 535250061 - Lulu Lydia Andrean

- Endpoint yang dapat diakses:

1. POST /api/gacha/draw :

- Fungsi: untuk draw/pull gacha.
- Info yang perlu diisi (saat tes di echoapi) di tab Body, pilih raw & JSON :
- {
-  "userId": "XXXXX", contoh isi XX : user123, user456
- "userName": "XXXXX" XXXX nanti diisi nama user
-  }
<img width="2559" height="1599" alt="Image" src="https://github.com/user-attachments/assets/7e4a2b16-f2c7-474b-ad39-29818e1582cf" />

2. GET /api/gacha/history :

- Fungsi: untuk melihat riwayat draw gacha.
- Info yang perlu diisi (saat tes di echoapi) di tab Params :
- KEY : isi userId VALUE : isi username cnth: user123
<img width="2559" height="1599" alt="Image" src="https://github.com/user-attachments/assets/1f2184ab-22d6-4124-9ec6-036a6153fadd" />

3. GET /api/gacha/prizes :

- Fungsi: untuk melihat stok hadiah gacha yang masih ada.
<img width="2559" height="1599" alt="Image" src="https://github.com/user-attachments/assets/7d1a69a0-00fd-4f52-a746-8295ad74cdd6" />

4. GET /api/gacha/winners :

- Fungsi: untuk melihat list pemenang hadiah gacha.
<img width="2559" height="1599" alt="image" src="https://github.com/user-attachments/assets/f87ff42a-559d-48ec-94d2-c3c0b4fb3da7" />

# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.
