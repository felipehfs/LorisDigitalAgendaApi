const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/user");
const passport = require("passport");
const profileHandler = require("../controllers/profile");
const journalHandler = require("../controllers/journal");

router.get("/", async (req, res) => res.send("Hello world"));
router.post("/register", userHandler.register);
router.post("/login", userHandler.logIn);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileHandler.getProfile
);

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileHandler.create
);
router.put(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  profileHandler.update
);

router.post(
  "/journals",
  passport.authenticate("jwt", { session: false }),
  journalHandler.create
);

router.put(
  "/journals/:id",
  passport.authenticate("jwt", { session: false }),
  journalHandler.changeJournal
);

router.get(
  "/journals",
  passport.authenticate("jwt", { session: false }),
  journalHandler.getUserJournals
);

router.get(
  "/journals/archived",
  passport.authenticate("jwt", { session: false }),
  journalHandler.getArchivedJournals
);

router.get(
  "/journals/all",
  passport.authenticate("jwt", { session: false }),
  journalHandler.getAllJournals
);

router.get(
  "/journals/:id/search",
  passport.authenticate("jwt", { session: false }),
  journalHandler.findJournalById
);


module.exports = router;
