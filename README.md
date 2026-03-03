A STRUCTURED AND VALIDATED GRAPHQL NOTES MANAGEMENT API  
BUILT USING  

1. Node.js  
2. Express  
3. GraphQL  
4. MongoDB  
5. Mongoose  
6. TypeScript  
7. Joi (Input Validation)  

---

## Features

### Category Management
1. Create category  
2. Unique category names  
3. Hex color validation  
4. Default color (#808080)  

### Notes Management
1. Create note  
2. Update note  
3. Delete note  
4. Fetch single note  
5. Fetch all notes  
6. Filter notes by category  
7. Fetch pinned notes  

### Validation & Security
1. Joi-based input validation  
2. Custom error messages  

---

## PROJECT STRUCTURE

```
NOTES-API/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── graphql/
│   │   └── schemas/
│   │       └── schema.graphql
│   │
│   ├── models/
│   │   ├── Category.ts
│   │   └── Note.ts
│   │
│   ├── resolvers/
│   │   ├── categoryResolvers.ts
│   │   └── noteResolvers.ts
│   │
│   ├── utils/
│   │   └── validation.ts
│   │
│   └── app.ts
│
├── example.graphql
├── package.json
├── tsconfig.json
└── README.md
```

---

## STEPS FOR SETTING UP PROJECT:

1. Create Folder named Notes-api  
2. Copy folder into VScode  
3. Setup project structure  
4. Create package.json and package-lock.json by running  
   ```
   npm init  
   npm install  
   ```
5. Install core dependencies  
   ```
   npm install express graphql express-graphql mongoose dotenv joi
   ```
6. Install TypeScript + dev tools  
   ```
   npm install -D typescript tsx @types/node @types/express
   ```
7. Initialize Typescript  
   ```
   npx tsc --init
   ```
8. Configure tsconfig.json  
9. Use .env to setup MONGO_URI for connecting to MongoDB  
10. Setup MongoDB connection in db.ts, create schema and mongoose models.  
11. Create resolvers and perform validation testing  
12. Run  
   ```
   npx tsx src/app.ts
   ```
13. Follow the link  
   ```
   http://localhost:4000/graphql
   ```
   to directly enter graphql interface for testing.  
14. Test API using example.graphql  

---

OR

1. Clone entire project using github  
2. Run:  
   ```
   git clone https://github.com/Devaiah-SU/notes-api.git
   cd notes-api
   ```
   Install necessary dependencies and create .env file containing MONGO_URI.  
3. Run project as  
   ```
   npx tsx src/app.ts
   ```
4. Follow the link  
   ```
   http://localhost:4000/graphql
   ```
   to directly enter graphql interface for testing.  
5. Test API using example queries from example.graphql  
