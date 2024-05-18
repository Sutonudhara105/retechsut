import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);
  if (session.user) {
    const products = await Product.find({ soldBy: session.user.email });
    console.log(products);
    const orders = products.filter((product) => {
      return product.orderedBy != null && product.orderedBy.length > 0;
    });
    res.json(orders);
  }
  res.json([]);
}
