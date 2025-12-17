import express from "express"
import { protectAdmin } from "../middlewares/auth.middleware.js"
import { changeCredential, changeStatus, getAllListings, getAllTransactions, getAllUnchangedListings, getAllUnverifiedListings, getAllWithdrawRequests, getCredential, getDashboard, isAdmin, markCredentialVerified, markWithdrawalAsPaid } from "../controllers/admin.controller.js"

const router = express.Router()


router.get("/isAdmin", protectAdmin, isAdmin)
router.get("/dashboard", protectAdmin, getDashboard)
router.get("/all-listings", protectAdmin, getAllListings)
router.put("/change-status/:listingId", protectAdmin, changeStatus)
router.get("/unverified-listings", protectAdmin, getAllUnverifiedListings)
router.get("/credential/:listingId", protectAdmin, getCredential)
router.put("/verify-credential/:listingId", protectAdmin, markCredentialVerified)
router.get("/unchanged-listings", protectAdmin, getAllUnchangedListings)
router.put("/change-credential/:listingId", protectAdmin, changeCredential)
router.get("/transactions",protectAdmin,getAllTransactions)
router.get("/withdraw-requests",protectAdmin,getAllWithdrawRequests)
router.put("/withdrawal-mark/:id",protectAdmin,markWithdrawalAsPaid)


export default router