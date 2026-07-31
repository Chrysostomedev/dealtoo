"use client";

const SLOTS = [
  { label: "Matinale (06h - 09h)", value: 45, color: "#163A2C" },
  { label: "Midi Info (12h - 14h)", value: 25, color: "#F0A93E" },
  { label: "Soirée Drive (17h - 20h)", value: 20, color: "#2D6A4F" },
  { label: "Nuit & Rediff (20h - 00h)", value: 10, color: "#D97706" },
];

export default function SpotDistributionDonut() {
  const total = SLOTS.reduce((acc, curr) => acc + curr.value, 0);
  let accumulatedAngle = 0;

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#163A2C]/[0.08] shadow-[0_10px_30px_-15px_rgba(22,58,44,0.05)] flex flex-col justify-between">
      <div>
        <h3 className="font-black text-[#163A2C] text-base">Tranches Horaires Cibles</h3>
        <p className="text-xs text-[#163A2C]/50 font-medium mt-0.5">Diffusion de vos spots par créneaux</p>
      </div>

      <div className="my-6 flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
          {SLOTS.map((slot, index) => {
            const strokeDasharray = `${slot.value} ${100 - slot.value}`;
            const strokeDashoffset = -accumulatedAngle;
            accumulatedAngle += slot.value;

            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="15.91549430918954"
                fill="transparent"
                stroke={slot.color}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 hover:opacity-80 stroke-round"
              />
            );
          })}
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-[#163A2C]">{total}%</span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#163A2C]/40">Couverture</span>
        </div>
      </div>

      <div className="space-y-2">
        {SLOTS.map((slot, i) => (
          <div key={i} className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-[#163A2C]/80">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slot.color }} />
              {slot.label}
            </span>
            <span className="text-[#163A2C]">{slot.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}