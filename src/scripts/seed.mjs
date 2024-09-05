import { faker } from "@faker-js/faker";
import { firestoreAdmin } from "../firebase/admin.mjs";
import { FieldValue } from "firebase-admin/firestore";

const seedData = async () => {
  // destroy existing products in database
  console.log("Deleting existing products collection");

  // get all products
  const productsSnapshot = await firestoreAdmin.collection("products").get();

  // delete all products
  for (const doc of productsSnapshot.docs) {
    await doc.ref.delete();
  }

  console.log("Deleted existing products collection");

  // create products
  console.log("Starting product creation");

  const productsRef = firestoreAdmin.collection("products");

  for (let i = 0; i < 20; i++) {
    const product = {
      category: ["tops", "pants", "accessories"][i % 3],
      createdAt: FieldValue.serverTimestamp(),
      createdBy: "dRCah3HCEJR47yGRriQu1HASSuv1",
      deleted: false,
      description: faker.lorem.words({ min: 1, max: 20 }),
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42470.appspot.com/o/images%2Fkyle-smith-tlowJ-oYAjU-unsplash.jpg?alt=media&token=5b9f2cbf-b55e-49ca-b276-2339c027b20b",
      modifiedBy: "dRCah3HCEJR47yGRriQu1HASSuv1",
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 0, max: 100 }),
      quantity: faker.number.int({ min: 0, max: 100 }),
      subcategory: ["t-shirts", "jeans", "hats"][i % 3],
    };

    await productsRef.add(product);

    console.log(`Product ${i + 1} successfully created`);
  }

  console.log("Seeding completed");
};

seedData();
