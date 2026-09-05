import React from 'react';
import { motion } from 'motion/react';

export type GirlExpression = 
  | 'idle'
  | 'checking_phone'
  | 'smiling_accept'
  | 'smiling'
  | 'laughing'
  | 'blushing'
  | 'crying_sad'
  | 'angry'
  | 'listening'
  | 'forgiving_hand'
  | 'eating'
  | 'sleeping'
  | 'hugging'
  | 'resting_shoulder'
  | 'waving'
  | 'kissing'
  | 'walking';

interface GirlCharacterProps {
  expression?: GirlExpression;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  flip?: boolean;
  animate?: boolean;
}

export const GirlCharacter: React.FC<GirlCharacterProps> = ({
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
      transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const },
    },
    laughing: {
      y: [0, -6, 0, -4, 0],
      rotate: [1, -2, 1, -1, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
    },
    walking: {
      y: [0, -5, 0],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const },
    },
    crying: {
      y: [0, 3, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const currentVariant = expression === 'laughing' 
    ? 'laughing' 
    : expression === 'walking' 
    ? 'walking' 
    : expression === 'crying_sad'
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
        <ellipse cx="60" cy="172" rx="30" ry="5.5" fill="#000000" fillOpacity="0.08" />

        {/* Legs / Skirt & Tights */}
        <g id="girl-legs">
          {/* Skirt */}
          <path
            d="M38 120 L30 144 Q60 148 90 144 L82 120 Z"
            fill="#9B2C47" /* Cozy soft burgundy / berry skirt */
          />
          {/* Skirt pleat lines */}
          <path d="M48 122 L45 145" stroke="#801F37" strokeWidth="1" />
          <path d="M60 122 L60 146" stroke="#801F37" strokeWidth="1" />
          <path d="M72 122 L75 145" stroke="#801F37" strokeWidth="1" />

          {/* Tights / legs */}
          <path
            d={expression === 'walking' ? "M48 144 L44 163" : "M48 144 L48 163"}
            stroke="#2D3748"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d={expression === 'walking' ? "M72 144 L76 161" : "M72 144 L72 163"}
            stroke="#2D3748"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Shoes (Cute Mary Janes or loafers) */}
          <ellipse cx={expression === 'walking' ? 42 : 46} cy="165" rx="8" ry="4.5" fill="#831843" />
          <ellipse cx={expression === 'walking' ? 80 : 74} cy="165" rx="8" ry="4.5" fill="#831843" />
          <path d={expression === 'walking' ? "M39 163 L45 163" : "M43 163 L49 163"} stroke="#FBCFE8" strokeWidth="1.5" />
          <path d={expression === 'walking' ? "M77 163 L83 163" : "M71 163 L77 163"} stroke="#FBCFE8" strokeWidth="1.5" />
        </g>

        {/* Torso / Cozy Soft Rose Cardigan & Cream Top */}
        <g id="girl-body">
          {/* Cream inner blouse */}
          <path d="M46 76 L74 76 L74 122 L46 122 Z" fill="#FFFBF5" />
          {/* Cardigan body */}
          <path
            d="M34 85 C34 75, 86 75, 86 85 L85 125 C85 128, 35 128, 35 125 Z"
            fill="#F472B6" /* Soft Rose Cardigan */
          />
          {/* Cardigan lapels / open front */}
          <path d="M48 80 L56 125 L64 125 L72 80" fill="#FFFBF5" />
          {/* Cardigan buttons */}
          <circle cx="58" cy="98" r="1.5" fill="#FCE7F3" />
          <circle cx="58" cy="110" r="1.5" fill="#FCE7F3" />
          {/* Cardigan pocket */}
          <rect x="70" y="105" width="10" height="8" rx="2" fill="#EC4899" fillOpacity="0.4" />
        </g>

        {/* Arms & Hands depending on expression */}
        <g id="girl-arms">
          {expression === 'checking_phone' && (
            <>
              {/* Arms holding phone */}
              <path d="M36 86 Q30 102 46 106" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <path d="M84 86 Q90 102 68 106" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              {/* Phone with rose/lavender case */}
              <rect x="50" y="93" width="18" height="26" rx="3" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
              <rect x="52" y="96" width="14" height="20" rx="1" fill="#FBCFE8" fillOpacity="0.8" />
              <circle cx="59" cy="115" r="1.5" fill="#DB2777" />
              {/* Hands */}
              <circle cx="48" cy="106" r="4.5" fill="#FFE4D6" />
              <circle cx="70" cy="106" r="4.5" fill="#FFE4D6" />
            </>
          )}

          {expression === 'smiling_accept' && (
            <>
              {/* One hand on heart/chest in surprise, one holding phone */}
              <path d="M36 86 Q46 95 56 95" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="56" cy="95" r="4.5" fill="#FFE4D6" />
              <path d="M84 86 Q86 102 74 105" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <rect x="68" y="94" width="16" height="24" rx="3" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
              <circle cx="74" cy="105" r="4.5" fill="#FFE4D6" />
            </>
          )}

          {expression === 'forgiving_hand' && (
            <>
              {/* Reaching out left hand to connect with boy */}
              <path d="M36 86 Q16 95 8 105" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="8" cy="105" r="5" fill="#FFE4D6" />
              {/* Other hand rested gently */}
              <path d="M84 86 Q88 105 82 118" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="82" cy="118" r="4.5" fill="#FFE4D6" />
            </>
          )}

          {expression === 'crying_sad' && (
            <>
              {/* Arms hugging herself / wiping eyes */}
              <path d="M36 86 Q46 96 52 92" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <path d="M84 86 Q72 96 66 92" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="52" cy="92" r="4.5" fill="#FFE4D6" />
              <circle cx="66" cy="92" r="4.5" fill="#FFE4D6" />
            </>
          )}

          {expression === 'hugging' && (
            <>
              <path d="M36 88 Q20 95 48 102" stroke="#F472B6" strokeWidth="11" strokeLinecap="round" />
              <path d="M84 88 Q100 95 72 102" stroke="#F472B6" strokeWidth="11" strokeLinecap="round" />
              <circle cx="48" cy="102" r="4.5" fill="#FFE4D6" />
              <circle cx="72" cy="102" r="4.5" fill="#FFE4D6" />
            </>
          )}

          {expression === 'waving' && (
            <>
              <path d="M36 86 Q28 105 32 118" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="32" cy="118" r="4.5" fill="#FFE4D6" />
              {/* Cute high wave */}
              <path d="M84 86 Q96 68 94 48" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="94" cy="46" r="5" fill="#FFE4D6" />
            </>
          )}

          {expression === 'eating' && (
            <>
              <path d="M36 86 Q42 102 52 104" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="52" cy="104" r="4.5" fill="#FFE4D6" />
              {/* Hand to mouth enjoying treat */}
              <path d="M84 86 Q86 96 70 82" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
              <circle cx="70" cy="82" r="4.5" fill="#FFE4D6" />
              {/* Cupcake / strawberry */}
              <ellipse cx="68" cy="74" rx="4" ry="5" fill="#FB7185" />
            </>
          )}

          {/* Default / resting arms */}
          {['idle', 'smiling', 'laughing', 'blushing', 'angry', 'listening', 'sleeping', 'resting_shoulder', 'kissing', 'walking'].includes(expression) && (
            <>
              <path
                d={expression === 'walking' ? "M36 86 Q26 104 24 116" : "M36 86 Q28 104 32 118"}
                stroke="#F472B6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx={expression === 'walking' ? 24 : 32} cy={expression === 'walking' ? 116 : 118} r="4.5" fill="#FFE4D6" />
              <path
                d={expression === 'walking' ? "M84 86 Q94 104 96 116" : "M84 86 Q92 104 88 118"}
                stroke="#F472B6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx={expression === 'walking' ? 96 : 88} cy={expression === 'walking' ? 116 : 118} r="4.5" fill="#FFE4D6" />
            </>
          )}
        </g>

        {/* Neck */}
        <rect x="55" y="66" width="10" height="12" rx="2" fill="#FFE4D6" />

        {/* Head */}
        <g id="girl-head">
          {/* Hair behind shoulders */}
          <path
            d="M26 48 C22 80, 26 95, 36 100 C32 86, 32 60, 32 48 Z"
            fill="#231A24" /* Soft rich dark brown / raven hair */
          />
          <path
            d="M94 48 C98 80, 94 95, 84 100 C88 86, 88 60, 88 48 Z"
            fill="#231A24"
          />

          {/* Cute side low buns / pigtails */}
          <circle cx="28" cy="62" r="10" fill="#231A24" />
          <circle cx="92" cy="62" r="10" fill="#231A24" />
          {/* Little hair ties */}
          <ellipse cx="32" cy="58" rx="3" ry="5" fill="#F472B6" />
          <ellipse cx="88" cy="58" rx="3" ry="5" fill="#F472B6" />

          {/* Face base */}
          <circle cx="60" cy="46" r="27" fill="#FFE4D6" />
          {/* Ears */}
          <circle cx="33" cy="48" r="5" fill="#FFE4D6" />
          <circle cx="87" cy="48" r="5" fill="#FFE4D6" />

          {/* Girl's soft bangs and hairstyle */}
          <g id="girl-hair-front">
            {/* Top crown volume */}
            <path
              d="M32 44 C26 18, 94 18, 88 44 C88 26, 75 14, 60 14 C45 14, 32 26, 32 44 Z"
              fill="#231A24"
            />
            {/* Soft arched bangs */}
            <path
              d="M32 40 C34 26, 44 24, 52 30 C56 22, 64 22, 68 30 C76 24, 86 26, 88 40 C84 34, 76 36, 72 40 C66 32, 54 32, 48 40 C44 34, 36 34, 32 40 Z"
              fill="#231A24"
            />
            {/* Cute side hair strands framing cheeks */}
            <path d="M33 42 Q31 56 34 66 Q36 56 36 44 Z" fill="#231A24" />
            <path d="M87 42 Q89 56 86 66 Q84 56 84 44 Z" fill="#231A24" />
            {/* Hair clip: cute gold/pink flower clip */}
            <circle cx="40" cy="28" r="3.5" fill="#FBBF24" />
            <circle cx="40" cy="28" r="1.5" fill="#F43F5E" />
          </g>

          {/* Eyebrows */}
          {expression === 'angry' ? (
            <>
              <path d="M46 37 L55 40" stroke="#1F1318" strokeWidth="2" strokeLinecap="round" />
              <path d="M74 40 L65 37" stroke="#1F1318" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : expression === 'crying_sad' ? (
            <>
              <path d="M46 39 Q50 36 55 38" stroke="#1F1318" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M65 38 Q70 36 74 39" stroke="#1F1318" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M47 37 Q52 34 56 37" stroke="#1F1318" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M64 37 Q68 34 73 37" stroke="#1F1318" strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}

          {/* Eyes with sweet eyelashes */}
          {expression === 'sleeping' || expression === 'resting_shoulder' || expression === 'kissing' ? (
            <>
              {/* Peaceful closed eyes with gentle upward eyelashes */}
              <path d="M47 48 Q52 52 57 48" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M46 47 L43 45" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M63 48 Q68 52 73 48" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M74 47 L77 45" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : expression === 'laughing' ? (
            <>
              {/* Joyful crescent eyes with cute lash */}
              <path d="M47 48 L52 44 L57 48" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M46 46 L43 44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M63 48 L68 44 L73 48" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M74 46 L77 44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : expression === 'crying_sad' ? (
            <>
              <circle cx="51" cy="49" r="3.5" fill="#1E293B" />
              <circle cx="69" cy="49" r="3.5" fill="#1E293B" />
              {/* Eyelashes */}
              <path d="M47 47 L44 45" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M73 47 L76 45" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              {/* Glistening tears */}
              <ellipse cx="50" cy="56" rx="2" ry="3.5" fill="#38BDF8" fillOpacity="0.85" />
              <ellipse cx="70" cy="56" rx="2" ry="3.5" fill="#38BDF8" fillOpacity="0.85" />
            </>
          ) : (
            <>
              {/* Sparkly cartoon eyes */}
              <circle cx="52" cy="46" r="4.5" fill="#1E293B" />
              <circle cx="53.5" cy="44" r="1.8" fill="#FFFFFF" />
              <circle cx="50.5" cy="47" r="1" fill="#FFFFFF" />
              {/* Eyelashes */}
              <path d="M47 45 L44 43" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M49 43 L48 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

              <circle cx="68" cy="46" r="4.5" fill="#1E293B" />
              <circle cx="69.5" cy="44" r="1.8" fill="#FFFFFF" />
              <circle cx="66.5" cy="47" r="1" fill="#FFFFFF" />
              {/* Eyelashes */}
              <path d="M73 45 L76 43" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M71 43 L72 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}

          {/* Rosy Cheeks */}
          <ellipse
            cx="44"
            cy="53"
            rx="6"
            ry="3.5"
            fill="#FB7185"
            fillOpacity={expression === 'blushing' || expression === 'kissing' ? 0.8 : 0.4}
          />
          <ellipse
            cx="76"
            cy="53"
            rx="6"
            ry="3.5"
            fill="#FB7185"
            fillOpacity={expression === 'blushing' || expression === 'kissing' ? 0.8 : 0.4}
          />

          {/* Mouth */}
          {expression === 'laughing' ? (
            <path d="M53 55 Q60 65 67 55 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
          ) : expression === 'smiling_accept' || expression === 'smiling' || expression === 'forgiving_hand' ? (
            <path d="M54 55 Q60 61 66 55" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />
          ) : expression === 'crying_sad' ? (
            <path d="M55 58 Q60 54 65 58" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" />
          ) : expression === 'angry' ? (
            <path d="M55 58 L65 57" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
          ) : expression === 'eating' ? (
            <ellipse cx="60" cy="56" rx="3.5" ry="2.5" fill="#E11D48" />
          ) : expression === 'kissing' ? (
            <path d="M58 56 Q61 54 64 56 Q61 58 58 56 Z" fill="#E11D48" />
          ) : (
            <path d="M55 56 Q60 59 65 56" stroke="#9F1239" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {/* Blush detail lines */}
          {expression === 'blushing' && (
            <>
              <line x1="42" y1="51" x2="45" y2="55" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
              <line x1="46" y1="51" x2="49" y2="55" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
              <line x1="74" y1="51" x2="77" y2="55" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
              <line x1="78" y1="51" x2="81" y2="55" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
            </>
          )}
        </g>
      </svg>
    </motion.div>
  );
};
