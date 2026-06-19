import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8081";
const API_KEY = "XmoKQLLRC5M3ufz8Y68jXti8bafd9MAn";

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