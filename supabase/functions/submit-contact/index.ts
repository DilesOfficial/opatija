import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  destination?: string;
  numTravelers?: number;
  travelDates?: string;
  budget?: string;
  travelerTypes?: string[];
  experienceTypes?: string[];
  additionalRequests?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactSubmission = await req.json();

    // Validate required fields
    if (!data.fullName || !data.email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Save to database
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        destination: data.destination || null,
        num_travelers: data.numTravelers || null,
        travel_dates: data.travelDates || null,
        budget: data.budget || null,
        traveler_types: data.travelerTypes || [],
        experience_types: data.experienceTypes || [],
        additional_requests: data.additionalRequests || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Submission saved:", submission.id);

    // Send emails using Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (RESEND_API_KEY) {
      // Send confirmation email to customer
      const customerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Opatija Travel <onboarding@resend.dev>",
          to: [data.email],
          subject: "Thank you for your inquiry - Opatija Travel",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Georgia', serif; background-color: #faf9f7; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #1a2744, #2a3a5c); padding: 40px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 400; }
                .header span { color: #d4a853; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; }
                .content { padding: 40px; }
                .content h2 { color: #1a2744; font-size: 24px; margin-bottom: 20px; }
                .content p { color: #555; line-height: 1.8; font-size: 16px; }
                .gold-line { width: 60px; height: 2px; background: #d4a853; margin: 20px 0; }
                .footer { background: #f5f3ef; padding: 30px; text-align: center; }
                .footer p { color: #888; font-size: 14px; margin: 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Opatija</h1>
                  <span>Travel</span>
                </div>
                <div class="content">
                  <h2>Thank you, ${data.fullName}!</h2>
                  <div class="gold-line"></div>
                  <p>We have received your travel inquiry and are excited to help you plan your next journey.</p>
                  <p>One of our travel specialists will review your request and get back to you within 24-48 hours with personalized recommendations tailored to your preferences.</p>
                  <p>In the meantime, feel free to dream about your upcoming adventure!</p>
                  <p style="margin-top: 30px;">Warm regards,<br><strong>The Opatija Travel Team</strong></p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Opatija Travel. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      });

      if (customerEmailResponse.ok) {
        console.log("Customer confirmation email sent");
      } else {
        console.error("Failed to send customer email:", await customerEmailResponse.text());
      }

      // Send notification email to admin (change email to your actual admin email)
      const adminEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Opatija Travel <onboarding@resend.dev>",
          to: ["delivered@resend.dev"], // Change this to your actual admin email
          subject: `New Travel Inquiry from ${data.fullName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; }
                h1 { color: #1a2744; border-bottom: 2px solid #d4a853; padding-bottom: 10px; }
                .field { margin-bottom: 15px; }
                .field label { font-weight: bold; color: #333; display: block; margin-bottom: 5px; }
                .field span { color: #555; }
                .list { background: #f9f9f9; padding: 10px; border-radius: 4px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>New Travel Inquiry</h1>
                
                <div class="field">
                  <label>Name:</label>
                  <span>${data.fullName}</span>
                </div>
                
                <div class="field">
                  <label>Email:</label>
                  <span>${data.email}</span>
                </div>
                
                ${data.phone ? `<div class="field"><label>Phone:</label><span>${data.phone}</span></div>` : ""}
                
                ${data.country ? `<div class="field"><label>Country:</label><span>${data.country}</span></div>` : ""}
                
                ${data.destination ? `<div class="field"><label>Destination:</label><span>${data.destination}</span></div>` : ""}
                
                ${data.numTravelers ? `<div class="field"><label>Number of Travelers:</label><span>${data.numTravelers}</span></div>` : ""}
                
                ${data.travelDates ? `<div class="field"><label>Travel Dates:</label><span>${data.travelDates}</span></div>` : ""}
                
                ${data.budget ? `<div class="field"><label>Budget:</label><span>${data.budget}</span></div>` : ""}
                
                ${data.travelerTypes && data.travelerTypes.length > 0 ? `
                  <div class="field">
                    <label>Traveler Types:</label>
                    <div class="list">${data.travelerTypes.join(", ")}</div>
                  </div>
                ` : ""}
                
                ${data.experienceTypes && data.experienceTypes.length > 0 ? `
                  <div class="field">
                    <label>Experience Types:</label>
                    <div class="list">${data.experienceTypes.join(", ")}</div>
                  </div>
                ` : ""}
                
                ${data.additionalRequests ? `
                  <div class="field">
                    <label>Additional Requests:</label>
                    <span>${data.additionalRequests}</span>
                  </div>
                ` : ""}
                
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #888; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
              </div>
            </body>
            </html>
          `,
        }),
      });

      if (adminEmailResponse.ok) {
        console.log("Admin notification email sent");
      } else {
        console.error("Failed to send admin email:", await adminEmailResponse.text());
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping email notifications");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Submission received successfully",
        id: submission.id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
