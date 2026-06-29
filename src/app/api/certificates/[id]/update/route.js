import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;
const API_KEY = process.env.API_KEY;

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}