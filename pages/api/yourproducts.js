import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const validateProduct = (category) => {
  if (category === "") {
    throw Error("Category is missing");
  }
};

const validateOwner = (currentProduct, owner) => {
  if (currentProduct.soldBy !== owner) {
    throw Error("Product owners mismatch");
  }
};

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);
  //   await isAdminRequest(req, res);

  if (method === "GET") {
    if (!session.user) {
      res.json([]);
    }
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query.id });
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find({ soldBy: session.user.email }));
    }
  }

  if (method === "POST") {
    const { title, description, price, images, category, properties } =
      req.body;
    if (!session.user) {
      res.json({
        Error: "User is not logged in",
      });
    }
    const soldBy = session.user.email;
    if (category !== "") {
      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
        soldBy,
      });
      res.json(productDoc);
    }
    res.json({
      Error: "You must select a category. Add a category if required",
    });
  }

  if (method === "PUT") {
    const { title, description, price, images, category, properties, _id } =
      req.body;
    // Validate Product
    try {
      validateProduct(category);
      if (!session.user) {
        res.json({
          Error: "User is not logged in",
        });
      }
      const soldBy = session.user.email;
      const currentProduct = await Product.findOne({
        _id: req.query.id,
        soldBy: session.user.email,
      });
      if (currentProduct.soldBy !== soldBy) {
        res.json({ Error: "Product owner mismatch" });
      }
      await Product.updateOne(
        { _id },
        { title, description, price, images, category, properties, soldBy }
      );
      res.json(true);
    } catch {
      res.json({
        Error: "You must select a category. Add a category if required",
      });
    }
  }

  if (method === "DELETE") {
    if (!session.user) {
      res.json({
        Error: "User is not logged in",
      });
    }
    if (req.query?.id) {
      const soldBy = session.user.email;
      const currentProduct = await Product.findOne({
        _id: req.query.id,
        soldBy: session.user.email,
      });
      if (currentProduct.soldBy !== soldBy) {
        res.json({ Error: "Product owner mismatch" });
      }
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
