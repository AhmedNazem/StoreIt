"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appWriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

// Fetch user by email
const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appWriteConfig.databaseId,
    appWriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

// Send email OTP
const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    console.error("Failed to send email OTP", error);
    throw new Error("Failed to send OTP.");
  }
};

// Create a new user account
const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });

  if (!existingUser) {
    const { databases } = await createAdminClient();

    try {
      await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.usersCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          avarar: "/assets/images/avatar.png", // ? it supposed to be avatar 😅
          accountId,
        }
      );
    } catch (error) {
      console.error("Failed to create user document", error);
      throw new Error("Could not create user.");
    }
  }

  return parseStringify({ accountId });
};

// Verify secret token
const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    console.error("Failed to verify secret", error);
    throw new Error("Failed to verify secret.");
  }
};

export { sendEmailOTP, getUserByEmail, createAccount, verifySecret };
