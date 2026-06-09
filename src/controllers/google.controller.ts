import { Request, Response } from "express";
import { supabase } from "../services/supabase.service";
import { syncCityReviews } from "../services/reviews.service";

export const syncSingleCity = async (
  req: Request,
  res: Response
) => {
  try {
    const { cityId } = req.params;

    const { data: city } = await supabase
      .from("cities")
      .select("id,placeId,name")
      .eq("id", cityId)
      .single();

    if (!city) {
      return res.status(404).json({
        error: "Ciudad no encontrada",
      });
    }

    const result =
      await syncCityReviews(
        city.id,
        city.placeId
      );

    return res.json({
      success: true,
      city: city.name,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCityReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const { cityId } = req.params;

 
    const { data, error } = await supabase
      .from("google_reviews")
      .select("*")
      .eq("city_id", cityId)
      .order("publish_time", {
        ascending: false,
      });

    res.json(data);
  } catch (error) {
    console.error("ERROR GENERAL:", error);
    res.status(500).json({
      error: "Error obteniendo reseñas",
    });
  }
};

export const getReviewsStats = async (
  req: Request,
  res: Response
) => {
  try {

    const { data, error } = await supabase
      .from("cities")
      .select(
        "google_rating, google_reviews_count"
      );

    if (error) throw error;

    const totalReviews = data.reduce(
      (sum, city) =>
        sum + (city.google_reviews_count || 0),
      0
    );

    const averageRating =
      data.length > 0
        ? (
            data.reduce(
              (sum, city) =>
                sum + (city.google_rating || 0),
              0
            ) / data.length
          ).toFixed(1)
        : 0;

    return res.json({
      success: true,
      totalReviews,
      averageRating,
      totalCities: data.length,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};