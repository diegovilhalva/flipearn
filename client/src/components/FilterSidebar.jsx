import { ChevronDown, Filter, X } from "lucide-react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"


const FilterSidebar = ({ showFilterPhone, setShowFilterPhone, filters, setFilters }) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const currency = import.meta.env.VITE_CURRENCY || "$" 
    const [search, setSearch] = useState(searchParams.get("search") || "")

    const onChangeSearch = (e) => {
        if (e.target.value) {
            setSearchParams({ search: e.target.value })
            setSearch(e.target.value)
        } else {
            navigate(`/marketplace`)
            setSearch("")
        }
    }

    const [expandedSections, setExpandedSections] = useState({
        platform: true,
        price: true,
        followers: true,
        niche: true,
        status: true
    })
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const onFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters })
    }

    const platforms = [
        { value: "youtube", label: "YouTube" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "twitter", label: "Twitter" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitch", label: "Twitch" },
        { value: "discord", label: "Discord" }
    ]
    return (
        <div className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"} max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24 md:min-w-[300px]`}>
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center sapce-x-2 text-gray-700">
                        <Filter className="size-4" />
                        <h3 className="font-semibold">Filters</h3>
                    </div>
                    <div className="flex items-centr gap-2">
                        <X className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer" />
                        <button onClick={() => setShowFilterPhone(false)} className="sm:hidden text-sm border text-gray-700 px-3 py-1 rounded">Apply</button>
                    </div>
                </div>
            </div>
            <div className="p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar">
                <div className="flex items-center justify-between">
                    <input type="text" placeholder="Search by username, platform,niche,etc." className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md outline-indigo-500" onChange={onChangeSearch} value={search} />
                </div>
                <div >
                    <button onClick={() => toggleSection("platform")} className="flex items-center justify-between w-full mb-3">
                        <label htmlFor="" className="text-sm font-medium text-gray-800">Platform</label>
                        <ChevronDown className={`size-4 transition-transform ${expandedSections.platform ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSections.platform && (
                        <div className="flex flex-col gap-2">
                            {platforms.map((platform) => (
                                <label htmlFor="" key={platform.value} className="flex items-center gap-2 text-gray-700 text-sm">
                                    <input type="checkbox" checked={filters.platform?.includes(platform.value) || false} onChange={(e) => {
                                        const checked = e.target.checked
                                        const current = filters.platform || []
                                        const updated = checked ? [...current, platform.value] : current.filter((p) => p !== platform.value)
                                        onFilterChange({
                                            ...filters,
                                            platform: updated.length > 0 ? updated : null
                                        })
                                    }} />
                                    <span>{platform.label}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <div >
                    <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full mb-3">
                        <label htmlFor="" className="text-sm font-medium text-gray-800">Price Range</label>
                        <ChevronDown className={`size-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSections.price && (
                        <div className="space-y-3">
                            <input type="range" min='0' max="100000" step="100" value={filters.maxPrice  || 1000000} onChange={(e) => onFilterChange({...filters,maxPrice:parseInt(e.target.value)})} className="w-full  h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>{currency}0</span>
                                    <span>{currency}{(filters.maxPrice || 100000).toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar