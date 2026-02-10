# Firebase Security Rules

## Firestore Rules

Untuk mengamankan database Firestore, terapkan rules berikut di Firebase Console:

### Path: Firestore Database → Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users Collection Rules
    match /users/{userId} {
      // Allow user to read their own document
      allow read: if request.auth != null && request.auth.uid == userId;

      // Allow creation only during registration (when not authenticated yet)
      // Or by authenticated user creating their own document
      allow create: if request.auth == null ||
                      (request.auth != null && request.auth.uid == userId);

      // Allow user to update their own document
      allow update: if request.auth != null && request.auth.uid == userId;

      // Admin can read all users (check if user has admin role)
      allow read: if request.auth != null &&
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';

      // Prevent deletion by regular users
      allow delete: if false;
    }

    // Inventory Items Collection Rules (example)
    match /items/{itemId} {
      // Anyone authenticated can read items
      allow read: if request.auth != null;

      // Only authenticated users can create items
      allow create: if request.auth != null;

      // Users can update their own items or if they are admin
      allow update: if request.auth != null &&
                      (resource.data.createdBy == request.auth.uid ||
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');

      // Only admins can delete items
      allow delete: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Storage Rules

Untuk mengamankan Firebase Storage, terapkan rules berikut:

### Path: Storage → Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images folder - authenticated users can upload
    match /images/{allPaths=**} {
      // Allow read to all authenticated users
      allow read: if request.auth != null;

      // Allow write only to authenticated users
      // Max file size: 5MB
      allow write: if request.auth != null &&
                     request.resource.size < 5 * 1024 * 1024 &&
                     request.resource.contentType.matches('image/.*');
    }

    // User profile images
    match /profiles/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                     request.auth.uid == userId &&
                     request.resource.size < 2 * 1024 * 1024;
    }
  }
}
```

## Cara Menerapkan Rules

### Firestore Rules:

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda: `mandiriinventory-ecc9a`
3. Klik **Firestore Database** di menu kiri
4. Klik tab **Rules**
5. Copy-paste rules di atas
6. Klik **Publish**

### Storage Rules:

1. Di Firebase Console, klik **Storage** di menu kiri
2. Klik tab **Rules**
3. Copy-paste rules di atas
4. Klik **Publish**

## Penjelasan Rules

### Users Collection:

- ✅ User hanya bisa membaca data mereka sendiri
- ✅ User bisa membuat akun saat registrasi (belum login)
- ✅ User bisa update data mereka sendiri
- ✅ Admin bisa membaca semua user
- ❌ User tidak bisa delete data user

### Items Collection (contoh):

- ✅ Semua user login bisa membaca items
- ✅ Semua user login bisa membuat item baru
- ✅ User bisa update item yang mereka buat atau admin bisa update semua
- ✅ Hanya admin yang bisa delete items

### Storage:

- ✅ Hanya user login yang bisa upload/download
- ✅ Image maksimal 5MB
- ✅ Hanya file image yang boleh di-upload
- ✅ User hanya bisa upload ke folder profile mereka sendiri

## Testing Rules

Sebelum deploy ke production, test rules menggunakan Firebase Emulator:

```bash
firebase emulators:start
```

## Notes

- Rules ini menggunakan role-based access control (RBAC)
- Admin role harus di-set manual di Firestore Console
- Untuk production, tambahkan rate limiting dan validation lebih ketat
