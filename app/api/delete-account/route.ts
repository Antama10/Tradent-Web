import {
  auth,
  reverificationErrorResponse,
} from "@clerk/nextjs/server";

import {
  NextResponse,
} from "next/server";


const supabaseUrl =
  process.env.SUPABASE_URL;

const supabasePublishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY;


export async function POST() {
  if (
    !supabaseUrl ||
    !supabasePublishableKey
  ) {
    console.error(
      "Missing Supabase server environment variables"
    );

    return NextResponse.json(
      {
        error:
          "server_configuration_error",
      },
      {
        status: 500,
      }
    );
  }


  const {
    isAuthenticated,
    getToken,
    has,
  } =
    await auth();


  if (!isAuthenticated) {
    return NextResponse.json(
      {
        error:
          "unauthorized",
      },
      {
        status: 401,
      }
    );
  }


  /*
   * Muss zu clerk-account-security-min passen:
   *
   * first_factor maximal 5 Minuten alt.
   */
  const sufficientlyRecent =
    has({
      reverification: {
        level:
          "first_factor",

        afterMinutes:
          5,
      },
    });


  if (!sufficientlyRecent) {
    /*
     * strict_mfa erzwingt eine starke
     * Reverification.
     *
     * Falls der User keinen zweiten Faktor
     * besitzt, kann Clerk auf first_factor
     * zurückfallen.
     */
    return reverificationErrorResponse(
      "strict_mfa"
    );
  }


  const token =
    await getToken();


  if (!token) {
    return NextResponse.json(
      {
        error:
          "missing_session_token",
      },
      {
        status: 401,
      }
    );
  }


  const response =
    await fetch(
      `${supabaseUrl}/functions/v1/clerk-account-security-min`,
      {
        method:
          "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,

          apikey:
            supabasePublishableKey,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            action:
              "delete_account",
          }),

        cache:
          "no-store",
      }
    );


  let data:
    Record<string, unknown>;

  try {
    data =
      await response.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "invalid_backend_response",
      },
      {
        status: 502,
      }
    );
  }


  if (!response.ok) {
    console.error(
      "Account deletion backend failed:",
      response.status,
      data
    );

    return NextResponse.json(
      {
        error:
          typeof data.error ===
          "string"
            ? data.error
            : "account_delete_failed",
      },
      {
        status:
          response.status,
      }
    );
  }


  if (
    data.ok !== true ||
    data.status !==
      "account_deleted"
  ) {
    console.error(
      "Unexpected account deletion response:",
      data
    );

    return NextResponse.json(
      {
        error:
          "unexpected_backend_response",
      },
      {
        status: 502,
      }
    );
  }


  return NextResponse.json({
    ok: true,

    status:
      "account_deleted",
  });
}
