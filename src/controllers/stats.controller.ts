import { Request, Response } from 'express';
import { supabase } from '../services/supabase.service';

export const getStats = async (req: Request, res: Response) => {
  try {
    // Obtener la fecha actual en zona horaria de Colombia (UTC-5)
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Calcular el inicio y fin de la semana (Lunes a Domingo)
    const startOfWeek = getStartOfWeek(now);
    const endOfWeek = getEndOfWeek(now);

    // 1️⃣ Citas agendadas para HOY
    const { count: appointmentsToday, error: todayError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('appointment_date', today);

    if (todayError) throw todayError;

    // 2️⃣ Citas agendadas para ESTA SEMANA
    const { count: appointmentsThisWeek, error: weekError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .gte('appointment_date', startOfWeek)
      .lte('appointment_date', endOfWeek);

    if (weekError) throw weekError;

    // 3️⃣ Citas PENDIENTES en general
    const { count: pendingAppointments, error: pendingError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (pendingError) throw pendingError;

    // 4️⃣ Ciudades ACTIVAS
    const { count: activeCities, error: citiesError } = await supabase
      .from('cities')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (citiesError) throw citiesError;

    // 5️⃣ BONUS: Estadísticas adicionales útiles
    const { count: totalAppointments, error: totalError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true });

    if (totalError) throw totalError;

    const { count: completedAppointments, error: completedError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    if (completedError) throw completedError;

    const { count: cancelledAppointments, error: cancelledError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'cancelled');

    if (cancelledError) throw cancelledError;

    const stats = {
      appointmentsToday: appointmentsToday || 0,
      appointmentsThisWeek: appointmentsThisWeek || 0,
      pendingAppointments: pendingAppointments || 0,
      activeCities: activeCities || 0,
      // Estadísticas adicionales
      totalAppointments: totalAppointments || 0,
      completedAppointments: completedAppointments || 0,
      cancelledAppointments: cancelledAppointments || 0,
      // Metadata
      calculatedAt: new Date().toISOString(),
      dateRange: {
        today,
        weekStart: startOfWeek,
        weekEnd: endOfWeek,
      },
    };

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error('❌ Error en getStats:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas',
      details: error.message,
    });
  }
};

// Función auxiliar: Obtener el lunes de esta semana
function getStartOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Domingo) a 6 (Sábado)
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajustar al lunes
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

// Función auxiliar: Obtener el domingo de esta semana
function getEndOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (7 - day) % 7; // Ajustar al domingo
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}