export const metadata = {
  title: "Tarife",
};

const plans = [
  {
    name: "Free",
    price: "0 €",
    description: "Tradent kostenlos nutzen.",
    features: [
      "3 offene Trades",
      "3 neue Trades pro Tag",
      "3 Probability-Abfragen pro Tag",
      "1 Push-Benachrichtigung pro Tag",
      "5 dauerhaft gespeicherte Trades",
      "3 Push-Subscriptions",
      "3 gespeicherte Custom Rules",
      "1 aktive Custom Rule",
      "Keine Probability-/Mixed-Rules",
    ],
  },
  {
    name: "Standard",
    price: "5,99 € / Monat",
    description: "Mehr Kapazität für die regelmäßige Nutzung.",
    features: [
      "6 offene Trades",
      "6 neue Trades pro Tag",
      "25 Probability-Abfragen pro Tag",
      "6 Push-Benachrichtigungen pro Tag",
      "50 dauerhaft gespeicherte Trades",
      "6 Push-Subscriptions",
      "3 gespeicherte Custom Rules",
      "2 aktive Custom Rules",
      "Probability-/Mixed-Rules verfügbar",
    ],
  },
  {
    name: "Pro",
    price: "7,99 € / Monat",
    description: "Die höchsten Tradent-Limits.",
    features: [
      "10 offene Trades",
      "10 neue Trades pro Tag",
      "50 Probability-Abfragen pro Tag",
      "15 Push-Benachrichtigungen pro Tag",
      "100 dauerhaft gespeicherte Trades",
      "10 Push-Subscriptions",
      "3 gespeicherte Custom Rules",
      "3 aktive Custom Rules",
      "Probability-/Mixed-Rules verfügbar",
    ],
  },
];

export default function PricingPage() {
  return (
    <article className="legal-page pricing-page">
      <h1>Tradent Tarife</h1>

      <p>
        Tradent kann kostenlos genutzt oder über ein
        monatliches Standard- bzw. Pro-Abonnement erweitert
        werden.
      </p>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <section
            className="pricing-card"
            key={plan.name}
          >
            <h2>{plan.name}</h2>

            <p className="pricing-price">
              {plan.price}
            </p>

            <p>{plan.description}</p>

            <ul>
              {plan.features.map(
                (feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                )
              )}
            </ul>
          </section>
        ))}
      </div>

      <section className="pricing-information">
        <h2>Abonnements</h2>

        <p>
          Standard und Pro sind monatliche Abonnements.
          Es gibt keine kostenlose Testphase. Der Free-Tarif
          steht als dauerhaft kostenlose Alternative zur
          Verfügung.
        </p>

        <p>
          Kostenpflichtige Abonnements werden ausschließlich
          über den Apple App Store beziehungsweise Google Play
          abgeschlossen und abgerechnet.
        </p>

        <p>
          Ein Abonnement verlängert sich automatisch, sofern
          es nicht nach den für den jeweiligen Store geltenden
          Bedingungen rechtzeitig gekündigt wird. Verwaltung
          und Kündigung erfolgen über das jeweilige
          Store-Konto.
        </p>

        <p>
          Die beim Kauf im Apple App Store oder bei Google Play
          angezeigten Preise und Bedingungen sind für den
          konkreten Kauf maßgeblich.
        </p>
      </section>

      <section className="pricing-information">
        <h2>Hinweis zu Tradent</h2>

        <p>
          Tradent ist eine Analyse- und Simulationsanwendung.
          Tradent führt keine Echtgeld-Trades aus, verwahrt
          keine Kundengelder und stellt keine Verbindung zu
          einem Broker- oder Exchange-Konto des Nutzers her.
        </p>
      </section>
    </article>
  );
}