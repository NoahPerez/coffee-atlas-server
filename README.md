## Coffee Atlas Server

Node/Express + MongoDB backend for Coffee Atlas.

## Scripts

- `npm run dev` → loads `.env.local`
- `npm run staging` → loads `.env.staging`
- `npm start` → loads `.env.production`

## Environment Variables

See `.env.example`.

## Auth / Security Notes

- Passwords are never stored; only a hash is persisted (`passwordHash`).
- `passwordHash` is excluded from query results by default (`select: false`) and removed again during JSON/object conversion to avoid accidental leakage.
- Email uniqueness is enforced at the database level with a unique index on `email`; duplicates must be handled as a duplicate-key error in the API layer.
