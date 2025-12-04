import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ArrowDownCircleIcon, BanIcon, CheckCircle, Clock, CoinsIcon, DollarSign, Edit, Eye, EyeIcon, EyeOffIcon, LockIcon, Plus, StarIcon, TrashIcon, TrendingUp, User, WalletIcon, XCircle } from "lucide-react"
import StatCard from "../components/StatCard"
import { platformIcons } from "../assets/assets"
import { useState } from "react"

const MyListings = () => {
    const { userListings, balance } = useSelector((state) => state.listing)
    const currency = import.meta.env.VITE_CURRENCY || '$'
    const navigate = useNavigate()
    const [showcredentialSubmsion, setShowCredentialSubmission] = useState(null)
    const [showWithdrawal,setShowWithdrawal] = useState(null)

    const totalValue = userListings.reduce((sum, listing) => sum + (listing.price || 0), 0);
    const activeListings = userListings.filter((listing) => listing.status === "active").length
    const soldListins = userListings.filter((listing) => listing.status === "sold").length

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + "K"
        }

        return num?.toString() || "0"
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return <CheckCircle className="size-3.5" />
            case "ban":
                return <BanIcon className="size-3.5" />
            case "sold":
                return <DollarSign className="size-3.5" />
            case "inactive":
                return <XCircle className="size-3.5" />
            default:
                return <Clock className="size-3.5" />

        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "text-green-800"
            case "ban":
                return "text-red-800"
            case "sold":
                return "text-indigo-800"
            case "inactive":
                return "text-gray-800"
            default:
                return "text-gray-800"

        }
    }

    const toggleStatus = async (listingId) => {

    }

    const deleteListing = async (listingId) => {

    }

    const markAsfeatured = async (listingId) => {

    }
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
                    <p className="text-gray-600 mt-1">Manage your social media account listings</p>
                </div>
                <button onClick={() => navigate(`/create-listing`)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-medium flex items-center space-x-2 mt-4 md:mt-0">
                    <Plus className="size-4" />
                    <span>New Listing</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Listings" value={userListings.length} icon={<Eye className="size-6 text-indigo-600" />} color="indigo" />
                <StatCard title="Active Listings" value={activeListings} icon={<CheckCircle className="size-6 text-green-600" />} color="green" />
                <StatCard title="Sold" value={soldListins} icon={<TrendingUp className="size-6 text-indigo-600" />} color="indigo" />
                <StatCard title="Total Value" value={`${currency} ${totalValue.toLocaleString()}`} icon={<DollarSign className="size-6 text-yellow-600" />} color="yellow" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 xl:gap-20 p-6 mb-10 bg-white rounded-xl border border-gray-200">
                {
                    [
                        { label: 'Earned', value: balance.earned, icon: WalletIcon },
                        { label: 'Withdrawn', value: balance.withdrawn, icon: ArrowDownCircleIcon },
                        { label: 'Available', value: balance.available, icon: CoinsIcon },
                    ].map((item, index) => (
                        <div className="flex flex-1 items-center justify-between p-4 rounded-lg border border-gray-100 cursor-pointer" key={index}>
                            <div className="flex items-center gap-3">
                                <item.icon className="text-gray-500 w-6 h-6" />
                                <span className="font-medium text-gray-600">{item.label}</span>
                            </div>
                            <span className="text-xl font-medium text-gray-700">
                                {currency}
                                {item.value.toFixed(2)}
                            </span>
                        </div>
                    ))
                }
            </div>
            {userListings.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-6">Start by creating your listing</p>
                    <button onClick={() => navigate("/create-listing")} className="bg-indigo-600 hg:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium" >Create First Listing</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userListings.map((listing) => (
                        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg shadow-gray-200/70 transition-shadow" key={listing.id}>
                            <div className="p-6">
                                <div className="flex items-start gap-4 justify-between mb-4">
                                    {platformIcons[listing.platform]}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-gray-800">{listing.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="relative group">
                                                    <LockIcon size={14} />
                                                    <div className="invisible group-hover:visible absolute right-0 top-0 pt-4.5 z-10">
                                                        <div className="bg-white text-gray-600 text-xs rounded border border-gray-200 p-2 px-3">
                                                            {!listing.isCredentialSubmitted && (
                                                                <>
                                                                    <button className="flex items-center gap-2 text-nowrap">Add Credentials</button>
                                                                    <hr className="border-gray-200 my-2" />
                                                                </>
                                                            )}
                                                            <button className="text-nowrap">
                                                                Status :{" "}
                                                                <span className={
                                                                    listing.isCredentialSubmitted ?
                                                                        listing.isCredentialVerified ?
                                                                            listing.isCredentialChanged
                                                                                ? "text-green-600"
                                                                                : "text-indigo-600"
                                                                            : "text-slate-600"
                                                                        : "text-red-600"
                                                                }>
                                                                    {listing.isCredentialSubmitted ? listing.isCredentialVerified ? listing.isCredentialChanged ? "Changed" : "Verified" : "Submitted" : "Not Submitted"}
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {listing.status === "active" && (
                                                    <StarIcon
                                                        onClick={() => markAsfeatured(listing.id)}
                                                        size={18} className={`text-yellow-500 cursor-pointer ${listing.featured && "fill-yellow-500"}`} />
                                                )}
                                            </div>
                                        </div>
                                        <p>
                                            <span>@{listing.username}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <User className="size-4 text-gray-400" />
                                            <span >{formatNumber(listing.followers_count)} followers</span>
                                        </div>
                                        <span className={`flex items-center justify-end gap-1 ${getStatusColor(listing.status)}`}>
                                            {getStatusIcon(listing.status)}{" "}<span >{listing.status}</span>
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="size-4 text-gray-400" />
                                            <span>{listing.engagement_rate}% engagement</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <span className="text-2xl font-bold text-gray-800">
                                            {currency}
                                            {listing.price.toLocaleString()}
                                        </span>
                                        <div className="flex itens-center space-x-2">
                                            {listing.status !== "sold" && (
                                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-500" onClick={() => deleteListing(listing.id)} >
                                                    <TrashIcon className="size-4" />
                                                </button>
                                            )}
                                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-indigo-600" onClick={() => navigate(`/edit-listing/${listing.id}`)}>
                                                <Edit className="size-4" />
                                            </button>
                                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-bg-gray-50 hover:text-purple-600" onClick={() => toggleStatus(listing.id)}>
                                                {listing.status === "active" && (<EyeOffIcon className="size-4" />)}
                                                {listing.status !== "active" && (<EyeIcon className="size-4" />)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="bg-white border-t border-gray-200 p-4 text-center mt-28">
                <p className="text-sm text-gray-500">
                    Copyright &copy; {new Date().getFullYear()} <span>Diego Vilhalva</span>. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default MyListings