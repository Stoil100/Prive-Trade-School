import * as admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";

admin.initializeApp();

/**
 * Admin gate: allowlist collection.
 * Put a document at admins/{uid} for any UID that is allowed to create users.
 */
async function assertCallerIsAdmin(callerUid: string) {
    const snap = await admin.firestore().doc(`admins/${callerUid}`).get();
    if (!snap.exists) {
        throw new HttpsError("permission-denied", "Not allowed.");
    }
}

type CreateAdminUserInput = {
    email: string;
    password: string;
};

type CreateAdminUserOutput = {
    uid: string;
    email: string;
};

export const adminCreateUser = onCall<
    CreateAdminUserInput,
    Promise<CreateAdminUserOutput>
>(async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "You must be logged in.");
    }

    await assertCallerIsAdmin(request.auth.uid);

    const { email, password } = request.data || ({} as CreateAdminUserInput);

    if (typeof email !== "string" || !email.trim()) {
        throw new HttpsError("invalid-argument", "Email is required.");
    }
    if (typeof password !== "string" || password.length < 6) {
        throw new HttpsError(
            "invalid-argument",
            "Password must be at least 6 characters.",
        );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Create Firebase Auth user (does NOT sign your admin out, since it's server-side)
    let userRecord: admin.auth.UserRecord;
    try {
        userRecord = await admin.auth().createUser({
            email: normalizedEmail,
            password,
        });
    } catch (e: any) {
        // Common case: email already exists
        if (e?.code === "auth/email-already-exists") {
            throw new HttpsError("already-exists", "Email already in use.");
        }
        throw new HttpsError(
            "internal",
            e?.message ?? "Failed to create user.",
        );
    }

    // Save only email + role in Firestore (as you requested)
    await admin.firestore().doc(`users/${userRecord.uid}`).set({
        email: normalizedEmail,
        role: "admin",
    });

    return { uid: userRecord.uid, email: normalizedEmail };
});
