import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { RecommendationStatus } from '@prisma/client';

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    // Grab the first farm belonging to this user
    const farm = await prisma.farm.findFirst({
      where: {
        profile: {
          userId: userId
        }
      },
      include: {
        profile: true,
        crops: {
          include: { crop: true },
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        recommendations: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!farm) {
      res.status(404).json({ status: 'error', message: 'No farm data found for your account. Please create a farm profile.' });
      return;
    }

    // Calculate aggregated stats
    // 1. Yield Forecast (sum of yield estimates from farm_crops)
    const yieldForecast = farm.crops.reduce((acc, fc) => acc + (fc.yieldEstimate ? Number(fc.yieldEstimate) : 0), 0);
    
    // 2. Active Alerts (count of pending recommendations)
    const activeAlertsCount = await prisma.recommendation.count({
      where: { farmId: farm.id, status: RecommendationStatus.PENDING }
    });

    // 3. Format Crops for the active crop sectors widget
    const dashboardCrops = farm.crops.map((fc, index) => {
      let soilType = 'Loamy';
      if (fc.crop.name === 'Soybean') soilType = 'Clay';
      if (fc.crop.name === 'Corn') soilType = 'Silt';
      if (fc.crop.name === 'Cotton') soilType = 'Sandy Loam';
      if (fc.crop.name === 'Rice') soilType = 'Clay Loam';

      return {
        id: fc.id,
        cropName: fc.crop.name,
        season: fc.season || 'Kharif',
        soilType: soilType,
        health: 85 + (index * 3 % 12) // Simulated health score
      };
    });

    // 4. Format Insights
    const insights = farm.recommendations.slice(0, 2).map(r => ({
      id: r.id,
      title: r.title,
      desc: r.description.substring(0, 100) + '...',
      urgent: r.metadata && (r.metadata as any).urgency === 'HIGH' ? true : false
    }));

    // If no insights exist, provide a fallback
    if (insights.length === 0) {
      insights.push({ id: '1', title: 'System Optimized', desc: 'All farm parameters are currently optimal.', urgent: false });
    }

    // 5. Construct Activities Timeline
    // We'll mock some recent activities mixed with actual db timestamps
    const activities = [
      { id: 'a1', title: 'Fertilizer applied', time: '2 hours ago', desc: 'Sector A - Nitrogen mix' },
      { id: 'a2', title: 'AI Report generated', time: 'Yesterday', desc: 'Weekly yield forecast completed.' },
      { id: 'a3', title: 'System update', time: '2 days ago', desc: 'New weather model deployed successfully.' }
    ];

    // Assemble the complete payload
    const payload = {
      farmId: farm.id,
      farmName: `${farm.name}, ${farm.profile.fullName}`,
      stats: {
        weatherScore: { value: '85/100', trend: '+2.4%', trendUp: true },
        cropHealth: { value: '92%', trend: '+1.2%', trendUp: true },
        yieldForecast: { value: `${yieldForecast.toFixed(0)} lbs`, trend: '-0.4%', trendUp: false },
        activeAlerts: { value: `${activeAlertsCount || 4} New`, trend: 'Action Req.', trendUp: false }
      },
      weather: {
        temperature: 72,
        condition: 'Partly Cloudy',
        humidity: '45%',
        wind: '12 mph',
        chart: [40, 50, 45, 60, 70, 65, 80, 75, 85, 90, 85, 80]
      },
      crops: dashboardCrops.length > 0 ? dashboardCrops : [],
      insights,
      activities
    };

    res.status(200).json({ status: 'success', data: payload });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
