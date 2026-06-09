import { supabaseAdmin } from "./supabaseAdmin.service";
import { getPlaceDetails } from "./googlePlaces.service";

export async function syncCityReviews(
  cityId: string,
  placeId: string
) {
  const placeData = await getPlaceDetails(placeId);

  // actualizar ciudad
  const cityUpdate = await supabaseAdmin
    .from("cities")
    .update({
      google_rating: placeData.rating,
      google_reviews_count:
        placeData.userRatingCount,
      reviews_last_sync: new Date(),
    })
    .eq("id", cityId);
  // eliminar reseñas anteriores
  await supabaseAdmin
    .from("google_reviews")
    .delete()
    .eq("city_id", cityId);

  const reviews =
    placeData.reviews?.map((review: any) => ({
      city_id: cityId,

      author_name:
        review.authorAttribution?.displayName,

      author_photo:
        review.authorAttribution?.photoUri,

      rating:
        review.rating,

      review_text:
        review.text?.text || null,

      review_url:
        review.authorAttribution?.uri,

      publish_time:
        review.publishTime,
    })) || [];

  if (reviews.length) {
   await supabaseAdmin
  .from("google_reviews")
  .insert(reviews);
  }

  return {
    rating: placeData.rating,
    reviewsCount:
      placeData.userRatingCount,
    reviewsSaved:
      reviews.length,
  };
}

