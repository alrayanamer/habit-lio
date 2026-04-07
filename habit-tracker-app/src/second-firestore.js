import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  addDoc,
  where,
  limit,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "./firebase";

export const loadAffirmations = async (userId) => {
  const affirmationsRef = collection(db, "users", userId, "userInfo", "affirmations");
  const q = query(affirmationsRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    const affirmations = [];
    querySnapshot.forEach((doc) => {
      affirmations.push({ id: doc.id, ...doc.data() });
    });
    return affirmations;
};