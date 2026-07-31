"use client";

// ============================================================================
// Accordion — liste d'éléments dépliables (utilisé par la page /faq, mais
// réutilisable partout où il faut du contenu "question/réponse" ou
// "titre/détail" replié par défaut).
//
// Bonnes pratiques appliquées :
// - Un seul état `ouvertIndex` (pas un tableau de booléens) : par défaut,
//   UN SEUL item peut être ouvert à la fois — comportement standard d'une
//   FAQ. Pour autoriser l'ouverture multiple, il suffirait de passer à un
//   `Set<number>` sans changer l'API publique du composant.
// - `AnimatePresence` + `initial={false}` sur la hauteur : évite que le tout
//   premier item ne "s'anime" bizarrement au montage de la page.
// - `role="button"` + `aria-expanded` : accessibilité clavier/lecteur d'écran.
// ============================================================================

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface AccordionItem {
  question: string;
  reponse: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [ouvertIndex, setOuvertIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/5 rounded-md border border-white/5 bg-surface">
      {items.map((item, index) => {
        const estOuvert = ouvertIndex === index;

        return (
          <div key={item.question}>
            <button
              onClick={() => setOuvertIndex(estOuvert ? null : index)}
              aria-expanded={estOuvert}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{item.question}</span>
              <motion.span
                animate={{ rotate: estOuvert ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-ink-faint"
              >
                <ChevronDown className="size-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {estOuvert && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">{item.reponse}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}