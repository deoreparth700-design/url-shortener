# 🔗 URL Shortener with Click Analytics

A production-ready REST API that converts long URLs into short, shareable links and tracks click analytics using PostgreSQL.

**Live API:** https://url-shortener-kj4c.onrender.com

---

## 🚀 Features

* Create short URLs from long URLs
* Generate unique 6-character short codes
* Validate URLs before storing them
* Redirect short URLs to their original destination
* Track every click
* Track total clicks
* View clicks per day
* Track top referrers
* PostgreSQL database integration
* Environment-based configuration
* RESTful API design
* Deployed on Render with Neon PostgreSQL

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **Database Provider:** Neon
* **Deployment:** Render
* **API Testing:** Postman
* **Version Control:** Git & GitHub

---

## 📁 Project Structure

```text
url-shortener/
│
├── src/
│   ├── db/
│   │   ├── migrate.js
│   │   ├── pool.js
│   │   └── schema.sql
│   │
│   ├── models/
│   │   └── urlModel.js
│   │
│   ├── routes/
│   │   ├── redirect.routes.js
│   │   ├── shorten.routes.js
│   │   └── stats.routes.js
│   │
│   └── app.js
│
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/deoreparth700-design/url-shortener.git
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
```

> Never commit `.env` or expose your database credentials publicly.

### 4. Run database migration

```bash
node src/db/migrate.js
```

### 5. Start the server

```bash
npm start
```

The API will run locally at:

```text
http://localhost:3000
```

---

# 📡 API Documentation

## 1. Create a Short URL

### Request

```http
POST /api/shorten
```

### Body

```json
{
  "longUrl": "https://www.example.com"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl":"https://www.example.com"}'
```

### Response

```json
{
  "id": 1,
  "short_code": "aB3xY9",
  "long_url": "https://www.example.com"
}
```

---

## 2. Redirect to Original URL

Open the generated short URL:

```http
GET /:shortCode
```

Example:

```text
http://localhost:3000/aB3xY9
```

The server finds the original URL, records the click, and redirects the user.

---

## 3. View Click Analytics

### Request

```http
GET /api/stats/:shortCode
```

Example:

```text
GET /api/stats/aB3xY9
```

### Response

```json
{
  "shortCode": "aB3xY9",
  "longUrl": "https://www.example.com",
  "totalClicks": 25,
  "clicksPerDay": [
    {
      "date": "2026-08-17",
      "clicks": 10
    },
    {
      "date": "2026-08-18",
      "clicks": 15
    }
  ],
  "topReferrers": [
    {
      "referrer": "https://google.com",
      "clicks": 12
    },
    {
      "referrer": "https://github.com",
      "clicks": 8
    }
  ]
}
```

---

# 🌐 Production API

Base URL:

```text
https://url-shortener-kj4c.onrender.com
```

### Create URL

```text
POST https://url-shortener-kj4c.onrender.com/api/shorten
```

### Redirect

```text
GET https://url-shortener-kj4c.onrender.com/:shortCode
```

### Analytics

```text
GET https://url-shortener-kj4c.onrender.com/api/stats/:shortCode
```

---

## 🔐 Environment Variables

The application requires:

```env
DATABASE_URL=
```

For production, the database connection string is configured through Render environment variables.

**Never commit credentials, passwords, or `.env` files to GitHub.**

---

## 🗄️ Database

The application uses PostgreSQL to store:

* Original URLs
* Generated short codes
* Click records
* Click timestamps
* Referrer information

Neon provides the production PostgreSQL database.

---

## 🔄 How It Works

```text
User
 │
 │ POST long URL
 ▼
Express API
 │
 │ Generate unique short code
 ▼
PostgreSQL
 │
 │ Return short code
 ▼
User receives short URL
 │
 │ Visit short URL
 ▼
Redirect Route
 │
 ├── Record click
 ├── Store timestamp
 └── Store referrer
 │
 ▼
Original URL
```

Analytics are generated from the stored click data using PostgreSQL queries.

---

## 📌 Error Handling

The API validates incoming URLs and returns appropriate HTTP status codes.

Examples:

### Missing URL

```json
{
  "error": "longUrl is required"
}
```

### Invalid URL

```json
{
  "error": "longUrl must be a valid absolute URL, e.g. https://example.com"
}
```

### Unknown short URL

```json
{
  "error": "Short URL not found"
}
```

---

## ☁️ Deployment

The application is deployed using **Render**.

Production architecture:

```text
GitHub
   │
   ▼
Render
   │
   ▼
Node.js + Express
   │
   ▼
Neon PostgreSQL
```

Pushes to the `main` branch can trigger a new Render deployment when automatic deploys are enabled.

---

## 🧠 Backend Concepts Demonstrated

This project demonstrates practical backend concepts including:

* REST API development
* Express.js routing
* HTTP status codes
* Request validation
* PostgreSQL schema design
* SQL aggregation
* Database queries
* Environment variables
* Unique identifier generation
* Click tracking
* Analytics queries
* Error handling
* Production deployment
* Git/GitHub workflow

---

## 🔮 Future Improvements

Possible future enhancements:

* Custom aliases
* URL expiration
* Rate limiting
* User authentication
* Per-user URL management
* QR code generation
* Advanced analytics dashboard
* Redis caching
* Automated API tests
* OpenAPI / Swagger documentation

---

## 👨‍💻 Author

**Parth Deore**

B.Tech Computer Science & Engineering

GitHub: https://github.com/deoreparth700-design

---

## 📄 License

This project is available for educational and portfolio purposes.
