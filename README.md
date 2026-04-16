# Take Home Quiz 1

# 535250061 - Lulu Lydia Andrean

- Endpoint yang dapat diakses:

1. POST /api/gacha/draw :

- Fungsi: untuk draw/pull gacha.
- Info yang perlu diisi (saat tes di echoapi) di tab Body, pilih raw & JSON :
- {
  "userId": "XXXXX", contoh isi XX : user123, user456
  "userName": "XXXXX" XXXX nanti diisi nama user
  }

2. GET /api/gacha/history :

- Fungsi: untuk melihat riwayat draw gacha.
- Info yang perlu diisi (saat tes di echoapi) di tab Params :
- KEY : isi userId VALUE : isi username cnth: user123

3. GET /api/gacha/prizes :

- Fungsi: untuk melihat stok hadiah gacha yang masih ada.

4. GET /api/gacha/winners :

- Fungsi: untuk melihat list pemenang hadiah gacha.

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
