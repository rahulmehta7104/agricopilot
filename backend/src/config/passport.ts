import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../lib/prisma';

// Use placeholder or env variables for Google credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error('No email found from Google profile'), undefined);
        }
        
        const email = profile.emails[0]?.value;
        if (!email) {
          return done(new Error('Email value missing from Google profile'), undefined);
        }
        
        const googleId = profile.id;
        const name = profile.displayName;

        // Find existing user by googleId or email
        let user = await prisma.user.findFirst({
          where: {
            OR: [
              { googleId: googleId },
              { email: email }
            ]
          }
        });

        if (user) {
          // If user exists but doesn't have googleId linked, link it
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId, name: user.name || name },
            });
          }
          return done(null, user);
        }

        // If user doesn't exist, create a new one
        user = await prisma.user.create({
          data: {
            email,
            googleId,
            name,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;
