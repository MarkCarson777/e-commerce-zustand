import { create } from "zustand";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  query,
  CollectionReference,
  QueryDocumentSnapshot,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";
import { firestore, firebaseAuth, firebaseStorage } from "@/firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { Product } from "@/types";

type ProductStore = {
  loading: boolean;
  products: Product[];
  getProduct: (id: string) => Promise<Product>;
  getProducts: () => Promise<void>;
  getProductsByCategory: (category: string) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  loading: true,
  products: [],
  getProduct: async (id: string) => {
    const docRef = doc(firestore, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Product;

      if (typeof data.image !== "string") {
        throw new Error("Invalid type for image");
      }

      const imageUrl = await getDownloadURL(ref(firebaseStorage, data.image));

      return { ...data, imageUrl };
    } else {
      throw new Error("No such document");
    }
  },
  getProducts: async () => {
    const querySnapshot = await getDocs(collection(firestore, "products"));

    const products = querySnapshot.docs
      .filter((doc) => {
        const data = doc.data();
        return !data.deleted;
      })
      .map(async (doc) => {
        const id = doc.id;
        const data = doc.data() as Product;

        if (typeof data.image !== "string") {
          throw new Error("Invalid type for image");
        }

        const imageUrl = await getDownloadURL(ref(firebaseStorage, data.image));

        return { ...data, id, imageUrl };
      });

    const productsWithImages = await Promise.all(products);

    set({ products: productsWithImages, loading: false });
  },
  getProductsByCategory: async (category: string) => {
    const q = query(
      collection(firestore, "products"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs
      .filter((doc) => {
        const data = doc.data();
        return !data.deleted;
      })
      .map(async (doc) => {
        const id = doc.id;
        const data = doc.data() as Product;

        if (typeof data.image !== "string") {
          throw new Error("Invalid type for image");
        }

        const imageUrl = await getDownloadURL(ref(firebaseStorage, data.image));

        return { ...data, id, imageUrl };
      });

    const productsWithImages = await Promise.all(products);

    set({ products: productsWithImages, loading: false });
  },
  createProduct: async (product: Product) => {
    const ref: CollectionReference<Product> = collection(
      firestore,
      "products"
    ).withConverter({
      toFirestore: (value: WithFieldValue<Product>) => value,
      fromFirestore: (snapshot: QueryDocumentSnapshot) =>
        snapshot.data() as Product,
    });

    const user = firebaseAuth.currentUser;

    if (user) {
      const _product = {
        ...product,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        modifiedBy: user.uid,
        deleted: false,
      };

      try {
        await addDoc(ref, _product);
        console.log("Product created");
      } catch (error) {
        throw new Error((error as Error).message);
      }
    } else {
      throw new Error("User is not authenticated");
    }
  },
  updateProduct: async (id: string, product: Product) => {
    const ref = doc(firestore, "products", id);

    try {
      await updateDoc(ref, {
        ...product,
        modifiedBy: firebaseAuth.currentUser?.uid,
      });
      console.log("Product updated");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  deleteProduct: async (id: string) => {
    const ref = doc(firestore, "products", id);

    try {
      await updateDoc(ref, {
        deleted: true,
      });
      console.log("Product deleted");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
}));
