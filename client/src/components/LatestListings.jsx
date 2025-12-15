import ListingCard from "./ListingCard"
import Title from "./Title"
import { useSelector } from "react-redux"
const LatestListings = () => {

    const { listings } = useSelector(state => state.listing)
    console.log(listings)
    return (
        <div className="mt-20 mb-8">
            <Title title={"Latest Listings"} description={"Discover the hottest social profiles available right now."} />
            <div className="flex flex-col gap-6 px-6">
                { listings.slice(0,4).map((listing) => (
                    <div className="mx-auto w-full max-w-3xl rounded-xl" key={listing.id}>
                       <ListingCard listing={listing} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestListings