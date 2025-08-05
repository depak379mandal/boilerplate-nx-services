import passport from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from 'passport-jwt';

console.log('process.env.JWT_SECRET', process.env['JWT_SECRET']);

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env['JWT_SECRET']!,
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    if (payload && payload.id) {
      return done(null, payload);
    } else {
      return done(null, false);
    }
  })
);

// Initialize Passport once (call this in main.ts)
export const initPassport = (): any => {
  return passport.initialize();
};

// Middleware to protect routes
export const jwtAuthMiddleware = passport.authenticate('jwt', {
  session: false,
});
