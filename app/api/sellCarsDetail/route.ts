import {  getAllSellCarDetails } from '@/actions/sellCar.action';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const result=await getAllSellCarDetails();
         if (!result.success) {
            return NextResponse.json(
                { error: result.message || "Failed to fetch categories" },
                { status: 500 }
            );
        }

        return NextResponse.json(result , { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
