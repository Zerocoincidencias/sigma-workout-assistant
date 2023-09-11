import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const sendDadosHistoricos = functions.database
  .instance("factory-pulse-emaf")
  .ref("/users/{userId}")
  .onWrite(async (change, context) => {
    const userId = context.params.userId;
    const beforeData = change.before.val();
    const afterData = change.after.val();
    const diff = compareObjects(beforeData, afterData);
    const timestamp = new Date().getTime().toString();
    const firestore = admin.firestore();
    const collectionRef = firestore.collection("DadosHistoricos");
    const docRef = collectionRef.doc(userId);
    await docRef.set({[timestamp]: diff}, {merge: true});
    console.log("Data added to Firestore");
  });

/**
 * Compares two objects and returns a new object containing the differences
 * @param {Record<string, any>} source - The source object to compare.
 * @param {Record<string, any>} other - The other object to compare.
 * @return {Record<string, any>} Object containing the differences objects.
 */
function compareObjects(source:Record<string, any>, other:Record<string, any>):
 Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === "object") {
        const nestedResult = compareObjects(source[key], other[key]);
        if (Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult;
        }
      } else if (source[key] !== other[key]) {
        result[key] = other[key];
      }
    }
  }
  return result;
}
