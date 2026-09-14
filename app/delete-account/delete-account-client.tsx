"use client";

import {
  Show,
  SignInButton,
  UserButton,
  useReverification,
} from "@clerk/nextjs";

import React from "react";


export function DeleteAccountClient() {
  const [
    confirmation,
    setConfirmation,
  ] =
    React.useState("");

  const [
    isDeleting,
    setIsDeleting,
  ] =
    React.useState(false);

  const [
    deleted,
    setDeleted,
  ] =
    React.useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    React.useState<
      string | null
    >(null);


  const deletionStartedRef =
    React.useRef(false);


  const deleteAccount =
    useReverification(
      async () => {
        const response =
          await fetch(
            "/api/delete-account",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              cache:
                "no-store",
            }
          );


        const data =
          await response.json();


        return data;
      }
    );


  async function handleDelete() {
    if (
      confirmation !==
        "LÖSCHEN" ||
      isDeleting ||
      deletionStartedRef.current
    ) {
      return;
    }


    deletionStartedRef.current =
      true;

    setErrorMessage(null);
    setIsDeleting(true);


    try {
      const data =
        await deleteAccount();


      /*
       * Reverification wurde vom
       * User abgebrochen.
       */
      if (!data) {
        deletionStartedRef.current =
          false;

        return;
      }


      if (
        data.ok !== true
      ) {
        throw new Error(
          typeof data?.error ===
          "string"
            ? data.error
            : "account_delete_failed"
        );
      }


      if (
        data.status !==
        "account_deleted"
      ) {
        throw new Error(
          "unexpected_delete_status"
        );
      }


      setDeleted(true);

      setConfirmation("");
    } catch (error) {
      /*
       * Keine internen Backend-Details
       * im UI offenlegen.
       */
      console.error(
        "Account deletion failed"
      );

      setErrorMessage(
        "Der Account konnte nicht gelöscht werden. Bitte versuche es erneut."
      );

      deletionStartedRef.current =
        false;
    } finally {
      setIsDeleting(false);
    }
  }


  if (deleted) {
    return (
      <section
        className="delete-account-box"
        aria-live="polite"
      >
        <div
          className="delete-success-icon"
          aria-hidden="true"
        >
          ✓
        </div>

        <h2>
          Dein Tradent-Account wurde gelöscht
        </h2>

        <p>
          Dein Tradent-Konto und die damit
          verbundenen App-Daten wurden
          dauerhaft aus dem Tradent-System
          entfernt.
        </p>

        <p>
          Du musst nichts weiter tun, um
          deinen Tradent-Account zu löschen.
        </p>

        <div className="subscription-note">
          <strong>
            Hast du ein kostenpflichtiges
            Abonnement?
          </strong>

          <p>
            Eine Account-Löschung beendet
            nicht automatisch ein eventuell
            noch aktives Apple-App-Store-
            oder Google-Play-Abonnement.
          </p>

          <p>
            Prüfe deshalb deine Abonnements
            im jeweiligen Store und kündige
            Tradent dort zusätzlich, falls
            das Abonnement noch aktiv ist.
          </p>
        </div>

        <a
          className="account-button account-link-button"
          href="/"
        >
          Zur Tradent-Startseite
        </a>
      </section>
    );
  }


  return (
    <>
      <Show when="signed-out">
        <section className="delete-account-box">
          <h2>
            Identität bestätigen
          </h2>

          <p>
            Melde dich mit deinem
            bestehenden Tradent-Konto an,
            um den Löschprozess zu starten.
          </p>

          <p>
            Aus Sicherheitsgründen kann
            vor der endgültigen Löschung
            eine erneute Identitätsprüfung
            erforderlich sein.
          </p>

          <SignInButton mode="modal">
            <button
              className="account-button"
              type="button"
            >
              Mit Tradent-Konto anmelden
            </button>
          </SignInButton>
        </section>
      </Show>


      <Show when="signed-in">
        <section className="delete-account-box">
          <div className="account-user-row">
            <div>
              <h2>
                Account dauerhaft löschen
              </h2>

              <p>
                Du bist mit deinem
                Tradent-Konto angemeldet.
              </p>
            </div>

            <UserButton />
          </div>


          <div className="delete-danger-box">
            <h3>
              Diese Aktion kann nicht
              rückgängig gemacht werden.
            </h3>

            <p>
              Bei der Löschung werden die
              mit deinem Tradent-Konto
              verbundenen personenbezogenen
              App-Daten dauerhaft entfernt.
            </p>

            <ul className="delete-data-list">
              <li>
                Profil- und Kontodaten
              </li>

              <li>
                offene, geschlossene und
                gespeicherte Tradent-Trades
              </li>

              <li>
                Custom Rules und
                Signal-Einstellungen
              </li>

              <li>
                Push-bezogene Tradent-Daten
              </li>

              <li>
                Usage-, Session- und
                Sicherheitsstatus
              </li>

              <li>
                Risk-Disclaimer-Akzeptanz
              </li>

              <li>
                Tradents gespeicherter
                Abonnement-/Entitlement-State
              </li>

              <li>
                dein Clerk-Login-Konto
              </li>
            </ul>


            <div className="subscription-warning">
              <strong>
                Wichtig bei Standard oder Pro
              </strong>

              <p>
                Das Löschen deines
                Tradent-Accounts bedeutet
                nicht automatisch, dass ein
                noch aktives Abonnement bei
                Apple oder Google gekündigt
                wurde.
              </p>

              <p>
                Verwalte oder kündige ein
                bestehendes Abonnement
                zusätzlich im Apple App Store
                beziehungsweise bei
                Google Play.
              </p>
            </div>


            <p>
              Vor der Löschung kann Clerk
              aus Sicherheitsgründen erneut
              einen Bestätigungscode oder
              einen anderen
              Reverification-Schritt
              verlangen.
            </p>


            <p>
              Gib zur Bestätigung
              <strong> LÖSCHEN </strong>
              ein.
            </p>


            <input
              className="delete-confirmation-input"
              type="text"

              value={
                confirmation
              }

              onChange={(event) =>
                setConfirmation(
                  event.target.value
                )
              }

              disabled={
                isDeleting
              }

              autoComplete="off"

              spellCheck={false}

              aria-label="Löschung bestätigen"
            />


            <button
              type="button"

              className="delete-account-button"

              disabled={
                confirmation !==
                  "LÖSCHEN" ||
                isDeleting
              }

              onClick={() => {
                void handleDelete();
              }}
            >
              {isDeleting
                ? "Account wird gelöscht …"
                : "Account dauerhaft löschen"}
            </button>


            {errorMessage ? (
              <p
                className="delete-error"
                role="alert"
              >
                {errorMessage}
              </p>
            ) : null}
          </div>
        </section>
      </Show>
    </>
  );
}
