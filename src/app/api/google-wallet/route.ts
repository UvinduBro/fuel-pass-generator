import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { vehicleNumber } = await req.json();

    // Requires a real Google Cloud Service Account with Google Wallet API enabled
    // and an issuer ID.
    const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || "MOCK_ISSUER_ID";
    const classId = `${issuerId}.FuelPassClass`;
    const objectId = `${issuerId}.${(vehicleNumber || 'MOCK').replace(/\\s/g, '')}`;

    // Mock Payload
    const claims = {
      iss: process.env.GOOGLE_WALLET_CLIENT_EMAIL || "mock@mock.gserviceaccount.com",
      aud: "google",
      typ: "savetowallet",
      iat: Math.floor(Date.now() / 1000),
      origins: [],
      payload: {
        genericObjects: [{
          id: objectId,
          classId: classId,
          genericType: "GENERIC_TYPE_UNSPECIFIED",
          hexBackgroundColor: "#cc0000",
          logo: {
            sourceUri: {
              uri: "https://fuelpass.gov.lk/images/logo.png"
            }
          },
          cardTitle: {
            defaultValue: {
              language: "en",
              value: "Fuel Pass"
            }
          },
          subheader: {
            defaultValue: {
              language: "en",
              value: "Vehicle Number"
            }
          },
          header: {
            defaultValue: {
              language: "en",
              value: vehicleNumber || "WP CAA 1234"
            }
          },
          barcode: {
            type: "QR_CODE",
            value: vehicleNumber || "mock_qr_data",
            alternateText: vehicleNumber || "mock_qr_data"
          }
        }]
      }
    };

    // Sign with a dummy key if env var is missing
    const privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY || "MOCK_PRIVATE_KEY_DONT_USE_IN_PROD";
    
    let token = "mock_token";
    try {
      token = jwt.sign(claims, privateKey, { algorithm: 'RS256' });
    } catch {
      // RS256 requires a valid PEM key. Fallback to HS256 for mock token generation
      token = jwt.sign(claims, "mock_secret_key");
    }

    const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

    return NextResponse.json({ url: saveUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
