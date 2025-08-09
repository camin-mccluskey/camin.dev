'use client'

import { Volume1Icon } from "lucide-react";

export function Phonic() {

  const playName = () => {
    const utterance = new window.SpeechSynthesisUtterance("Camin McCluskey")
    utterance.lang = "en-GB"
    window.speechSynthesis.speak(utterance)
  }

  return (
    <span className="flex items-center gap-2 text-sm italic">
      <span aria-label="IPA pronunciation: /ˈkeɪ mɪn məˈklʌski/">kˈe͡ɪmɛn məklˈʌski</span>
      <button onClick={() => playName()}>
        <Volume1Icon size={16} />
      </button>
    </span>
  )
}