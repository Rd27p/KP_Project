import '../style/ProgressBar_Style.css';

/**
 * ProgressBar
 * Bar generik dipakai di banyak tempat: health bar per kategori,
 * utilisasi server, sampai status bar bertumpuk (stacked).
 *
 * Props:
 *  - value      : number (0-100)     -> persentase isi bar
 *  - color      : string              -> warna fill (default var(--red))
 *  - trackColor : string              -> warna track/background
 *  - height     : number | string     -> tinggi bar dalam px (default 8)
 *  - rounded    : bool                -> sudut membulat penuh (default true)
 */
export default function ProgressBar({
  value = 0,
  color = 'var(--red)',
  trackColor,
  height = 8,
  rounded = true,
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className="progress-track"
      style={{
        height,
        background: trackColor,
        borderRadius: rounded ? 6 : 2,
      }}
    >
      <div
        className="progress-fill"
        style={{
          width: `${clamped}%`,
          background: color,
          borderRadius: rounded ? 6 : 2,
        }}
      />
    </div>
  );
}
