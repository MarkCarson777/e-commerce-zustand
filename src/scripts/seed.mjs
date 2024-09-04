import { firestoreAdmin } from "../firebase/admin.mjs";

const seedData = async () => {
  const productsRef = firestoreAdmin.collection("products");
  const products = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
    { name: "Product 3", price: 300 },
  ];
  for (const product of products) {
    await productsRef.add(product);
  }
  console.log("Seeded products collection");
};

seedData();
