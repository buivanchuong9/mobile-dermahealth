export type SkeletonProps = {
  readonly width?: number | `${number}%`;
  readonly height?: number;
  /** Corner radius; defaults to the small theme radius. */
  readonly radius?: number;
  /** Renders a circle of `height` diameter (avatars, icon badges). */
  readonly circle?: boolean;
};
