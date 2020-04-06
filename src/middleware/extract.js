import njwt from "njwt";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET;

const extractid = (headers) => {
  const token = headers.authorization.split(" ")[1];
  return njwt.verify(token, secret);
};

export default extractid;
