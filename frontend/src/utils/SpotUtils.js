export function showStarRating(spot){
    try {
    if (!spot){
        return "";
    } 
        return spot.avgStarRating == 0 ? "New" : spot.avgStarRating.toFixed(1)
        
    } catch(error) {
        return " "
    }
}