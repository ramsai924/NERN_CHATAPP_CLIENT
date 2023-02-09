import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    providers: [
        GoogleProvider({
            clientId: '720378457104-3fb691qm94kp9140ch7stpkq6h3f5utc.apps.googleusercontent.com',
            clientSecret: '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'
        })
    ],
    secret: '9b80459608c3a486131cf7d4afca68cb'
})