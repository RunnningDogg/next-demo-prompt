import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

console.log("google client id ", process.env.GOOGLE_CLIENT_ID)
console.log("google client secret ", process.env.GOOGLE_CLIENT_SECRET)

const hanlder = NextAuth({
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    httpOptions: {
      timeout: 40000
    }
  })],

  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();
    return session;
  },

  async signIn({ profile }) {

    try {
      // serverless -> lambda -> dynamodb
      await connectToDatabase();

      // check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // if not create user
      if (!userExists) {
        await User.create({
          username: profile.name.replace(" ", "").toLowerCase(),
          email: profile.email,
          image: profile.image
        })
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

  },

})

export { hanlder as GET, hanlder as POST }