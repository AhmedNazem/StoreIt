export const appWriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_DB_ID!,
  usersCollectionId: process.env.NEXT_PUBLIC_USERS_COLLECTION!,
  filesCollectionId: process.env.NEXT_PUBLIC_FILES_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_BUCKET_STORAGE!,
  secretKey: process.env.NEXT_APPWRITE_SECRET!,
};
