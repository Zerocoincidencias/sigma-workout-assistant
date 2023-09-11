import * as functions from "firebase-functions";
import * as admin from"firebase-admin";

export const getDadosHistoricos = functions.https.onCall(async (data: any, conntext:any) => {
  try {
    const userID = data.userID;
    const NomeEmpresa = data.NomeEmpresa;
    const NomeCelula = data.NomeCelula;
    const firestore = admin.firestore();
    const documentRef = firestore.collection("DadosHistoricos").doc(userID);
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      const alarmMapFinal = [];
      let currentTimeValue1;
      let currentTimeValue2;
      const currentTime = new Date().getTime();
      // get the correct data from firestore
      const alarmMap1 = new Map();
      for (const key in data) {
        if (
          data[key].data &&
          data[key].data[NomeEmpresa] &&
          data[key].data[NomeEmpresa][NomeCelula] &&
          data[key].data[NomeEmpresa][NomeCelula].CelulaData &&
          data[key].data[NomeEmpresa][NomeCelula].CelulaData.ConsumoEnergia
        ) {
          const alarmValue =
            data[key].data[NomeEmpresa][NomeCelula].CelulaData.ConsumoEnergia;
          const numericKey = Number(key);
          alarmMap1.set(numericKey, alarmValue);
          currentTimeValue1 = alarmValue;
        }
      }
      // add the current value and time to the end of the array
      if (currentTimeValue1) {
        alarmMap1.set(currentTime, currentTimeValue1);
        alarmMapFinal.push(alarmMap1);
      }

      const alarmMap2 = new Map();
      for (const key in data) {
        if (
          data[key].data &&
          data[key].data[NomeEmpresa] &&
          data[key].data[NomeEmpresa][NomeCelula] &&
          data[key].data[NomeEmpresa][NomeCelula].CelulaData &&
          data[key].data[NomeEmpresa][NomeCelula].CelulaData.OEE
        ) {
          const alarmValue =
            data[key].data[NomeEmpresa][NomeCelula].CelulaData.OEE;
          const numericKey = Number(key);
          alarmMap2.set(numericKey, alarmValue);
          currentTimeValue2 = alarmValue;
        }
      }
      // add the current value and time to the end of the array
      if (currentTimeValue2) {
        alarmMap2.set(currentTime, currentTimeValue2);
        alarmMapFinal.push(alarmMap2);
      }

      // console.log(alarmMapFinal);
      // add the missing values in intervals of 60s between the times
      const resultMap = new Map();
      const returnArrayMap = [];
      for (const alarmMap of alarmMapFinal) {
        console.log("CADA Ciclo->", alarmMap);
        const keys = Array.from(alarmMap.keys());
        keys.sort((a, b) => a - b);
        let currentNum = keys[0];
        let lastString = alarmMap.get(currentNum);

        for (let i = 1; i < keys.length; i++) {
          const nextNum = keys[i];
          resultMap.set(currentNum, alarmMap.get(currentNum));
          while (currentNum + 60000 < nextNum) {
            currentNum += 60000;
            resultMap.set(currentNum, lastString);
          }
          currentNum = nextNum;
          lastString = alarmMap.get(currentNum);
        }
        resultMap.set(keys[keys.length - 1], alarmMap.get(keys[keys.length-1]));

        // Convert timeStamp mills to HH:MM:SS
        const finalArray = Array.from(resultMap).map(([timestamp, value]) => {
          const dateTime = new Date(timestamp);
          const options = {timeZone: "Europe/Lisbon"};
          const timeString = dateTime.toLocaleTimeString("pt-PT", options);
          return [timeString, value];
        });
        // Just send the Last 60 Values
        returnArrayMap.push(finalArray.slice(-60));
      }

      // console.log("Final->", returnArrayMap);
      // Return the final Array
      return Array.from(returnArrayMap);
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new functions.https.HttpsError("internal", "Internal Server Error");
  }
});
