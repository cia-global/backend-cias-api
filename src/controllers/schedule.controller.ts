import { Request, Response } from 'express';
import { supabase } from '../services/supabase.service';
import { supabaseAdmin } from '../services/supabaseAdmin.service';


export const getSchedules = async (req: Request, res: Response) => {
  try {
    const { cityId, onlyActive, admin } = req.query;

   const isAdmin = admin === 'true';

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

     if (!isAdmin) {
      // usuarios normales → solo activos
      query = query.eq('is_active', true);
    } else if (onlyActive === 'true') {
      // admin forzando solo activos
      query = query.eq('is_active', true);
    } else if (onlyActive === 'false') {
      // admin forzando solo inactivos
      query = query.eq('is_active', false);
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
  console.log('🔁 toggleScheduleStatus llamado');

  try {

    const { id } = req.params;
    const { is_active } = req.body;

    // 2️⃣ Validaciones básicas
    if (!id) {
      console.warn('⚠️ ID no recibido en params');
      return res.status(400).json({
        success: false,
        error: 'ID de horario requerido',
      });
    }

    if (typeof is_active !== 'boolean') {
      console.warn('⚠️ is_active no es boolean:', is_active);
      return res.status(400).json({
        success: false,
        error: 'is_active debe ser boolean',
      });
    }

    // 3️⃣ Ejecutar update en Supabase
    const { data, error } = await supabaseAdmin
      .from('schedules')
      .update({ is_active })
      .eq('id', id)
      .select()
      ;


    if (error) {
      console.error('❌ Error Supabase:', error);
      throw error;
    }
    return res.json({
      success: true,
      data,
    });

  } catch (error: any) {
    console.error('🔥 Error en toggleScheduleStatus:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Error interno del servidor',
    });
  }
};