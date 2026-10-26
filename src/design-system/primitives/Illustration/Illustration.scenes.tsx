import type { ReactNode } from 'react';
import { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';
import type {
  IllustrationName,
  IllustrationPalette,
} from './Illustration.types';

type Scene = (colors: IllustrationPalette) => ReactNode;

/** Soft blob and sparkles shared by every scene. */
function Backdrop({ c }: { readonly c: IllustrationPalette }) {
  return (
    <G>
      <Circle cx={120} cy={104} r={86} fill={c.soft} />
      <Circle cx={36} cy={46} r={7} fill={c.soft} />
      <Circle cx={212} cy={34} r={5} fill={c.primary} opacity={0.35} />
      <Circle cx={218} cy={158} r={9} fill={c.soft} />
      <Circle cx={24} cy={150} r={4} fill={c.primary} opacity={0.35} />
    </G>
  );
}

function Check({
  c,
  x,
  y,
}: {
  readonly c: IllustrationPalette;
  readonly x: number;
  readonly y: number;
}) {
  return (
    <G>
      <Circle cx={x} cy={y} r={17} fill={c.success} />
      <Path
        d={`M${x - 7} ${y} l5 5 l9 -10`}
        stroke={c.surface}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </G>
  );
}

function Cross({
  c,
  x,
  y,
  size,
}: {
  readonly c: IllustrationPalette;
  readonly x: number;
  readonly y: number;
  readonly size: number;
}) {
  const arm = size / 3;
  return (
    <G>
      <Rect
        x={x - arm / 2}
        y={y - size / 2}
        width={arm}
        height={size}
        rx={arm / 3}
        fill={c.surface}
      />
      <Rect
        x={x - size / 2}
        y={y - arm / 2}
        width={size}
        height={arm}
        rx={arm / 3}
        fill={c.surface}
      />
    </G>
  );
}

const booking: Scene = c => (
  <G>
    <Backdrop c={c} />
    <Rect
      x={64}
      y={42}
      width={112}
      height={122}
      rx={16}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Path
      d="M64 58 a16 16 0 0 1 16 -16 h80 a16 16 0 0 1 16 16 v22 h-112 z"
      fill={c.primary}
    />
    <Rect x={88} y={32} width={8} height={20} rx={4} fill={c.primaryDark} />
    <Rect x={144} y={32} width={8} height={20} rx={4} fill={c.primaryDark} />
    {[0, 1, 2, 3].map(row =>
      [0, 1, 2, 3].map(col => {
        const picked = row === 1 && col === 2;
        return (
          <Rect
            key={`${row}-${col}`}
            x={78 + col * 24}
            y={92 + row * 17}
            width={14}
            height={11}
            rx={4}
            fill={picked ? c.primary : c.soft}
          />
        );
      }),
    )}
    <Check c={c} x={176} y={150} />
  </G>
);

const queue: Scene = c => (
  <G>
    <Backdrop c={c} />
    <Path
      d="M52 66 h136 a10 10 0 0 1 10 10 v16 a12 12 0 0 0 0 24 v16 a10 10 0 0 1 -10 10 h-136 a10 10 0 0 1 -10 -10 v-16 a12 12 0 0 0 0 -24 v-16 a10 10 0 0 1 10 -10 z"
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Rect x={64} y={80} width={52} height={10} rx={5} fill={c.soft} />
    <SvgText x={64} y={132} fontSize={44} fontWeight="700" fill={c.primary}>
      12
    </SvgText>
    <Path
      d="M142 78 v68"
      stroke={c.line}
      strokeWidth={2}
      strokeDasharray="5 5"
    />
    <Circle cx={166} cy={100} r={5} fill={c.primary} />
    <Circle cx={166} cy={118} r={5} fill={c.primary} opacity={0.5} />
    <Circle cx={166} cy={136} r={5} fill={c.soft} />
    <Circle cx={186} cy={52} r={17} fill={c.primary} />
    <Path
      d="M186 42 v11 l8 5"
      stroke={c.surface}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </G>
);

const records: Scene = c => (
  <G>
    <Backdrop c={c} />
    <Rect
      x={74}
      y={52}
      width={96}
      height={118}
      rx={12}
      fill={c.line}
      opacity={0.6}
      transform="rotate(-6 122 110)"
    />
    <Rect
      x={70}
      y={40}
      width={100}
      height={124}
      rx={12}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Rect x={84} y={56} width={36} height={8} rx={4} fill={c.primary} />
    {[78, 94, 110, 126].map((y, index) => (
      <Rect
        key={y}
        x={84}
        y={y}
        width={index === 3 ? 44 : 72}
        height={7}
        rx={3.5}
        fill={c.soft}
      />
    ))}
    <Rect x={84} y={142} width={28} height={10} rx={5} fill={c.soft} />
    <Circle cx={170} cy={142} r={24} fill={c.primary} />
    <Cross c={c} x={170} y={142} size={22} />
  </G>
);

const assessment: Scene = c => (
  <G>
    <Backdrop c={c} />
    <Rect
      x={78}
      y={30}
      width={84}
      height={142}
      rx={16}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Rect x={108} y={38} width={24} height={5} rx={2.5} fill={c.line} />
    <Circle cx={120} cy={92} r={26} fill={c.soft} />
    <Circle cx={111} cy={88} r={2.8} fill={c.primaryDark} />
    <Circle cx={129} cy={88} r={2.8} fill={c.primaryDark} />
    <Path
      d="M110 101 q10 8 20 0"
      stroke={c.primaryDark}
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
    />
    {[
      'M92 66 v-10 h10',
      'M148 66 v-10 h-10',
      'M92 118 v10 h10',
      'M148 118 v10 h-10',
    ].map(d => (
      <Path
        key={d}
        d={d}
        stroke={c.primary}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ))}
    <Rect x={92} y={142} width={56} height={14} rx={7} fill={c.primary} />
    <Circle
      cx={182}
      cy={64}
      r={16}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Path
      d="M182 56 v16 M174 64 h16"
      stroke={c.primary}
      strokeWidth={3.5}
      strokeLinecap="round"
    />
  </G>
);

const welcome: Scene = c => (
  <G>
    <Backdrop c={c} />
    <Path
      d="M120 28 l58 20 v44 c0 38 -24 62 -58 78 c-34 -16 -58 -40 -58 -78 v-44 z"
      fill={c.primary}
    />
    <Path
      d="M120 28 l58 20 v44 c0 38 -24 62 -58 78 z"
      fill={c.primaryDark}
      opacity={0.35}
    />
    <Cross c={c} x={120} y={96} size={52} />
    <Circle
      cx={190}
      cy={146}
      r={16}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Path d="M190 138 c6 7 8 10 0 18 c-8 -8 -6 -11 0 -18 z" fill={c.primary} />
    <Circle
      cx={52}
      cy={126}
      r={14}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Path
      d="M45 126 l5 5 l9 -10"
      stroke={c.success}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </G>
);

const account: Scene = c => (
  <G>
    <Backdrop c={c} />
    <Rect
      x={66}
      y={44}
      width={108}
      height={116}
      rx={18}
      fill={c.surface}
      stroke={c.line}
      strokeWidth={2}
    />
    <Circle cx={120} cy={88} r={20} fill={c.soft} />
    <Circle cx={120} cy={82} r={8} fill={c.primary} />
    <Path d="M104 102 q16 -14 32 0" fill={c.primary} />
    <Rect x={86} y={122} width={68} height={9} rx={4.5} fill={c.soft} />
    <Rect x={98} y={138} width={44} height={9} rx={4.5} fill={c.soft} />
    <Circle cx={176} cy={140} r={22} fill={c.primary} />
    <Rect x={166} y={138} width={20} height={16} rx={4} fill={c.surface} />
    <Path
      d="M170 138 v-5 a6 6 0 0 1 12 0 v5"
      stroke={c.surface}
      strokeWidth={3.5}
      strokeLinecap="round"
      fill="none"
    />
  </G>
);

export const SCENES: Record<IllustrationName, Scene> = {
  welcome,
  booking,
  queue,
  records,
  assessment,
  account,
};
