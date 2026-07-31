// ============================================================================
// LegalLayout — mise en page commune aux pages de contenu statique
// (CGU, Confidentialité, À propos). Garantit la même largeur de lecture,
// la même typographie de "prose" et le même en-tête sur toutes ces pages,
// sans dupliquer le balisage dans chacune.
//
// Bonnes pratiques appliquées :
// - Les pages CGU/Confidentialité changent SOUVENT (obligations légales) :
//   centraliser la mise en forme ici permet de retoucher le style une seule
//   fois plutôt que dans 3 fichiers différents.
// - `derniereMaj` est une prop explicite (pas `new Date()` calculée ici) :
//   la date affichée doit être celle de la DERNIÈRE MODIFICATION RÉELLE du
//   texte légal, jamais la date de build/déploiement.
// ============================================================================

export function LegalLayout({
  titre,
  derniereMaj,
  children,
}: {
  titre: string;
  /** Date de dernière mise à jour du contenu légal, ex: "15 juillet 2026" */
  derniereMaj?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink">{titre}</h1>
      {derniereMaj && <p className="mt-2 text-sm text-ink-faint">Dernière mise à jour : {derniereMaj}</p>}

      {/* Typographie "prose" maison — pas de plugin @tailwindcss/typography
          requis, juste des espacements cohérents pour h2/p/ul. */}
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-soft [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}