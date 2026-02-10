# Environment Setup Guide

## 🔐 Firebase Configuration

Aplikasi ini menggunakan environment variables untuk menyimpan konfigurasi Firebase secara aman.

### Setup Instructions

1. **Copy file template**

   ```bash
   cp .env.example .env
   ```

2. **Dapatkan Firebase credentials**
   - Buka [Firebase Console](https://console.firebase.google.com/)
   - Pilih project: `mandiriinventory-ecc9a`
   - Klik ⚙️ (Settings) → Project settings
   - Scroll ke bagian "Your apps"
   - Copy credentials dari "SDK setup and configuration"

3. **Isi file .env**

   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Restart development server**
   ```bash
   npm run dev
   ```

## 🛡️ Security Best Practices

### ✅ DO:

- ✅ Gunakan environment variables untuk sensitive data
- ✅ Tambahkan `.env` ke `.gitignore`
- ✅ Gunakan `.env.example` sebagai template
- ✅ Set Firebase Security Rules di console
- ✅ Gunakan HTTPS di production
- ✅ Validate input di frontend dan backend

### ❌ DON'T:

- ❌ Commit file `.env` ke Git
- ❌ Share Firebase credentials di chat/email
- ❌ Hardcode API keys di source code
- ❌ Disable Firebase Security Rules
- ❌ Expose admin credentials

## 🔒 Firebase Security Rules

Lihat file [FIREBASE_RULES.md](./FIREBASE_RULES.md) untuk:

- Firestore Database Rules
- Storage Rules
- Cara menerapkan rules
- Testing rules

## 📝 Environment Variables Explanation

| Variable                            | Description                        |
| ----------------------------------- | ---------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase Web API Key               |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase Authentication domain     |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase Project ID                |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase Storage bucket name       |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID`              | Firebase App ID                    |
| `VITE_FIREBASE_MEASUREMENT_ID`      | Google Analytics measurement ID    |

## 🚨 Troubleshooting

### Error: "Firebase config is missing"

- Pastikan file `.env` sudah ada di root project
- Restart dev server setelah membuat/edit `.env`
- Check apakah variable names di `.env` sesuai dengan `import.meta.env.VITE_*`

### Error: "Firebase: Error (auth/invalid-api-key)"

- Verify API key di Firebase Console
- Pastikan tidak ada extra spaces di `.env`
- Check apakah project ID sudah benar

### Changes tidak terdeteksi setelah update .env

- Stop dev server (Ctrl+C)
- Start ulang: `npm run dev`
- Vite memerlukan restart untuk membaca environment variables baru

## 📚 Additional Resources

- [Firebase Security Rules Guide](https://firebase.google.com/docs/rules)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Security](https://firebase.google.com/docs/firestore/security/get-started)

## 🔄 Development Workflow

1. Setup `.env` file (first time only)
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5173
5. Register new account at `/register`
6. Login at `/login`

## 📦 Production Deployment

Untuk production, set environment variables di hosting platform:

- **Vercel**: Settings → Environment Variables
- **Netlify**: Site settings → Build & deploy → Environment
- **Firebase Hosting**: `.env.production` file

**PENTING**: Jangan lupa untuk:

1. Set production Firebase Security Rules
2. Enable Firebase Authentication email verification
3. Setup rate limiting untuk API calls
4. Monitor Firebase usage di console
