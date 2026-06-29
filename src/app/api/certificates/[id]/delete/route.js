import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;
const API_KEY = process.env.API_KEY;

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${BACKEND_URL}/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "X-API-KEY": API_KEY,
          Accept: "application/json",
        },
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