import React from 'react';
import { motion } from 'motion/react';

export type BoyExpression = 
  | 'idle' 
  | 'nervous_phone' 
  | 'smiling' 
  | 'laughing' 
  | 'blushing' 
  | 'crying' 
  | 'angry' 
  | 'sad_regret' 
  | 'apologetic_reach' 
  | 'eating' 
  | 'sleeping' 
  | 'hugging' 
  | 'waving' 
  | 'kissing' 
  | 'holding_hand'
  | 'caring_blanket'
  | 'walking';

interface BoyCharacterProps {
  expression?: BoyExpression;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  flip?: boolean;
  animate?: boolean;
}

export const BoyCharacter: React.FC<BoyCharacterProps> = ({
  expression = 'idle',
  className = '',
  size = 'md',
  flip = false,
  animate = true,
}) => {
  const sizeMap = {
    sm: { width: 70, height: 110 },
    md: { width: 110, height: 165 },
    lg: { width: 150, height: 220 },
    xl: { width: 190, height: 280 },
  };

  const { width, height } = sizeMap[size];

  // Head bob / breathing animation
  const breathingVariants = {
    idle: {
      y: [0, -3, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
    },
    laughing: {
      y: [0, -6, 0, -5, 0],
      rotate: [-1, 2, -1, 1, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
    },
    walking: {
      y: [0, -5, 0],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const },
    },
    crying: {
      y: [0, 2, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const currentVariant = expression === 'laughing' 
    ? 'laughing' 
    : expression === 'walking' 
    ? 'walking' 
    : expression === 'sad_regret' || expression === 'crying'
    ? 'crying'
    : 'idle';

  return (
    <motion.div
      className={`inline-block select-none relative ${className}`}
      style={{
        width,
        height,
        transform: flip ? 'scaleX(-1)' : 'none',
        transformOrigin: 'bottom center',
      }}
      variants={animate ? breathingVariants : undefined}
      animate={animate ? currentVariant : undefined}
    >
      <svg
        viewBox="0 0 120 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm overflow-visible"
      >
        {/* Shadow under feet */}
        <ellipse cx="60" cy="172" rx="32" ry="6" fill="#000000" fillOpacity="0.08" />

        {/* Legs / Pants */}
        <g id="boy-legs">
          {/* Left leg */}
          <path
            d={expression === 'walking' ? "M46 125 L40 160" : "M48 125 L48 162"}
            stroke="#4A5568"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Right leg */}
          <path
            d={expression === 'walking' ? "M72 125 L78 158" : "M72 125 L72 162"}
            stroke="#4A5568"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Shoes */}
          <ellipse cx={expression === 'walking' ? 37 : 46} cy="164" rx="10" ry="5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx={expression === 'walking' ? 82 : 74} cy="164" rx="10" ry="5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Shoe sole accent */}
          <path d={expression === 'walking' ? "M30 166 Q37 168 44 166" : "M39 166 Q46 168 53 166"} stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />
          <path d={expression === 'walking' ? "M75 166 Q82 168 89 166" : "M67 166 Q74 168 81 166"} stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Torso / Warm Ochre Hoodie */}
        <g id="boy-body">
          {/* Main hoodie body */}
          <path
            d="M34 85 C34 75, 86 75, 86 85 L84 130 C84 135, 36 135, 36 130 Z"
            fill="#D97724" /* Warm cozy ochre/mustard */
          />
          {/* Hoodie kangaroo pocket */}
          <path
            d="M44 105 Q60 110 76 105 L73 124 Q60 127 47 124 Z"
            fill="#C06316"
            stroke="#A34E07"
            strokeWidth="1"
          />
          {/* Hoodie drawstrings */}
          <path d="M54 78 L53 92" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round" />
          <path d="M66 78 L67 92" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Arms & Hands depending on expression */}
        <g id="boy-arms">
          {expression === 'nervous_phone' && (
            <>
              {/* Holding phone up */}
              <path d="M38 85 Q30 100 46 104" stroke="#D97724" strokeWidth="12" strokeLinecap="round" />
              <path d="M82 85 Q88 100 68 104" stroke="#D97724" strokeWidth="12" strokeLinecap="round" />
              {/* Phone */}
              <rect x="50" y="92" width="18" height="26" rx="3" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="52" y="95" width="14" height="20" rx="1" fill="#38BDF8" fillOpacity="0.4" />
              <circle cx="59" cy="114" r="1.5" fill="#FFFFFF" />
              {/* Hands on phone */}
              <circle cx="48" cy="104" r="5" fill="#FFDFC4" />
              <circle cx="69" cy="104" r="5" fill="#FFDFC4" />
            </>
          )}

          {expression === 'apologetic_reach' && (
            <>
              {/* Left hand on chest, right hand extending forward gently */}
              <path d="M36 86 Q45 96 55 96" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="55" cy="96" r="5" fill="#FFDFC4" />
              {/* Reaching arm */}
              <path d="M82 86 Q100 95 110 102" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="112" cy="103" r="6" fill="#FFDFC4" />
              {/* Open palm / gentle hand */}
              <path d="M112 99 Q118 102 113 107" stroke="#FFDFC4" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {expression === 'holding_hand' && (
            <>
              <path d="M36 86 Q30 110 36 125" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="36" cy="125" r="5" fill="#FFDFC4" />
              {/* Extended right hand */}
              <path d="M82 86 Q95 105 108 120" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="108" cy="120" r="6" fill="#FFDFC4" />
            </>
          )}

          {expression === 'hugging' && (
            <>
              {/* Wrapped forward arms */}
              <path d="M36 88 Q20 95 45 105" stroke="#D97724" strokeWidth="12" strokeLinecap="round" />
              <path d="M84 88 Q100 95 75 105" stroke="#D97724" strokeWidth="12" strokeLinecap="round" />
              <circle cx="45" cy="105" r="5" fill="#FFDFC4" />
              <circle cx="75" cy="105" r="5" fill="#FFDFC4" />
            </>
          )}

          {expression === 'waving' && (
            <>
              <path d="M36 86 Q30 105 32 120" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="32" cy="120" r="5" fill="#FFDFC4" />
              {/* Waving high arm */}
              <path d="M82 86 Q96 70 94 50" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="94" cy="48" r="6" fill="#FFDFC4" />
              {/* Waving fingers */}
              <path d="M92 44 L92 39 M95 43 L96 38 M98 44 L100 40" stroke="#FFDFC4" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {expression === 'eating' && (
            <>
              <path d="M36 86 Q32 105 48 108" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <path d="M82 86 Q86 100 70 85" stroke="#D97724" strokeWidth="11" strokeLinecap="round" />
              <circle cx="48" cy="108" r="5" fill="#FFDFC4" />
              {/* Holding chopstick / snack */}
              <circle cx="70" cy="85" r="5" fill="#FFDFC4" />
              <path d="M72 82 L76 72" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="77" cy="71" rx="4" ry="2.5" fill="#EF4444" />
            </>
          )}

          {/* Default idle arms */}
          {['idle', 'smiling', 'laughing', 'blushing', 'crying', 'angry', 'sad_regret', 'sleeping', 'kissing', 'caring_blanket', 'walking'].includes(expression) && (
            <>
              <path
                d={expression === 'walking' ? "M36 86 Q26 105 24 116" : "M36 86 Q28 105 32 118"}
                stroke="#D97724"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <circle cx={expression === 'walking' ? 24 : 32} cy={expression === 'walking' ? 116 : 118} r="5" fill="#FFDFC4" />
              <path
                d={expression === 'walking' ? "M84 86 Q94 105 96 116" : "M84 86 Q92 105 88 118"}
                stroke="#D97724"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <circle cx={expression === 'walking' ? 96 : 88} cy={expression === 'walking' ? 116 : 118} r="5" fill="#FFDFC4" />
            </>
          )}
        </g>

        {/* Neck */}
        <rect x="54" y="65" width="12" height="12" rx="2" fill="#FFDFC4" />

        {/* Head */}
        <g id="boy-head">
          {/* Face base */}
          <circle cx="60" cy="46" r="28" fill="#FFDFC4" />
          {/* Ears */}
          <circle cx="32" cy="48" r="6" fill="#FFDFC4" />
          <circle cx="88" cy="48" r="6" fill="#FFDFC4" />

          {/* Cute boy messy brown hair */}
          <g id="boy-hair">
            {/* Back hair volume */}
            <path
              d="M32 46 C28 20, 92 20, 88 46 C88 28, 75 14, 60 14 C45 14, 32 28, 32 46 Z"
              fill="#452718"
            />
            {/* Front bangs and messy hair spikes */}
            <path
              d="M32 40 C34 26, 42 22, 54 26 C57 20, 68 20, 72 26 C78 22, 85 28, 88 38 C84 34, 78 35, 75 40 C72 32, 62 30, 56 36 C52 32, 42 34, 37 42 C35 41, 33 40, 32 40 Z"
              fill="#452718"
            />
            {/* Cute tuft of hair on top */}
            <path d="M57 14 Q59 7 64 10 Q61 14 59 16 Z" fill="#452718" />
          </g>

          {/* Eyebrows */}
          {expression === 'angry' ? (
            <>
              <path d="M46 36 L56 40" stroke="#331D12" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M74 40 L64 36" stroke="#331D12" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : expression === 'sad_regret' || expression === 'crying' ? (
            <>
              <path d="M46 38 Q52 35 56 37" stroke="#331D12" strokeWidth="2" strokeLinecap="round" />
              <path d="M64 37 Q68 35 74 38" stroke="#331D12" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M47 36 Q52 33 57 36" stroke="#331D12" strokeWidth="2" strokeLinecap="round" />
              <path d="M63 36 Q68 33 73 36" stroke="#331D12" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Eyes based on expression */}
          {expression === 'sleeping' || expression === 'kissing' ? (
            <>
              {/* Closed peaceful curved eyes */}
              <path d="M47 48 Q52 52 57 48" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M63 48 Q68 52 73 48" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : expression === 'laughing' ? (
            <>
              {/* Happy squint eyes ^ ^ */}
              <path d="M47 48 L52 44 L57 48" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M63 48 L68 44 L73 48" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : expression === 'sad_regret' || expression === 'crying' ? (
            <>
              {/* Looking down sorrowfully */}
              <circle cx="51" cy="49" r="3.5" fill="#2D3748" />
              <circle cx="69" cy="49" r="3.5" fill="#2D3748" />
              {/* Little tear if crying */}
              {expression === 'crying' && (
                <ellipse cx="49" cy="56" rx="2" ry="3" fill="#60A5FA" fillOpacity="0.8" />
              )}
            </>
          ) : (
            <>
              {/* Open, expressive cartoon eyes */}
              <circle cx="52" cy="46" r="4.5" fill="#2D3748" />
              <circle cx="53.5" cy="44.5" r="1.5" fill="#FFFFFF" />
              <circle cx="68" cy="46" r="4.5" fill="#2D3748" />
              <circle cx="69.5" cy="44.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Rosy Cheeks (Blush) */}
          <ellipse
            cx="44"
            cy="53"
            rx="6"
            ry="3.5"
            fill="#F87171"
            fillOpacity={expression === 'blushing' || expression === 'kissing' ? 0.75 : 0.35}
          />
          <ellipse
            cx="76"
            cy="53"
            rx="6"
            ry="3.5"
            fill="#F87171"
            fillOpacity={expression === 'blushing' || expression === 'kissing' ? 0.75 : 0.35}
          />

          {/* Mouth */}
          {expression === 'laughing' ? (
            <path d="M53 55 Q60 65 67 55 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="1" />
          ) : expression === 'smiling' || expression === 'holding_hand' || expression === 'waving' ? (
            <path d="M54 55 Q60 61 66 55" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          ) : expression === 'sad_regret' || expression === 'crying' ? (
            <path d="M55 58 Q60 54 65 58" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" />
          ) : expression === 'angry' ? (
            <path d="M55 58 L65 56" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" />
          ) : expression === 'kissing' ? (
            <path d="M58 56 Q61 54 64 56 Q61 58 58 56 Z" fill="#E11D48" />
          ) : expression === 'eating' ? (
            <ellipse cx="60" cy="56" rx="4" ry="3" fill="#BE123C" />
          ) : (
            /* Gentle relaxed smile */
            <path d="M55 56 Q60 59 65 56" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {/* Little bandage or blush marks for goofy charm */}
          {expression === 'blushing' && (
            <>
              <line x1="41" y1="51" x2="44" y2="55" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="45" y1="51" x2="48" y2="55" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="73" y1="51" x2="76" y2="55" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="77" y1="51" x2="80" y2="55" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}
        </g>
      </svg>
    </motion.div>
  );
};
