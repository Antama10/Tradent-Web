import {
    Show,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export const metadata = {
    title: "Account löschen",
};

export default function DeleteAccountPage() {
    return (
        <article className="legal-page">
            <h1>Tradent-Account löschen</h1>

            <p>
                Du kannst deinen Tradent-Account
                jederzeit direkt innerhalb der App
                löschen.
            </p>

            <p>
                Falls du keinen Zugriff mehr auf die
                App hast, kannst du die Account-Löschung
                auch über diese Website einleiten.
            </p>

            <Show when="signed-out">
                <section className="delete-account-box">
                    <h2>Identität bestätigen</h2>

                    <p>
                        Melde dich mit deinem bestehenden
                        Tradent-Konto an, um den
                        Löschprozess zu starten.
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
                            <h2>Angemeldet</h2>

                            <p>
                                Dein Tradent-Konto wurde
                                erfolgreich erkannt.
                            </p>
                        </div>

                        <UserButton />
                    </div>

                    <p>
                        Im nächsten Schritt kannst du die
                        dauerhafte Löschung deines Kontos
                        bestätigen.
                    </p>

                    <p className="delete-warning">
                        Die Löschfunktion ist auf dieser
                        Website noch nicht aktiviert.
                    </p>
                </section>
            </Show>
        </article>
    );
}
