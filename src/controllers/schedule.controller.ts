import { Request, Response } from 'express';
import { supabase } from '../services/supabase.service';


export const getSchedules = async (req: Request, res: Response) => {
  try {
    const { cityId, onlyActive } = req.query;

    let query = supabase
      .from('schedules')
      .select(`
        id,
        city_id,
        day_of_week,
        start_time,
        end_time,
        is_active,
        created_at,
        cities (
          id,
          name
        )
      `)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });

    if (cityId) {
      query = query.eq('city_id', cityId);
    }

    if (onlyActive === 'true') {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { city_id, day_of_week, start_time, end_time } = req.body;

    const { data, error } = await supabase
      .from('schedules')
      .insert([
        {
          city_id,
          day_of_week,
          start_time,
          end_time,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const toggleScheduleStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const { error } = await supabase
      .from('schedules')
      .update({ is_active })
      .eq('id', id);

    if (error) throw error;

    return res.json({
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};