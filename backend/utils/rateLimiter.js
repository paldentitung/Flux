import rateLimit from "express-rate-limit";

export const createLimiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
  });

// ─── Auth (brute-force targets — keep tight) ──────────────────────────────────

export const loginLimiter = createLimiter(
  15, // 15-minute window
  10, // 10 attempts — enough for a real user, painful for a brute-forcer
  "Too many login attempts. Please try again after 15 minutes.",
);

export const registerLimiter = createLimiter(
  60, // 1-hour window
  5, // 5 accounts/hour — generous for legit use, stops bulk signups
  "Too many accounts created. Please try again after an hour.",
);

export const verifyEmailLimiter = createLimiter(
  15, // 15-minute window
  5, // gates an email-send — keep tight to avoid spam vector
  "Too many verification attempts. Please try again after 15 minutes.",
);

export const changePasswordLimiter = createLimiter(
  60, // 1-hour window — sensitive action
  5, // 5 attempts/hour is plenty for a legitimate user
  "Too many password change attempts. Please try again later.",
);

export const resendOtpLimiter = createLimiter(
  15, // 15-minute window
  3, // 3 resends — if the email didn't arrive in 3 tries, it's not coming
  "Too many OTP requests. Please try again after 15 minutes.",
);

export const resetPasswordLimiter = createLimiter(
  60, // 1-hour window
  3, // 3 reset emails/hour — stops reset-link flooding
  "Too many password reset requests. Please try again later.",
);

// ─── User profile ─────────────────────────────────────────────────────────────

export const changeAvatarLimiter = createLimiter(
  60, // 1-hour window — storage writes are expensive
  5, // 5 changes/hour covers any real user
  "Too many avatar changes. Please try again later.",
);

export const updateProfileLimiter = createLimiter(
  15, // 15-minute window
  10, // 10 edits/15 min — covers real editing sessions
  "Too many profile updates. Please slow down.",
);

// ─── Posts ────────────────────────────────────────────────────────────────────

export const createPostLimiter = createLimiter(
  60, // 1-hour window
  10, // 10 posts/hour — reasonable for a power user, throttles spam bots
  "You're posting too fast. Please wait before creating another post.",
);

export const updatePostLimiter = createLimiter(
  15, // 15-minute window
  20, // 20 edits/15 min — covers active editing without being restrictive
  "Too many post updates. Please slow down.",
);

export const deletePostLimiter = createLimiter(
  15, // 15-minute window
  10, // 10 deletes/15 min — bulk deletion is a red flag
  "Too many post deletions. Please slow down.",
);

// ─── Social ───────────────────────────────────────────────────────────────────

export const createCommentLimiter = createLimiter(
  5, // 5-minute window
  15, // 15 comments/5 min — active discussion, but stops spam floods
  "You're commenting too fast. Please slow down.",
);

export const likeLimiter = createLimiter(
  1, // 1-minute window
  30, // 30 likes/min — fast scrollers like fast; bots like faster
  "Too many like actions. Please slow down.",
);

export const followLimiter = createLimiter(
  60, // 1-hour window — aggressive following is an abuse vector
  50, // 50 follows/hour is generous for organic growth
  "Too many follow requests. Please slow down.",
);

// ─── Search ───────────────────────────────────────────────────────────────────

export const searchLimiter = createLimiter(
  1, // 1-minute window
  30, // 30 searches/min — covers fast typists with debounce; blocks scrapers
  "Too many search requests. Please slow down.",
);
