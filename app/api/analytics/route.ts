import { NextRequest } from 'next/server';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to view analytics
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const entityType = searchParams.get('entity_type') as 'blog_post' | 'portfolio_project' | 'page' | undefined;

    // Get analytics summary
    const summary = await db.getAnalyticsSummary(days);

    // Get top content if entity type is specified
    let topContent = null;
    if (entityType) {
      topContent = await db.getTopContent(entityType, 10);
    }

    // Get recent analytics data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all analytics and filter by date manually since findMany doesn't support date operators
    const allAnalytics = await db.findMany('analytics', {});
    const recentAnalytics = allAnalytics.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });

    // Group analytics by date for chart data
    const chartData = new Map<string, { views: number; uniqueViews: number }>();
    recentAnalytics.forEach(record => {
      const dateKey = record.date.toISOString().split('T')[0];
      const existing = chartData.get(dateKey) || { views: 0, uniqueViews: 0 };
      chartData.set(dateKey, {
        views: existing.views + record.page_views,
        uniqueViews: existing.uniqueViews + record.unique_views
      });
    });

    // Convert to sorted array
    const sortedChartData = Array.from(chartData.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({ date, ...data }));

    return createSuccessResponse({
      summary,
      topContent,
      chartData: sortedChartData,
      recentAnalytics: recentAnalytics.slice(0, 20), // Last 20 records
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return createErrorResponse('Failed to fetch analytics', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entityType, entityId, referrer, userAgent, ipAddress, country, city } = body;

    if (!entityType || !entityId) {
      return createErrorResponse('Missing required fields', 400);
    }

    // Track the page view
    const analyticsRecord = await db.trackPageView(
      entityType as 'blog_post' | 'portfolio_project' | 'page',
      entityId,
      {
        referrer,
        userAgent,
        ipAddress,
        country,
        city,
      }
    );

    return createSuccessResponse(analyticsRecord, 201);
  } catch (error) {
    console.error('Failed to track page view:', error);
    return createErrorResponse('Failed to track page view', 500);
  }
}
