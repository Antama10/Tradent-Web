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


    const deleteAccount =
        useReverification(
            async () => {
                return await fetch(
                    "/api/delete-account",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                    }
                );
            }
        );


    async function handleDelete() {
        if (
            confirmation !==
            "LÖSCHEN"
        ) {
            return;
        }


        setErrorMessage(null);
        setIsDeleting(true);


        try {
            const response =
                await deleteAccount();


            if (!response) {
                return;
            }


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    typeof data?.error ===
                        "string"
                        ? data.error
                        : "account_delete_failed"
                );
            }


            if (
                data.ok === true &&
                data.status ===
                "account_deleted"
            ) {
                setDeleted(true);
            }
        } catch (error) {
            console.error(
                "Account deletion failed:",
                error
            );

            setErrorMessage(
                "Der Account konnte nicht gelöscht werden. Bitte versuche es erneut."
            );
        } finally {
            setIsDeleting(false);
        }
    }


    if (deleted) {
        return (
            <section className="delete-account-box">
                <h2>
                    Account gelöscht
                </h2>

                <p>
                    Dein Tradent-Account wurde
                    dauerhaft gelöscht.
                </p>

                <p>
                    Die mit deinem Tradent-Konto
                    verbundenen App-Daten wurden
                    aus dem Tradent-System entfernt.
                </p>
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
                            Dein Tradent-Account und die
                            mit deinem Account verbundenen
                            App-Daten werden dauerhaft
                            gelöscht.
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

                            autoComplete="off"

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
                            <p className="delete-error">
                                {errorMessage}
                            </p>
                        ) : null}
                    </div>
                </section>
            </Show>
        </>
    );
}
