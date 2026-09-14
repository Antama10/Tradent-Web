import {
  DeleteAccountClient,
} from "./delete-account-client";


export const metadata = {
  title:
    "Account löschen",
};


export default function DeleteAccountPage() {
  return (
    <article className="legal-page">
      <h1>
        Tradent-Account löschen
      </h1>

      <p>
        Du kannst deinen
        Tradent-Account jederzeit direkt
        innerhalb der App löschen.
      </p>

      <p>
        Falls du keinen Zugriff mehr auf
        die App hast, kannst du die
        Account-Löschung auch über diese
        Website durchführen.
      </p>

      <DeleteAccountClient />
    </article>
  );
}
